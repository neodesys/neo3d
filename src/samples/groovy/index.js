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
var AudioSource = require("./AudioSource");

var _audioSample = new AudioSource(require("./rumba.mp3"));
var _oscilloShader = new OscilloShader();
var _fullscreenPlane = new neo3d.PlaneMesh();

var _timeDataTex = null;
var _freqDataTex = null;

function _createAndBindTextures(gl, bContextLost)
{
    if (!bContextLost && _timeDataTex && _freqDataTex)
    {
        return;
    }

    _timeDataTex = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, _timeDataTex);

    var data = _audioSample.fetchTimeData();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, data.length, 1, 0, gl.ALPHA, gl.UNSIGNED_BYTE, data);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    _freqDataTex = gl.createTexture();

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, _freqDataTex);

    data = _audioSample.fetchFreqData();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, data.length, 1, 0, gl.ALPHA, gl.UNSIGNED_BYTE, data);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
}

function _updateTextures(gl)
{
    gl.activeTexture(gl.TEXTURE0);
    var data = _audioSample.fetchTimeData();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, data.length, 1, 0, gl.ALPHA, gl.UNSIGNED_BYTE, data);

    gl.activeTexture(gl.TEXTURE1);
    data = _audioSample.fetchFreqData();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, data.length, 1, 0, gl.ALPHA, gl.UNSIGNED_BYTE, data);
}

var _renderer = {
    onInitContext: function(gl, bContextLost)
    {
        gl.clearColor(0.2, 0.15, 0.2, 1.0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        _oscilloShader.init(gl, bContextLost);
        _fullscreenPlane.init(gl, bContextLost);

        _createAndBindTextures(gl, bContextLost);
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
        _updateTextures(gl);
        _oscilloShader.drawMesh(_fullscreenPlane);
    }
};

var _playButton = null;

module.exports = {
    open: true,

    getName: function()
    {
        return "Groovy";
    },

    main: function(drawSurf)
    {
        neo3d.createRenderingSurface(drawSurf, _renderer, true);

        _playButton = document.createElement("a");
        _playButton.href = "#";
        _playButton.innerText = "PLAY";
        _playButton.style = "position: absolute;" +
            "top: 6px;" +
            "right: 6px;" +
            "color: #d6ef7d;" +
            "border: #d6ef7d solid 2px;" +
            "padding: 0.3em;" +
            "text-decoration: none;" +
            "background: #3b3c2a;" +
            "border-radius: 0.5em;";
        drawSurf.parentNode.appendChild(_playButton);

        var that = this;
        _playButton.addEventListener("click", function(e)
        {
            e.preventDefault();
            that.onStart();
        });
    },

    onStart: function()
    {
        _audioSample.play().then(function()
        {
            _playButton.style.display = "none";

        }, function()
        {
            _playButton.style.display = "block";
        });
    },

    onStop: function()
    {
        _audioSample.pause();
    }
};
