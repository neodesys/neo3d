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
var OscilloShader = require("./OscilloShader");

var _audioSample = new Audio(require("./rumba.mp3"));
_audioSample.loop = true;

var _oscilloShader = new OscilloShader();
var _fullscreenPlane = new neo3d.PlaneMesh();

var _oscilloData = new Uint8Array(256);
var _oscilloDataTex = null;

function _createAndBindOscilloTexture(gl, bContextLost)
{
    if (!bContextLost && _oscilloDataTex)
    {
        return;
    }

    _oscilloDataTex = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, _oscilloDataTex);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, _oscilloData.length, 1, 0, gl.ALPHA, gl.UNSIGNED_BYTE, _oscilloData);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
}

function _updateOscilloTex(gl)
{
    //TODO: use audio waveform to update _oscilloData
    var idx = _oscilloData.length;
    while (--idx > 0)
    {
        _oscilloData[idx] = _oscilloData[idx - 1];
    }
    _oscilloData[0] = 127.5 * (1.0 + neo3d.math.sin(16.0 * new Date().getMilliseconds()));

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, _oscilloData.length, 1, 0, gl.ALPHA, gl.UNSIGNED_BYTE, _oscilloData);
}

var _renderer = {
    onInitContext: function(gl, bContextLost)
    {
        gl.clearColor(0, 0, 0, 1);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        _oscilloShader.init(gl, bContextLost);
        _fullscreenPlane.init(gl, bContextLost);

        _createAndBindOscilloTexture(gl, bContextLost);
        _oscilloShader.bind();
    },

    onSurfaceResized: function(gl, width, height)
    {
        gl.viewport(0, 0, width, height);
        _oscilloShader.setAspectRatio(width, height);
    },

    onDrawFrame: function(gl)
    {
        gl.clear(gl.COLOR_BUFFER_BIT);
        _updateOscilloTex(gl);
        _oscilloShader.drawMesh(_fullscreenPlane);
    }
};

module.exports = {
    open: true,

    getName: function()
    {
        return "Groovy";
    },

    main: function(drawSurf)
    {
        neo3d.createRenderingSurface(drawSurf, _renderer, true);
    },

    onStart: function()
    {
        _audioSample.play();
    },

    onStop: function()
    {
        _audioSample.pause();
    }
};
