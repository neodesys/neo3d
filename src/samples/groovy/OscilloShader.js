/**
 * Groovy
 *
 * Copyright (C) 2019, Loïc Le Page
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

var _oscilloShaderSrc = {
    vert: require("./oscillo.vert"),
    frag: require("./oscillo.frag")
};

var OscilloShader = module.exports = function()
{
    neo3d.Shader.call(this, _oscilloShaderSrc.vert, _oscilloShaderSrc.frag);

    this._aspectRatios = new neo3d.Vec2();

    this._attribLoc = {
        vtxPosition: -1
    };

    this._uniformLoc = {
        aspectRatios: -1,
        oscilloData: -1
    };
};

OscilloShader.prototype = Object.create(neo3d.Shader.prototype);
OscilloShader.prototype.constructor = OscilloShader;

OscilloShader.prototype._initShaderLocations = function()
{
    this._attribLoc.vtxPosition = this._gl.getAttribLocation(this._prog, "aVtxPosition");
    this._uniformLoc.aspectRatios = this._gl.getUniformLocation(this._prog, "uAspectRatios");
    this._uniformLoc.oscilloData = this._gl.getUniformLocation(this._prog, "uOscilloData");
};

OscilloShader.prototype._bindShader = function()
{
    this._gl.enableVertexAttribArray(this._attribLoc.vtxPosition);
    this._gl.uniform2fv(this._uniformLoc.aspectRatios, this._aspectRatios.buffer);
    this._gl.uniform1i(this._uniformLoc.oscilloData, 0);
    return true;
};

OscilloShader.prototype._unbindShader = function()
{
    this._gl.disableVertexAttribArray(this._attribLoc.vtxPosition);
};

OscilloShader.prototype._bindMeshAttribs = function(mesh)
{
    return mesh.bindAttribBuffer(this._attribLoc.vtxPosition, neo3d.Mesh.ATTRIB_TYPE.VERTEX);
};

OscilloShader.prototype.setAspectRatio = function(w, h)
{
    var ratio = 1.0;
    if ((w > 0) && (h > 0))
    {
        ratio = w / h;
    }

    w = h = 1.0;
    if (ratio >= 1.0)
    {
        w /= ratio;
    }
    else
    {
        h *= ratio;
    }

    this._aspectRatios.setFromValues(w, h);

    if (this.isBound())
    {
        this._gl.uniform2fv(this._uniformLoc.aspectRatios, this._aspectRatios.buffer);
    }
};
