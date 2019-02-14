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

var Mesh = module.exports = function(primitiveType, indexType)
{
    if ((typeof (primitiveType) === "number") &&
        (primitiveType > 0) && (primitiveType < Mesh.PRIMITIVE_TYPE.NB_ELEMS))
    {
        this._primitiveType = primitiveType;
    }
    else
    {
        this._primitiveType = 0;
    }

    if ((typeof (indexType) === "number") &&
        (indexType > 0) && (indexType < Mesh.INDEX_TYPE.NB_ELEMS))
    {
        this._indexType = indexType;
    }
    else
    {
        this._indexType = 0;
    }

    this._gl = null;
    this._pointCount = 0;
    this._attribConfigList = null;
    this._attribVBOList = null;
    this._indexVBO = null;
};

Mesh.AttribConfig = function()
{
    this.vboIdx = 0;          //associated VBO index in _attribVBOList array
    this.componentType = Mesh.COMPONENT_TYPE.FLOAT; //one of Mesh.COMPONENT_TYPE values
    this.nbComponents = 3;    //from 1 to 4
    this.offset = 0;          //in bytes
    this.stride = 0;          //in bytes, maximum stride in WebGL is 255
    this.bNormalized = false; //if true, values stored in an integer format are mapped to [-1.f, 1.f] or [0.f, 1.f]
};

Mesh.PRIMITIVE_TYPE = Object.freeze({
    NO_PRIMITIVE: 0,
    POINTS: 1,
    LINES: 2,
    LINE_STRIP: 3,
    LINE_LOOP: 4,
    TRIANGLES: 5,
    TRIANGLE_STRIP: 6,
    TRIANGLE_FAN: 7,
    NB_ELEMS: 8
});

Mesh.INDEX_TYPE = Object.freeze({
    NO_INDEX: 0,
    UNSIGNED_SHORT: 1,
    UNSIGNED_INT: 2,
    NB_ELEMS: 3
});

Mesh.COMPONENT_TYPE = Object.freeze({
    NO_COMPONENT: 0,
    BYTE: 1,
    UNSIGNED_BYTE: 2,
    SHORT: 3,
    UNSIGNED_SHORT: 4,
    FLOAT: 5,
    NB_ELEMS: 6
});

Mesh.ATTRIB_TYPE = Object.freeze({
    VERTEX: 0,
    TEX_COORDS: 1,
    VERTEX_COLOR: 2,
    NORMAL: 3,
    BINORMAL: 4,
    TANGENT: 5,
    BONE_IDX: 6,
    BONE_WEIGHT: 7,
    USER_ATTRIB: 8
});

Mesh.prototype._initAttribConfig = function()
{
    //Override this method to populate this._attribConfigList array with
    //Mesh.AttribConfig objects and set this._pointCount value.
    //this._gl is guaranteed to be valid.
    //this._attribConfigList is guaranteed to be a valid empty array.
    //
    //Don't create VBO yet, VBO will be created during this._initVBO() call.
};

Mesh.prototype._initVBO = function()
{
    //Override this method to populate this._attribVBOList array and init
    //this._indexVBO if this._indexType is different from
    //Mesh.INDEX_TYPE.NO_INDEX.
    //this._gl is guaranteed to be valid.
    //this._pointCount is guaranteed to be strictly positive.
    //this._attribConfigList is guaranteed to be a valid array.
    //this._attribVBOList is guaranteed to be a valid empty array.
    //
    //WARNING: check this._indexType actual value before building
    //this._indexVBO if needed. If this._indexType has been set to
    //Mesh.INDEX_TYPE.UNSIGNED_INT at object construction, its value may
    //have been switched to Mesh.INDEX_TYPE.UNSIGNED_SHORT during mesh
    //initialization if OpenGL OES_element_index_uint extension is not
    //available. You have to build the index VBO according to
    //this._indexType ACTUAL value and NOT the value set during construction.
};

Mesh.prototype._createStaticVBO = function(data, bIndexVBO)
{
    if (this._gl && !this._gl.isContextLost() &&
        data && (data.buffer instanceof ArrayBuffer))
    {
        var target = this._gl.ARRAY_BUFFER;
        if (bIndexVBO === true)
        {
            target = this._gl.ELEMENT_ARRAY_BUFFER;
        }

        var vbo = this._gl.createBuffer();
        if (vbo)
        {
            this._gl.bindBuffer(target, vbo);
            this._gl.bufferData(target, data, this._gl.STATIC_DRAW);
            this._gl.bindBuffer(target, null);

            var error = this._gl.getError();
            if (error !== this._gl.NO_ERROR)
            {
                if (error !== this._gl.CONTEXT_LOST_WEBGL)
                {
                    window.console.warn("cannot create static VBO (err: #" + error + ")");
                    this._gl.deleteBuffer(vbo);
                }

                return null;
            }

            return vbo;
        }
    }

    return null;
};

