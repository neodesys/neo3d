/**
 * Disfract
 *
 * Copyright (C) 2015, Loïc Le Page
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

/**
 * @requires Mesh.js
 */
neo3d.Shader = function(vtxSrc, fragSrc)
{
	this._prog = null;
	this._gl = null;
	this._lastDrawnMesh = null;
	this._overridenPrimitiveType = neo3d.Mesh.PRIMITIVE_TYPE.NO_PRIMITIVE;

	if (vtxSrc && (typeof(vtxSrc) === "string") &&
		fragSrc && (typeof(fragSrc) === "string"))
	{
		this._vtxSrc = vtxSrc;
		this._fragSrc = fragSrc;
	}
	else
		this._vtxSrc = this._fragSrc = null;
};

neo3d.Shader.prototype._initShaderLocations = function()
{
	//Override this method to init shader uniforms and attribs locations.
	//this._gl and this._prog are guaranteed to be valid.
};

neo3d.Shader.prototype._bindShader = function()
{
	//Override this method to configure shader before usage.
	//this._gl and this._prog are guaranteed to be valid and this shader
	//program is in use.
	//Returns true on success or false on failure.
	//If returning false, this._unbindShader() will be systematically called
	//for cleanup.
	return true;
};

neo3d.Shader.prototype._unbindShader = function()
{
	//Override this method to cleanup shader configuration after usage.
	//this._gl is guaranteed to be valid and this shader program is still in
	//use if OpenGL context has not been lost (call this._gl.isContextLost()
	//for state information).
	//WARNING: this._prog may not be valid.
};

neo3d.Shader.prototype._bindMeshAttribs = function(/*mesh*/)
{
	//Override this method to bind mesh vertex-attribs buffers to this shader
	//program (see: neo3d.Mesh#bindAttribBuffer() method).
	//this._gl is guaranteed to be valid and this shader program is in use.
	//"mesh" parameter is guaranteed to be a valid neo3d.Mesh with the same
	//OpenGL context.
	//Returns true if all vertex-attribs buffers needed by this shader are
	//correctly bound or false on error.
	//If returning false, the provided "mesh" will not be drawn.
	return true;
};

(function()
{
	function _loadShader(gl, type, src)
	{
		var shader = gl.createShader(type);
		gl.shaderSource(shader, src);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		{
			if (!gl.isContextLost())
			{
				console.warn("cannot compile shader:\n" + gl.getShaderInfoLog(shader));
				gl.deleteShader(shader);
			}

			shader = null;
		}

		return shader;
	}

	function _linkProgram(gl, vtxShader, fragShader)
	{
		var prog = gl.createProgram();
		gl.attachShader(prog, vtxShader);
		gl.attachShader(prog, fragShader);
		gl.linkProgram(prog);

		if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
		{
			if (!gl.isContextLost())
			{
				console.warn("cannot link program:\n" + gl.getProgramInfoLog(prog));
				gl.deleteProgram(prog);
			}

			prog = null;
		}

		return prog;
	}

	neo3d.Shader.prototype.init = function(gl, bContextLost)
	{
		if (!this._vtxSrc || !this._fragSrc ||
			!(gl instanceof WebGLRenderingContext) || gl.isContextLost() ||
			(this._gl && (this._gl !== gl)))
			return false;

		if (bContextLost)
		{
			this._prog = null;
			this.unbind();
		}
		else if (this._prog)
			return true;

		var vtxShader = _loadShader(gl, gl.VERTEX_SHADER, this._vtxSrc);
		if (vtxShader)
		{
			var fragShader = _loadShader(gl, gl.FRAGMENT_SHADER, this._fragSrc);
			if (fragShader)
			{
				this._prog = _linkProgram(gl, vtxShader, fragShader);

				//Flag vertex and fragment shaders for deletion, so they
				//will be automatically deleted with the program
				gl.deleteShader(vtxShader);
				gl.deleteShader(fragShader);

				if (this._prog)
				{
					this._gl = gl;
					this._initShaderLocations();
					return true;
				}
			}
			else
				gl.deleteShader(vtxShader);
		}

		return false;
	};

	neo3d.Shader.prototype.shut = function()
	{
		this.unbind();

		if (this._prog && !this._gl.isContextLost())
			this._gl.deleteProgram(this._prog);

		this._prog = null;
		this._gl = null;
	};
})();

