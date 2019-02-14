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
var FractalShader = require("./FractalShader");

function _switchDrawingState(button)
{
    if (neo3d.isDrawing())
    {
        neo3d.stopDrawing();
        button.value = "Start";
    }
    else
    {
        neo3d.startDrawing();
        button.value = "Stop";
    }
}

var _fractalShader = new FractalShader();
var _fullscreenPlane = new neo3d.PlaneMesh();

//TODO: implement user interactions
var _renderer = {
    _center: [-0.1528, 1.0397],

    _scale: 1.0,

    _aspectRatio: 1.0,

    onInitContext: function(gl, bContextLost)
    {
        gl.clearColor(0, 0, 0, 1);
        _fractalShader.init(gl, bContextLost);
        _fullscreenPlane.init(gl, bContextLost);
        _fractalShader.bind();
    },

    onSurfaceResized: function(gl, width, height)
    {
        gl.viewport(0, 0, width, height);
        this._aspectRatio = width / height;
    },

    onDrawFrame: function(gl)
    {
        this._scale += 0.005 * this._scale;
        if (this._scale > 200000.0)
        {
            this._scale = 1.0;
        }

        var size = [4.0, 4.0];
        if (this._scale > 0.0)
        {
            var s = 1.0 / this._scale;
            size[0] *= s;
            size[1] *= s;
        }

        if (this._aspectRatio >= 1.0)
        {
            size[0] *= this._aspectRatio;
        }
        else if (this._aspectRatio > 0.0)
        {
            size[1] /= this._aspectRatio;
        }

        gl.clear(gl.COLOR_BUFFER_BIT);

        _fractalShader.setPos(this._center[0], this._center[1]);
        _fractalShader.setSize(size[0], size[1]);
        _fractalShader.drawMesh(_fullscreenPlane);
    }
};

module.exports = {
    main: function(drawSurfaceId)
    {
        var div = document.createElement("div");
        div.style.marginBottom = "20px";
        div.innerHTML = '<input type="button" id="switchDrawingButton" value="Stop" style="cursor: pointer;">&nbsp;<span id="fpsSpan"></input>';

        var drawSurf = document.getElementById(drawSurfaceId);
        drawSurf.parentNode.insertBefore(div, drawSurf);

        var switchDrawingButton = document.getElementById("switchDrawingButton");
        var fpsSpan = document.getElementById("fpsSpan");

        var showFPS = function()
        {
            fpsSpan.innerText = neo3d.getFPS().toFixed(3) + " fps";
            setTimeout(showFPS, 1000);
        };
        showFPS();

        var rdrSurf = neo3d.createRenderingSurface(drawSurf, _renderer, true);
        if (rdrSurf)
        {
            neo3d.startDrawing();
            switchDrawingButton.addEventListener("click", function()
            {
                _switchDrawingState(switchDrawingButton);
            });
        }
        else
        {
            window.alert("WebGL is not available");
        }
    }
};
