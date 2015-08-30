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

(function(neo3d)
{
	var _glSurfaces = [];

	var RenderingSurface = function(gl, rdr)
	{
		this._gl = gl;
		this._rdr = rdr;
		this._autoDraw = true;

		this._lastDrawingBufferWidth = 0;
		this._lastDrawingBufferHeight = 0;

		this._glContextNeedsInit = true;
		this._glContextLost = false;

		var that = this;
		this._ctxLostListener = function(event)
		{
			event.preventDefault();
			that._glContextLost = true;
		};

		this._ctxRestoredListener = function()
		{
			that._glContextNeedsInit = true;
			that._glContextLost = false;
		};

		gl.canvas.addEventListener("webglcontextlost", this._ctxLostListener);
		gl.canvas.addEventListener("webglcontextrestored", this._ctxRestoredListener);
	};

	RenderingSurface.prototype.destroy = function()
	{
		if (this._gl)
		{
			var canvas = this._gl.canvas;
			canvas.removeEventListener("webglcontextlost", this._ctxLostListener);
			canvas.removeEventListener("webglcontextrestored", this._ctxRestoredListener);

			var size = _glSurfaces.length;
			for (var i = 0; i < size; ++i)
			{
				if (_glSurfaces[i] === this)
				{
					_glSurfaces.splice(i, 1);
					break;
				}
			}

			this._gl = null;
			this._rdr = null;

			//Reset the detached canvas forcing a redraw
			canvas.width++;
			canvas.width--;
		}
	};

	RenderingSurface.prototype._renderFrame = function(t)
	{
		if (this._glContextLost || !this._gl)
			return;

		if (this._glContextNeedsInit)
		{
			this._glContextNeedsInit = false;
			this._lastDrawingBufferWidth = 0;
			this._lastDrawingBufferHeight = 0;
			this._rdr.onInitContext(this._gl);
		}

		if ((this._lastDrawingBufferWidth !== this._gl.drawingBufferWidth) ||
			(this._lastDrawingBufferHeight !== this._gl.drawingBufferHeight))
		{
			this._lastDrawingBufferWidth = this._gl.drawingBufferWidth;
			this._lastDrawingBufferHeight = this._gl.drawingBufferHeight;
			this._rdr.onSurfaceResized(this._gl, this._lastDrawingBufferWidth, this._lastDrawingBufferHeight);
		}

		this._rdr.onDrawFrame(this._gl, t);
	};

	var _perfNow = window.performance ? (window.performance.now ||
		window.performance.mozNow || window.performance.webkitNow ||
		window.performance.oNow || window.performance.msNow ||
		Date.now) : Date.now;

	RenderingSurface.prototype.drawSingleFrame = function()
	{
		this._renderFrame(_perfNow());
	};

	RenderingSurface.prototype.setAutoDrawing = function(bEnable)
	{
		this._autoDraw = bEnable ? true : false;
	};

	RenderingSurface.prototype.isAutoDrawing = function()
	{
		return this._autoDraw;
	};

	var _drawRequestID = 0;

	var _lastDrawingTime = 0;

	var _fps = 0;

	var _requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
		window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(cb)
		{
			return window.setTimeout(cb, 16);
		};

	var _cancelAnimationFrame = window.cancelAnimationFrame ||
		window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
		window.oCancelAnimationFrame || window.msCancelAnimationFrame ||
		function(id)
		{
			window.clearTimeout(id);
		};

	function _continuousFrameDrawing(t)
	{
		if (!_drawRequestID)
			return;

		if (_lastDrawingTime)
		{
			var dt = t - _lastDrawingTime;
			if (dt > 0)
				_fps = 0.9 * _fps + 100.0 / dt;
		}
		_lastDrawingTime = t;

		var size = _glSurfaces.length;
		for (var i = 0; i < size; ++i)
		{
			var rdrSurf = _glSurfaces[i];
			if (rdrSurf._autoDraw)
			{
				try
				{
					rdrSurf._renderFrame(t);
				}
				catch (e)
				{
					console.warn("cannot draw GL frame on rendering surface #" + i + " (" + e.message + ")");
				}
			}
		}

		if (_drawRequestID)
			_drawRequestID = _requestAnimationFrame(_continuousFrameDrawing);
	}

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

	function _loadBuffer(gl, target, data, usage)
	{
		var vbo = gl.createBuffer();
		gl.bindBuffer(target, vbo);
		gl.bufferData(target, data, usage);
		gl.bindBuffer(target, null);

		var error = gl.getError();
		if (error !== gl.NO_ERROR)
		{
			if (error !== gl.CONTEXT_LOST_WEBGL)
			{
				console.warn("cannot load buffer (err: #" + error + ")");
				gl.deleteBuffer(vbo);
			}

			vbo = null;
		}

		return vbo;
	}

	neo3d.createRenderingSurface = function(canvas, rdr)
	{
		if ((typeof(canvas) === "string") && canvas)
			canvas = document.getElementById(canvas);

		if (!(canvas instanceof HTMLCanvasElement) ||
			!rdr || (typeof(rdr) !== "object") ||
			(typeof(rdr.onInitContext) !== "function") ||
			(typeof(rdr.onSurfaceResized) !== "function") ||
			(typeof(rdr.onDrawFrame) !== "function"))
			return null;

		var size = _glSurfaces.length;
		for (var i = 0; i < size; ++i)
		{
			if (_glSurfaces[i]._gl.canvas === canvas)
				return null;
		}

		try
		{
			var gl = canvas.getContext("webgl");
			if (gl instanceof WebGLRenderingContext)
			{
				var rdrSurf = new RenderingSurface(gl, rdr);
				_glSurfaces.push(rdrSurf);
				return rdrSurf;
			}
		}
		catch (e)
		{
			console.error("cannot fetch GL context (" + e.message + ")");
		}

		return null;
	};

	neo3d.findRenderingSurface = function(canvas)
	{
		if ((typeof(canvas) === "string") && canvas)
			canvas = document.getElementById(canvas);

		if (canvas instanceof HTMLCanvasElement)
		{
			var size = _glSurfaces.length;
			for (var i = 0; i < size; ++i)
			{
				var rdrSurf = _glSurfaces[i];
				if (rdrSurf._gl.canvas === canvas)
					return rdrSurf;
			}
		}

		return null;
	};

	neo3d.startDrawing = function()
	{
		if (!_drawRequestID)
			_drawRequestID = _requestAnimationFrame(_continuousFrameDrawing);
	};

	neo3d.stopDrawing = function()
	{
		if (_drawRequestID)
		{
			_cancelAnimationFrame(_drawRequestID);
			_drawRequestID = 0;
			_lastDrawingTime = 0;
			_fps = 0;
		}
	};

	neo3d.isDrawing = function()
	{
		return _drawRequestID ? true : false;
	};

	neo3d.getFPS = function()
	{
		return _fps;
	};

	neo3d.loadVertexShader = function(gl, src)
	{
		if ((gl instanceof WebGLRenderingContext) &&
			src && (typeof(src) === "string"))
			return _loadShader(gl, gl.VERTEX_SHADER, src);
		else
			return null;
	};

	neo3d.loadFragmentShader = function(gl, src)
	{
		if ((gl instanceof WebGLRenderingContext) &&
			src && (typeof(src) === "string"))
			return _loadShader(gl, gl.FRAGMENT_SHADER, src);
		else
			return null;
	};

	neo3d.linkProgram = function(gl, vertexShader, fragmentShader)
	{
		var prog = null;
		if ((gl instanceof WebGLRenderingContext) &&
			(vertexShader instanceof WebGLShader) &&
			(fragmentShader instanceof WebGLShader))
		{
			prog = gl.createProgram();
			gl.attachShader(prog, vertexShader);
			gl.attachShader(prog, fragmentShader);
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
		}

		return prog;
	};

	neo3d.loadProgram = function(gl, vertexShaderSrc, fragmentShaderSrc)
	{
		var vtxShader = this.loadVertexShader(gl, vertexShaderSrc);
		if (vtxShader)
		{
			var fragShader = this.loadFragmentShader(gl, fragmentShaderSrc);
			if (fragShader)
			{
				var prog = this.linkProgram(gl, vtxShader, fragShader);

				//Flag vertex and fragment shaders for deletion, so they
				//will be automatically deleted with the program
				gl.deleteShader(vtxShader);
				gl.deleteShader(fragShader);

				if (prog)
					return prog;
			}
			else
				gl.deleteShader(vtxShader);
		}

		return null;
	};

	neo3d.load2DTexture = function(gl, data, noRepeat, noMipmap)
	{
		if ((gl instanceof WebGLRenderingContext) &&
			(((data instanceof HTMLImageElement) && data.complete) ||
			 (data instanceof ImageData) ||
			 (data instanceof HTMLCanvasElement)))
		{
			var tex = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, tex);

			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			try
			{
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
			}
			catch (e)
			{
				gl.bindTexture(gl.TEXTURE_2D, null);
				gl.deleteTexture(tex);
				console.warn("cannot transfer texture data (" + e.message + ")");
				return null;
			}

			var param = gl.REPEAT;
			if (noRepeat)
				param = gl.CLAMP_TO_EDGE;

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, param);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, param);

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			if (noMipmap)
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			else
			{
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
				gl.generateMipmap(gl.TEXTURE_2D);
			}

			gl.bindTexture(gl.TEXTURE_2D, null);

			var error = gl.getError();
			if (error !== gl.NO_ERROR)
			{
				if (error !== gl.CONTEXT_LOST_WEBGL)
				{
					console.warn("cannot load 2D texture (err: #" + error + ")");
					gl.deleteTexture(tex);
				}

				tex = null;
			}

			return tex;
		}

		return null;
	};

	neo3d.loadStaticArrayBuffer = function(gl, data)
	{
		if ((gl instanceof WebGLRenderingContext) &&
			((data instanceof ArrayBuffer) ||
			 (data instanceof ArrayBufferView)))
			return _loadBuffer(gl, gl.ARRAY_BUFFER, data, gl.GL_STATIC_DRAW);
		else
			return null;
	};

	neo3d.loadStaticElementBuffer = function(gl, data)
	{
		if ((gl instanceof WebGLRenderingContext) &&
			((data instanceof ArrayBuffer) ||
			 (data instanceof ArrayBufferView)))
			return _loadBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, data, gl.GL_STATIC_DRAW);
		else
			return null;
	};
})(window.neo3d = window.neo3d || {});