neo3d.Shader.prototype.bind = function()
{
	if (!this._prog || this._gl.isContextLost())
		return false;

	if (this._gl._activeShader === this)
		return true;

	if (this._gl._activeShader)
		this._gl._activeShader.unbind();

	this._gl.useProgram(this._prog);
	if (this._bindShader())
	{
		this._gl._activeShader = this;
		return true;
	}
	else
	{
		this._unbindShader();
		this._gl.useProgram(null);
		return false;
	}
};

neo3d.Shader.prototype.unbind = function()
{
	if (this._gl && (this._gl._activeShader === this))
	{
		this._gl._activeShader = null;

		this._unbindShader();

		if (!this._gl.isContextLost())
		{
			this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
			this._gl.useProgram(null);
		}
	}

	this._lastDrawnMesh = null;
};

neo3d.Shader.prototype.isBound = function()
{
	return (this._gl && (this._gl._activeShader === this));
};

neo3d.Shader.getActiveShader = function(gl)
{
	if ((gl instanceof WebGLRenderingContext) &&
		(gl._activeShader instanceof neo3d.Shader))
		return gl._activeShader;
	else
		return null;
};

neo3d.Shader.prototype.drawMesh = function(mesh, firstPointIndex, nbPoints)
{
	if (this._gl && (this._gl._activeShader === this) &&
		!this._gl.isContextLost() &&
		(mesh instanceof neo3d.Mesh) && mesh.isReady(this._gl))
	{
		if (mesh !== this._lastDrawnMesh)
		{
			if (this._bindMeshAttribs(mesh))
			{
				this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
				this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, mesh.getIndexVBO());
				this._lastDrawnMesh = mesh;
			}
			else
			{
				this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
				this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
				this._lastDrawnMesh = null;
				return false;
			}
		}

		var primitiveType = this._overridenPrimitiveType;
		if (primitiveType === neo3d.Mesh.PRIMITIVE_TYPE.NO_PRIMITIVE)
			primitiveType = mesh.getPrimitiveType();

		switch (primitiveType)
		{
		case neo3d.Mesh.PRIMITIVE_TYPE.POINTS:
			primitiveType = this._gl.POINTS;
			break;

		case neo3d.Mesh.PRIMITIVE_TYPE.LINES:
			primitiveType = this._gl.LINES;
			break;

		case neo3d.Mesh.PRIMITIVE_TYPE.LINE_STRIP:
			primitiveType = this._gl.LINE_STRIP;
			break;

		case neo3d.Mesh.PRIMITIVE_TYPE.LINE_LOOP:
			primitiveType = this._gl.LINE_LOOP;
			break;

		case neo3d.Mesh.PRIMITIVE_TYPE.TRIANGLES:
			primitiveType = this._gl.TRIANGLES;
			break;

		case neo3d.Mesh.PRIMITIVE_TYPE.TRIANGLE_STRIP:
			primitiveType = this._gl.TRIANGLE_STRIP;
			break;

		case neo3d.Mesh.PRIMITIVE_TYPE.TRIANGLE_FAN:
			primitiveType = this._gl.TRIANGLE_FAN;
			break;

		default:
			return false;
		}

		if (typeof(firstPointIndex) === "number")
		{
			if (firstPointIndex < 0)
				firstPointIndex = 0;
		}
		else
			firstPointIndex = 0;

		var maxPoints = mesh.getPointCount() - firstPointIndex;
		if (typeof(nbPoints) === "number")
		{
			if (nbPoints > maxPoints)
				nbPoints = maxPoints;
		}
		else
			nbPoints = maxPoints;

		if (nbPoints <= 0)
			return true;

		var indexType = mesh.getIndexType();
		switch (indexType)
		{
		case neo3d.Mesh.INDEX_TYPE.NO_INDEX:
			this._gl.drawArrays(primitiveType, firstPointIndex, nbPoints);
			break;

		case neo3d.Mesh.INDEX_TYPE.UNSIGNED_SHORT:
			this._gl.drawElements(primitiveType, nbPoints, this._gl.UNSIGNED_SHORT, firstPointIndex * 2);
			break;

		case neo3d.Mesh.INDEX_TYPE.UNSIGNED_INT:
			this._gl.drawElements(primitiveType, nbPoints, this._gl.UNSIGNED_INT, firstPointIndex * 4);
			break;

		default:
			return false;
		}

		return true;
	}

	return false;
};
