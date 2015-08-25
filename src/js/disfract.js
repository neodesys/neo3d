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

(function(disfract)
{
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

	disfract.main = function()
	{
		var switchDrawingButton = document.getElementById("switchDrawing");
		var fpsSpan = document.getElementById("fps");

		var showFPS = function()
		{
			fpsSpan.innerHTML = neo3d.getFPS().toFixed(3) + " fps";
			setTimeout(showFPS, 1000);
		};
		showFPS();

		var rdr = {
			onInitContext: function(gl)
			{
				//TODO: onInitContext
				gl.clearColor(0, 0, 0, 1);
				gl.enable(gl.DEPTH_TEST);

				var vtxShaderSrc =
					"attribute vec3 aVtxPosition;\n" +
					"uniform mat4 uPMVMatrix;\n" +
					"void main() {\n" +
					"gl_Position = uPMVMatrix * vec4(aVtxPosition, 1.0);\n}";

				var fragShaderSrc =
					"precision mediump float;\n" +
					"void main() {\n" +
					"gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}";

				var prog = neo3d.loadProgram(gl, vtxShaderSrc, fragShaderSrc);
				if (prog)
				{
					prog.vtxPosition = gl.getAttribLocation(prog, "aVtxPosition");
					prog.pmvMatrix = gl.getUniformLocation(prog, "uPMVMatrix");
				}

				this.prog = prog;
			},

			onSurfaceResized: function(gl, width, height)
			{
				gl.viewport(0, 0, width, height);
			},

			onDrawFrame: function(gl)
			{
				//TODO: onDrawFrame
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			}
		};

		var rdrSurf = neo3d.createRenderingSurface("drawSurf", rdr);
		if (rdrSurf)
		{
			neo3d.startDrawing();
			switchDrawingButton.addEventListener("click", function()
			{
				_switchDrawingState(switchDrawingButton);
			});
		}
		else
			alert("WebGL is not available");
	};
})(window.disfract = window.disfract || {});
