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
 * @requires neo3d/Shader.js
 * @requires neo3d/Vec2.js
 */
(function(disfract)
{
	var _fractalShaderSrc = {
		vtx: [
			"attribute vec3 aVtxPosition;",

			"uniform vec2 uPos;",
			"uniform vec2 uSize;",

			"varying highp vec2 z0;",

			"void main() {",
			"	gl_Position = vec4(aVtxPosition, 1.0);",
			"	z0 = uPos + aVtxPosition.xy * uSize * 0.5;",
			"}"
		].join("\n"),

		frag: [
			"precision highp float;",

			"varying highp vec2 z0;",

			"const int MAX_ITER = 1500;",

			"void main() {",
			"	vec2 zn = z0;",
			"	float q = 0.0;",

			"	for (int i = 0; i < MAX_ITER; ++i) {",
			"		float f = zn.x;",
			"		zn.x = f * f - zn.y * zn.y + z0.x;",
			"		zn.y = 2.0 * f * zn.y + z0.y;",
			"		f = zn.x * zn.x + zn.y * zn.y;",
			"		if (f >= 4.0) {",
			"			q = float(i + 1);",
			"			break;",
			"		}",
			"	}",

			"	vec3 color = vec3(0.0);",
			"	if (q > 0.0)",
			"		color = mix(vec3(0.0, 0.0, 0.0), vec3(0.6, 0.9, 1.0), fract(0.008 * q));",
			"	gl_FragColor = vec4(color, 1.0);",
			"}"
		].join("\n")
	};

	disfract.FractalShader = function()
	{
		neo3d.Shader.call(this, _fractalShaderSrc.vtx, _fractalShaderSrc.frag);

		this._pos = new neo3d.Vec2();
		this._size = new neo3d.Vec2();

		this._attribLoc = {
			vtxPosition: -1
		};

		this._uniformLoc = {
			pos: -1,
			size: -1
		};
	};

	disfract.FractalShader.prototype = new neo3d.Shader();

	disfract.FractalShader.prototype._initShaderLocations = function()
	{
		this._attribLoc.vtxPosition = this._gl.getAttribLocation(this._prog, "aVtxPosition");

		this._uniformLoc.pos = this._gl.getUniformLocation(this._prog, "uPos");
		this._uniformLoc.size = this._gl.getUniformLocation(this._prog, "uSize");
	};

	disfract.FractalShader.prototype._bindShader = function()
	{
		this._gl.enableVertexAttribArray(this._attribLoc.vtxPosition);

		this._gl.uniform2fv(this._uniformLoc.pos, this._pos.buffer);
		this._gl.uniform2fv(this._uniformLoc.size, this._size.buffer);

		return true;
	};

	disfract.FractalShader.prototype._unbindShader = function()
	{
		this._gl.disableVertexAttribArray(this._attribLoc.vtxPosition);
	};

	disfract.FractalShader.prototype._bindMeshAttribs = function(mesh)
	{
		return mesh.bindAttribBuffer(this._attribLoc.vtxPosition, neo3d.Mesh.ATTRIB_TYPE.VERTEX);
	};

	disfract.FractalShader.prototype.setPos = function(x, y)
	{
		this._pos.setFromValues(x, y);

		if (this.isBound())
			this._gl.uniform2fv(this._uniformLoc.pos, this._pos.buffer);
	};

	disfract.FractalShader.prototype.setSize = function(w, h)
	{
		this._size.setFromValues(w, h);

		if (this.isBound())
			this._gl.uniform2fv(this._uniformLoc.size, this._size.buffer);
	};
})(window.disfract = window.disfract || {});
