/**
 * Neo3D
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

var Mesh = require("./Mesh");

var PlaneMesh = module.exports = function(width, height, vSubdivs, hSubdivs, bGenTexCoords)
{
    if ((typeof (width) === "number") && (width > 0.0))
    {
        width *= 0.5;
    }
    else
    {
        width = 1.0;
    }

    if ((typeof (height) === "number") && (height > 0.0))
    {
        height *= 0.5;
    }
    else
    {
        height = 1.0;
    }

    if ((typeof (vSubdivs) !== "number") || (vSubdivs < 1))
    {
        vSubdivs = 1;
    }

    if ((typeof (hSubdivs) !== "number") || (hSubdivs < 1))
    {
        hSubdivs = 1;
    }

    var nbVtx = (vSubdivs + 1) * (hSubdivs + 1);
    while (nbVtx > 65536)
    {
        if (vSubdivs > hSubdivs)
        {
            vSubdivs >>= 1;
        }
        else
        {
            hSubdivs >>= 1;
        }

        nbVtx = (vSubdivs + 1) * (hSubdivs + 1);
    }

    var indexType = Mesh.INDEX_TYPE.NO_INDEX;
    if (nbVtx > 4)
    {
        indexType = Mesh.INDEX_TYPE.UNSIGNED_SHORT;
    }

    Mesh.call(this, Mesh.PRIMITIVE_TYPE.TRIANGLE_STRIP, indexType);

    this._dim = [-width, -height, width, height];
    this._subdivs = [vSubdivs, hSubdivs];
    this._bGenTexCoords = (bGenTexCoords === true);
};

PlaneMesh.prototype = Object.create(Mesh.prototype);
PlaneMesh.prototype.constructor = PlaneMesh;

PlaneMesh.prototype._initAttribConfig = function()
{
    var attribConfig = new Mesh.AttribConfig();
    if (this._bGenTexCoords)
    {
        attribConfig.stride = 20; //size of [x, y, z, u, v] floats
    }

    this._attribConfigList[Mesh.ATTRIB_TYPE.VERTEX] = attribConfig;

    if (this._bGenTexCoords)
    {
        attribConfig = new Mesh.AttribConfig();
        attribConfig.nbComponents = 2;
        attribConfig.offset = 12; //size of [x, y, z] floats
        attribConfig.stride = 20; //size of [x, y, z, u, v] floats

        this._attribConfigList[Mesh.ATTRIB_TYPE.TEX_COORDS] = attribConfig;
    }

    this._pointCount = 2 * this._subdivs[0] * (this._subdivs[1] + 2) - 2;
};

PlaneMesh.prototype._initVBO = function()
{
    var vtx;

    if (this._indexType === Mesh.INDEX_TYPE.UNSIGNED_SHORT)
    {
        var idx = [],
            x = this._dim[0],
            y = this._dim[1],
            xStep = (this._dim[2] - this._dim[0]) / this._subdivs[0],
            yStep = (this._dim[3] - this._dim[1]) / this._subdivs[1],
            index = 0,
            i = 0,
            j = 0;

        vtx = [];

        if (this._bGenTexCoords)
        {
            var u = 0.0,
                v = 0.0,
                uStep = 1.0 / this._subdivs[0],
                vStep = 1.0 / this._subdivs[1];

            for (i = 0; i <= this._subdivs[0]; ++i)
            {
                for (j = 0; j < this._subdivs[1]; ++j)
                {
                    vtx.push(x, y, 0.0, u, v);

                    y += yStep;
                    v += vStep;

                    if (i < this._subdivs[0])
                    {
                        idx.push(index++, index + this._subdivs[1]);
                    }
                }

                vtx.push(x, this._dim[3], 0.0, u, 1.0);

                if (i < this._subdivs[0] - 1)
                {
                    x += xStep;
                    u += uStep;
                }
                else
                {
                    x = this._dim[2];
                    u = 1.0;
                }

                if (i < this._subdivs[0])
                {
                    idx.push(index++, index + this._subdivs[1]);

                    //Add degenerated triangles to strip to get back to next
                    //column bottom
                    if (i < this._subdivs[0] - 1)
                    {
                        idx.push(index + this._subdivs[1], index);
                    }
                }

                y = this._dim[1];
                v = 0.0;
            }
        }
        else
        {
            for (i = 0; i <= this._subdivs[0]; ++i)
            {
                for (j = 0; j < this._subdivs[1]; ++j)
                {
                    vtx.push(x, y, 0.0);

                    y += yStep;

                    if (i < this._subdivs[0])
                    {
                        idx.push(index++, index + this._subdivs[1]);
                    }
                }

                vtx.push(x, this._dim[3], 0.0);

                if (i < this._subdivs[0] - 1)
                {
                    x += xStep;
                }
                else
                {
                    x = this._dim[2];
                }

                if (i < this._subdivs[0])
                {
                    idx.push(index++, index + this._subdivs[1]);

                    //Add degenerated triangles to strip to get back to next
                    //column bottom
                    if (i < this._subdivs[0] - 1)
                    {
                        idx.push(index + this._subdivs[1], index);
                    }
                }

                y = this._dim[1];
            }
        }

        this._indexVBO = this._createStaticVBO(new Uint16Array(idx), true);
    }
    else if (this._bGenTexCoords)
    {
        vtx = [
            this._dim[0], this._dim[1], 0.0, 0.0, 0.0,
            this._dim[2], this._dim[1], 0.0, 1.0, 0.0,
            this._dim[0], this._dim[3], 0.0, 0.0, 1.0,
            this._dim[2], this._dim[3], 0.0, 1.0, 1.0
        ];
    }
    else
    {
        vtx = [
            this._dim[0], this._dim[1], 0.0,
            this._dim[2], this._dim[1], 0.0,
            this._dim[0], this._dim[3], 0.0,
            this._dim[2], this._dim[3], 0.0
        ];
    }

    this._attribVBOList[0] = this._createStaticVBO(new Float32Array(vtx));
};