Mesh.prototype.init = function(gl, bContextLost)
{
    if (!(gl instanceof WebGLRenderingContext) || gl.isContextLost() ||
        (this._gl && (this._gl !== gl)))
    {
        return false;
    }

    //If this._attribVBOList is valid, then this._gl, this._attribConfigList
    //and this._pointCount are guaranteed to be valid.
    //Indeed, this._indexType equals Mesh.INDEX_TYPE.NO_INDEX or
    //this._indexVBO is also valid.
    if (bContextLost)
    {
        this._attribVBOList = null;
        this._indexVBO = null;
    }
    else if (this._attribVBOList)
    {
        return true;
    }

    if (!this._attribConfigList)
    {
        //Init AttribConfig list
        this._gl = gl;
        this._attribConfigList = [];
        this._initAttribConfig();

        if ((this._attribConfigList.length <= 0) || (this._pointCount <= 0))
        {
            this._gl = null;
            this._attribConfigList = null;
            this._pointCount = 0;
            return false;
        }

        if ((this._indexType === Mesh.INDEX_TYPE.UNSIGNED_INT) &&
            !this._gl._bExtendedIndexType)
        {
            this._indexType = Mesh.INDEX_TYPE.UNSIGNED_SHORT;
            this._bHadExtendedIndexType = true;
        }
    }

    //Init VBO buffers
    this._attribVBOList = [];
    this._initVBO();

    var nbBuffers = this._attribVBOList.length;
    if (nbBuffers <= 0)
    {
        this._attribVBOList = null;

        if (this._indexVBO)
        {
            this._gl.deleteBuffer(this._indexVBO);
            this._indexVBO = null;
        }

        return false;
    }

    if ((this._indexType !== Mesh.INDEX_TYPE.NO_INDEX) && !this._indexVBO)
    {
        for (var i = 0; i < nbBuffers; ++i)
        {
            this._gl.deleteBuffer(this._attribVBOList[i]);
        }

        this._attribVBOList = null;
        return false;
    }

    return true;
};

Mesh.prototype.shut = function()
{
    //If this._attribVBOList is valid, then this._gl is guaranteed to be valid.
    if (this._attribVBOList && !this._gl.isContextLost())
    {
        var nbBuffers = this._attribVBOList.length;
        for (var i = 0; i < nbBuffers; ++i)
        {
            this._gl.deleteBuffer(this._attribVBOList[i]);
        }

        if (this._indexVBO)
        {
            this._gl.deleteBuffer(this._indexVBO);
        }
    }

    this._gl = null;
    this._pointCount = 0;
    this._attribConfigList = null;
    this._attribVBOList = null;
    this._indexVBO = null;

    if (this._bHadExtendedIndexType === true)
    {
        this._indexType = Mesh.INDEX_TYPE.UNSIGNED_INT;
        delete this._bHadExtendedIndexType;
    }
};

Mesh.prototype.isReady = function(gl)
{
    //If this._attribVBOList is valid, then this._gl, this._attribConfigList
    //and this._pointCount are guaranteed to be valid.
    //Indeed, this._indexType equals Mesh.INDEX_TYPE.NO_INDEX or
    //this._indexVBO is also valid.
    return (this._attribVBOList && (this._gl === gl));
};

Mesh.prototype.getPrimitiveType = function()
{
    return this._primitiveType;
};

Mesh.prototype.getIndexType = function()
{
    return this._indexType;
};

Mesh.prototype.getIndexVBO = function()
{
    return this._indexVBO;
};

Mesh.prototype.getPointCount = function()
{
    return this._pointCount;
};

Mesh.prototype.bindAttribBuffer = function(location, attribType, layer)
{
    //If this._attribVBOList is valid, then this._gl, this._attribConfigList
    //and this._pointCount are guaranteed to be valid.
    if (this._attribVBOList &&
        (typeof (location) === "number") && (location >= 0) &&
        (typeof (attribType) === "number") && (attribType >= 0) &&
        (attribType < this._attribConfigList.length))
    {
        var attribConfig = this._attribConfigList[attribType];
        if (attribConfig instanceof Array)
        {
            var nbLayers = attribConfig.length;
            if (nbLayers <= 0)
            {
                return false;
            }

            if ((typeof (layer) === "number") && (layer > 0))
            {
                if (layer >= nbLayers)
                {
                    layer = nbLayers - 1;
                }
            }
            else
            {
                layer = 0;
            }

            attribConfig = attribConfig[layer];
        }

        if ((attribConfig instanceof Mesh.AttribConfig) &&
            (attribConfig.vboIdx >= 0) &&
            (attribConfig.vboIdx < this._attribVBOList.length))
        {
            var vbo = this._attribVBOList[attribConfig.vboIdx];
            if (vbo)
            {
                var compType;
                switch (attribConfig.componentType)
                {
                    case Mesh.COMPONENT_TYPE.BYTE:
                        compType = this._gl.BYTE;
                        break;

                    case Mesh.COMPONENT_TYPE.UNSIGNED_BYTE:
                        compType = this._gl.UNSIGNED_BYTE;
                        break;

                    case Mesh.COMPONENT_TYPE.SHORT:
                        compType = this._gl.SHORT;
                        break;

                    case Mesh.COMPONENT_TYPE.UNSIGNED_SHORT:
                        compType = this._gl.UNSIGNED_SHORT;
                        break;

                    case Mesh.COMPONENT_TYPE.FLOAT:
                        compType = this._gl.FLOAT;
                        break;

                    default:
                        return false;
                }

                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vbo);
                this._gl.vertexAttribPointer(location, attribConfig.nbComponents, compType, attribConfig.bNormalized, attribConfig.stride, attribConfig.offset);

                return true;
            }
        }
    }

    return false;
};
