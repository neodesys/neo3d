/**
 * Neo3D Samples
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

//All samples available in this directory are automatically loaded.
//A sample MUST export 2 functions by default:
//- getName(): must return the sample friendly name as a string
//- main(drawSurf): with drawSurf the canvas to use when calling
//                  neo3d.createRenderingSurface()
//
//A sample CAN also provide optional boolean flags (false if not present):
//- disabled: set to true to NOT load the sample
//- hd: set to true to use an HD back surface for rendering
//      (1920x1080 instead of 640x360)
//- open: set to true to open the sample by default when loading the page
//
//Each sample CAN also export any of the 2 following functions:
//- onStart(): will be called by framework when sample is started
//- onStop(): will be called by framework when sample is stopped

//Ask webpack to automatically require all samples
var _context = require.context(".", true, /^\.\/[^\/]+\/index\.js$/);
var _samples = [];
function _emptyFunc() { }
_context.keys().forEach(function(key)
{
    var sample = _context(key);
    if (sample.disabled !== true)
    {
        if (typeof (sample.onStart) !== "function")
        {
            sample.onStart = _emptyFunc;
        }

        if (typeof (sample.onStop) !== "function")
        {
            sample.onStop = _emptyFunc;
        }

        sample._rdrSurf = null;
        _samples.push(sample);
    }
});

var neo3d = require("neo3d");

window.addEventListener("load", function()
{
    var switchDrawingButton = document.getElementById("switchDrawingButton");
    switchDrawingButton.value = "Stop";
    switchDrawingButton.addEventListener("click", function(e)
    {
        e.preventDefault();

        if (neo3d.isDrawing())
        {
            neo3d.stopDrawing();
            switchDrawingButton.value = "Start";

            _samples.forEach(function(sample)
            {
                if (sample._rdrSurf && sample._rdrSurf.isAutoDrawing())
                {
                    sample.onStop();
                }
            });
        }
        else
        {
            neo3d.startDrawing();
            switchDrawingButton.value = "Stop";

            _samples.forEach(function(sample)
            {
                if (sample._rdrSurf && sample._rdrSurf.isAutoDrawing())
                {
                    sample.onStart();
                }
            });
        }
    });

    var fpsSpan = document.getElementById("fpsSpan");
    function showFPS()
    {
        fpsSpan.innerText = neo3d.getFPS().toFixed(3) + " fps";
        setTimeout(showFPS, 1000);
    }

    neo3d.startDrawing();
    showFPS();

    function toggleSample(sample, e)
    {
        e.preventDefault();

        if (sample._rdrSurf)
        {
            var article = e.target.parentNode.parentNode;

            if (sample._rdrSurf.isAutoDrawing())
            {
                sample._rdrSurf.setAutoDrawing(false);
                article.classList.add("closed");

                if (neo3d.isDrawing())
                {
                    sample.onStop();
                }
            }
            else
            {
                sample._rdrSurf.setAutoDrawing(true);
                article.classList.remove("closed");

                if (neo3d.isDrawing())
                {
                    sample.onStart();
                }
            }
        }
    }

    var samplesRoot = document.getElementById("samplesRoot");
    _samples.forEach(function(sample)
    {
        var toggle = document.createElement("a");
        toggle.href = "#";
        toggle.className = "toggle";
        toggle.innerText = sample.getName();
        toggle.addEventListener("click", toggleSample.bind(undefined, sample));

        var header = document.createElement("h2");
        header.appendChild(toggle);

        var drawSurf = document.createElement("canvas");
        if (sample.hd === true)
        {
            drawSurf.width = 1920;
            drawSurf.height = 1080;
        }
        else
        {
            drawSurf.width = 640;
            drawSurf.height = 360;
        }

        var article = document.createElement("article");
        article.appendChild(header);
        article.appendChild(drawSurf);

        samplesRoot.appendChild(article);
        sample.main(drawSurf);

        sample._rdrSurf = neo3d.findRenderingSurface(drawSurf);
        if (sample._rdrSurf)
        {
            if (sample.open === true)
            {
                sample.onStart();
            }
            else
            {
                sample._rdrSurf.setAutoDrawing(false);
                article.classList.add("closed");
            }
        }
        else
        {
            article.classList.add("closed");
            article.classList.add("failed");
        }
    });
});
