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

var neo3d = require("neo3d");

var _fractalShaderSrc = {
    vert: require("./fractal.vert"),
    frag: require("./fractal.frag")
};

var FractalShader = module.exports = function()
{
    neo3d.Shader.call(this, _fractalShaderSrc.vert, _fractalShaderSrc.frag);

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

FractalShader.prototype = Object.create(neo3d.Shader.prototype);
FractalShader.prototype.constructor = FractalShader;

FractalShader.prototype._initShaderLocations = function()
{
    this._attribLoc.vtxPosition = this._gl.getAttribLocation(this._prog, "aVtxPosition");

    this._uniformLoc.pos = this._gl.getUniformLocation(this._prog, "uPos");
    this._uniformLoc.size = this._gl.getUniformLocation(this._prog, "uSize");
};

FractalShader.prototype._bindShader = function()
{
    this._gl.enableVertexAttribArray(this._attribLoc.vtxPosition);

    this._gl.uniform2fv(this._uniformLoc.pos, this._pos.buffer);
    this._gl.uniform2fv(this._uniformLoc.size, this._size.buffer);

    return true;
};

FractalShader.prototype._unbindShader = function()
{
    this._gl.disableVertexAttribArray(this._attribLoc.vtxPosition);
};

FractalShader.prototype._bindMeshAttribs = function(mesh)
{
    return mesh.bindAttribBuffer(this._attribLoc.vtxPosition, neo3d.Mesh.ATTRIB_TYPE.VERTEX);
};

FractalShader.prototype.setPos = function(x, y)
{
    this._pos.setFromValues(x, y);

    if (this.isBound())
    {
        this._gl.uniform2fv(this._uniformLoc.pos, this._pos.buffer);
    }
};

FractalShader.prototype.setSize = function(w, h)
{
    this._size.setFromValues(w, h);

    if (this.isBound())
    {
        this._gl.uniform2fv(this._uniformLoc.size, this._size.buffer);
    }
};
