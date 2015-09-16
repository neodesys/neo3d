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
 * @requires Quat.js
 * @requires Mat2.js
 */
neo3d.Mat3 = function()
{
	//Always initialized to 0
	this.buffer = new Float32Array(9);
	this.buffer[0] = this.buffer[4] = this.buffer[8] = 1.0;
};

neo3d.Mat3.prototype.setFromArray = function(arr)
{
	//Column 0
	this.buffer[0] = arr[0];
	this.buffer[1] = arr[1];
	this.buffer[2] = arr[2];

	//Column 1
	this.buffer[3] = arr[3];
	this.buffer[4] = arr[4];
	this.buffer[5] = arr[5];

	//Column 2
	this.buffer[6] = arr[6];
	this.buffer[7] = arr[7];
	this.buffer[8] = arr[8];

	return this;
};

neo3d.Mat3.prototype.setColumnVec3 = function(col, v3)
{
	var i = col * 3,
		inBuffer = v3.buffer;

	this.buffer[i] = inBuffer[0];
	this.buffer[i + 1] = inBuffer[1];
	this.buffer[i + 2] = inBuffer[2];

	return this;
};

neo3d.Mat3.prototype.setFromColumnsVec3 = function(v3i, v3j, v3k)
{
	var inBuffer = v3i.buffer;
	this.buffer[0] = inBuffer[0];
	this.buffer[1] = inBuffer[1];
	this.buffer[2] = inBuffer[2];

	inBuffer = v3j.buffer;
	this.buffer[3] = inBuffer[0];
	this.buffer[4] = inBuffer[1];
	this.buffer[5] = inBuffer[2];

	inBuffer = v3k.buffer;
	this.buffer[6] = inBuffer[0];
	this.buffer[7] = inBuffer[1];
	this.buffer[8] = inBuffer[2];

	return this;
};

neo3d.Mat3.prototype.setColumnVec2 = function(col, v2)
{
	var i = col * 3,
		inBuffer = v2.buffer;

	this.buffer[i] = inBuffer[0];
	this.buffer[i + 1] = inBuffer[1];
	this.buffer[i + 2] = (col === 2) ? 1.0 : 0.0;

	return this;
};

neo3d.Mat3.prototype.setFromColumnsVec2 = function(v2i, v2j, v2k)
{
	var inBuffer = v2i.buffer;
	this.buffer[0] = inBuffer[0];
	this.buffer[1] = inBuffer[1];
	this.buffer[2] = 0.0;

	inBuffer = v2j.buffer;
	this.buffer[3] = inBuffer[0];
	this.buffer[4] = inBuffer[1];
	this.buffer[5] = 0.0;

	inBuffer = v2k.buffer;
	this.buffer[6] = inBuffer[0];
	this.buffer[7] = inBuffer[1];
	this.buffer[8] = 1.0;

	return this;
};

neo3d.Mat3.prototype.setFromQuat = function(q)
{
	//q quaternion must be a unit quaternion
	neo3d.Mat3.bufferSetFromQuat(this.buffer, 0, q.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.setFromMat4RotScale = function(m4)
{
	neo3d.Mat3.bufferSetFromMat4RotScale(this.buffer, 0, m4.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.setFromRSTransfo3D = function(rotQuat, scaleV3)
{
	//rotQuat quaternion must be a unit quaternion
	neo3d.Mat3.bufferSetFromRSTransfo3D(this.buffer, 0, rotQuat.buffer, 0, scaleV3.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.setRotation2D = function(angle)
{
	neo3d.Mat3.bufferSetRotation2D(this.buffer, 0, angle);
	return this;
};

neo3d.Mat3.prototype.setRotScale2DFromMat2 = function(m2)
{
	neo3d.Mat3.bufferSetRotScale2DFromMat2(this.buffer, 0, m2.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.setFromTRSTransfo2D = function(transV2, rotAngle, scaleV2)
{
	neo3d.Mat3.bufferSetFromTRSTransfo2D(this.buffer, 0, transV2.buffer, 0, rotAngle, scaleV2.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.setIdentity = function()
{
	this.buffer[0] = this.buffer[4] = this.buffer[8] = 1.0;
	this.buffer[1] = this.buffer[2] = this.buffer[3] =
	this.buffer[5] = this.buffer[6] = this.buffer[7] = 0.0;

	return this;
};

neo3d.Mat3.prototype.copy = function(m3)
{
	var inBuffer = m3.buffer;

	//Column 0
	this.buffer[0] = inBuffer[0];
	this.buffer[1] = inBuffer[1];
	this.buffer[2] = inBuffer[2];

	//Column 1
	this.buffer[3] = inBuffer[3];
	this.buffer[4] = inBuffer[4];
	this.buffer[5] = inBuffer[5];

	//Column 2
	this.buffer[6] = inBuffer[6];
	this.buffer[7] = inBuffer[7];
	this.buffer[8] = inBuffer[8];

	return this;
};

neo3d.Mat3.prototype.getRSTransfo3D = function(rotQuat, scaleV3)
{
	neo3d.Mat3.bufferGetRSTransfo3D(rotQuat.buffer, 0, scaleV3.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.normalizeRSTransfo3D = function(m3)
{
	neo3d.Mat3.bufferNormalizeRSTransfo3D(this.buffer, 0, m3.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.normalizeRSTransfo3DInPlace = function()
{
	neo3d.Mat3.bufferNormalizeRSTransfo3D(this.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.getTRSTransfo2D = function(transV2, scaleV2)
{
	return neo3d.Mat3.bufferGetTRSTransfo2D(transV2.buffer, 0, scaleV2.buffer, 0, this.buffer, 0);
};

neo3d.Mat3.prototype.normalizeTRSTransfo2D = function(m3)
{
	neo3d.Mat3.bufferNormalizeTRSTransfo2D(this.buffer, 0, m3.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.normalizeTRSTransfo2DInPlace = function()
{
	neo3d.Mat3.bufferNormalizeTRSTransfo2D(this.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.isIdentity = function()
{
	return neo3d.Mat3.bufferIsIdentity(this.buffer, 0);
};

neo3d.Mat3.prototype.equals = function(m3)
{
	return neo3d.Mat3.bufferEquals(this.buffer, 0, m3.buffer, 0);
};

neo3d.Mat3.prototype.multiply = function(m3A, m3B)
{
	neo3d.Mat3.bufferMultiply(this.buffer, 0, m3A.buffer, 0, m3B.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.multiplyInPlace = function(m3)
{
	neo3d.Mat3.bufferMultiply(this.buffer, 0, this.buffer, 0, m3.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.invert = function(m3)
{
	neo3d.Mat3.bufferInvert(this.buffer, 0, m3.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.invertInPlace = function()
{
	neo3d.Mat3.bufferInvert(this.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.transpose = function(m3)
{
	neo3d.Mat3.bufferTranspose(this.buffer, 0, m3.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.transposeInPlace = function()
{
	neo3d.Mat3.bufferTranspose(this.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.transformVec3 = function(outV3, inV3)
{
	neo3d.Mat3.bufferTransformVec3(outV3.buffer, 0, this.buffer, 0, inV3.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.transformVec3InPlace = function(v3)
{
	neo3d.Mat3.bufferTransformVec3(v3.buffer, 0, this.buffer, 0, v3.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.transformVec2Pos = function(outV2, inV2)
{
	neo3d.Mat3.bufferTransformVec2Pos(outV2.buffer, 0, this.buffer, 0, inV2.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.transformVec2PosInPlace = function(v2)
{
	neo3d.Mat3.bufferTransformVec2Pos(v2.buffer, 0, this.buffer, 0, v2.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.transformVec2Dir = function(outV2, inV2)
{
	neo3d.Mat3.bufferTransformVec2Dir(outV2.buffer, 0, this.buffer, 0, inV2.buffer, 0);
	return this;
};

neo3d.Mat3.prototype.transformVec2DirInPlace = function(v2)
{
	neo3d.Mat3.bufferTransformVec2Dir(v2.buffer, 0, this.buffer, 0, v2.buffer, 0);
	return this;
};

//MUST be considered as constants
neo3d.Mat3.NB_COMPONENTS = 9;
neo3d.Mat3.IDENTITY = new neo3d.Mat3();

neo3d.Mat3.createBuffer = function(nbElems)
{
	nbElems *= 9;

	//Always initialized to 0
	var buffer = new Float32Array(nbElems);

	for (var i = 0; i < nbElems; i += 9)
		buffer[i] = buffer[i + 4] = buffer[i + 8] = 1.0;

	return buffer;
};

neo3d.Mat3.bufferSetFromQuat = function(outBuffer, outOffset, inQBuffer, inQOffset)
{
	//q quaternion must be a unit quaternion
	var x = inQBuffer[inQOffset],
		y = inQBuffer[inQOffset + 1],
		z = inQBuffer[inQOffset + 2],
		w = inQBuffer[inQOffset + 3],
		x2 = x + x, x2x = x2 * x, x2y = x2 * y, x2z = x2 * z, x2w = x2 * w,
		y2 = y + y, y2y = y2 * y, y2z = y2 * z, y2w = y2 * w,
		z2 = z + z, z2z = z2 * z, z2w = z2 * w;

	outBuffer[outOffset] = 1.0 - y2y - z2z;
	outBuffer[outOffset + 1] = z2w + x2y;
	outBuffer[outOffset + 2] = x2z - y2w;

	outBuffer[outOffset + 3] = x2y - z2w;
	outBuffer[outOffset + 4] = 1.0 - x2x - z2z;
	outBuffer[outOffset + 5] = x2w + y2z;

	outBuffer[outOffset + 6] = y2w + x2z;
	outBuffer[outOffset + 7] = y2z - x2w;
	outBuffer[outOffset + 8] = 1.0 - x2x - y2y;

	return outBuffer;
};

neo3d.Mat3.bufferSetFromMat4RotScale = function(outBuffer, outOffset, inMat4Buffer, inMat4Offset)
{
	outBuffer[outOffset] = inMat4Buffer[inMat4Offset];
	outBuffer[outOffset + 1] = inMat4Buffer[inMat4Offset + 1];
	outBuffer[outOffset + 2] = inMat4Buffer[inMat4Offset + 2];

	outBuffer[outOffset + 3] = inMat4Buffer[inMat4Offset + 4];
	outBuffer[outOffset + 4] = inMat4Buffer[inMat4Offset + 5];
	outBuffer[outOffset + 5] = inMat4Buffer[inMat4Offset + 6];

	outBuffer[outOffset + 6] = inMat4Buffer[inMat4Offset + 8];
	outBuffer[outOffset + 7] = inMat4Buffer[inMat4Offset + 9];
	outBuffer[outOffset + 8] = inMat4Buffer[inMat4Offset + 10];

	return outBuffer;
};

neo3d.Mat3.bufferSetFromRSTransfo3D = function(outBuffer, outOffset, inRotQuatBuffer, inRotQuatOffset, inScaleVec3Buffer, inScaleVec3Offset)
{
	//rotQuat quaternion must be a unit quaternion
	var x = inRotQuatBuffer[inRotQuatOffset],
		y = inRotQuatBuffer[inRotQuatOffset + 1],
		z = inRotQuatBuffer[inRotQuatOffset + 2],
		w = inRotQuatBuffer[inRotQuatOffset + 3],
		x2 = x + x, x2x = x2 * x, x2y = x2 * y, x2z = x2 * z, x2w = x2 * w,
		y2 = y + y, y2y = y2 * y, y2z = y2 * z, y2w = y2 * w,
		z2 = z + z, z2z = z2 * z, z2w = z2 * w,
		sx = inScaleVec3Buffer[inScaleVec3Offset],
		sy = inScaleVec3Buffer[inScaleVec3Offset + 1],
		sz = inScaleVec3Buffer[inScaleVec3Offset + 2];

	outBuffer[outOffset] = (1.0 - y2y - z2z) * sx;
	outBuffer[outOffset + 1] = (z2w + x2y) * sx;
	outBuffer[outOffset + 2] = (x2z - y2w) * sx;

	outBuffer[outOffset + 3] = (x2y - z2w) * sy;
	outBuffer[outOffset + 4] = (1.0 - x2x - z2z) * sy;
	outBuffer[outOffset + 5] = (x2w + y2z) * sy;

	outBuffer[outOffset + 6] = (y2w + x2z) * sz;
	outBuffer[outOffset + 7] = (y2z - x2w) * sz;
	outBuffer[outOffset + 8] = (1.0 - x2x - y2y) * sz;

	return outBuffer;
};

neo3d.Mat3.bufferSetRotation2D = function(outBuffer, outOffset, angle)
{
	var cosa = neo3d.cos(angle),
		sina = neo3d.sin(angle);

	outBuffer[outOffset] = cosa;
	outBuffer[outOffset + 1] = sina;
	outBuffer[outOffset + 2] = 0.0;

	outBuffer[outOffset + 3] = -sina;
	outBuffer[outOffset + 4] = cosa;
	outBuffer[outOffset + 5] = 0.0;

	return outBuffer;
};

neo3d.Mat3.bufferSetRotScale2DFromMat2 = function(outBuffer, outOffset, inMat2Buffer, inMat2Offset)
{
	outBuffer[outOffset] = inMat2Buffer[inMat2Offset];
	outBuffer[outOffset + 1] = inMat2Buffer[inMat2Offset + 1];
	outBuffer[outOffset + 2] = 0.0;

	outBuffer[outOffset + 3] = inMat2Buffer[inMat2Offset + 2];
	outBuffer[outOffset + 4] = inMat2Buffer[inMat2Offset + 3];
	outBuffer[outOffset + 5] = 0.0;

	return outBuffer;
};

neo3d.Mat3.bufferSetFromTRSTransfo2D = function(outBuffer, outOffset, inTransVec2Buffer, inTransVec2Offset, rotAngle, inScaleVec2Buffer, inScaleVec2Offset)
{
	var cosa = neo3d.cos(rotAngle),
		sina = neo3d.sin(rotAngle),
		sx = inScaleVec2Buffer[inScaleVec2Offset],
		sy = inScaleVec2Buffer[inScaleVec2Offset + 1];

	outBuffer[outOffset] = cosa * sx;
	outBuffer[outOffset + 1] = sina * sx;
	outBuffer[outOffset + 2] = 0.0;

	outBuffer[outOffset + 3] = -sina * sy;
	outBuffer[outOffset + 4] = cosa * sy;
	outBuffer[outOffset + 5] = 0.0;

	outBuffer[outOffset + 6] = inTransVec2Buffer[inTransVec2Offset];
	outBuffer[outOffset + 7] = inTransVec2Buffer[inTransVec2Offset + 1];
	outBuffer[outOffset + 8] = 1.0;

	return outBuffer;
};

(function()
{
	//It is safe to use a "statically" shared temporary buffer for
	//_orthoNormalizeTransfo because web workers never share their global
	//contexts, so _sharedTmpBuffer will never be accessed from different
	//threads
	var _sharedTmpBuffer = new Float32Array(12);

	neo3d.Mat3._orthoNormalizeTransfo = function(inMatBuffer, inMatOffset, vecSize)
	{
		//RSTransfo 3x3 matrix is normalized using the stabilized Gram–Schmidt
		//orthonormalization algorithm

		//Normalize v0
		var x0 = inMatBuffer[inMatOffset],
			y0 = inMatBuffer[inMatOffset + 1],
			z0 = inMatBuffer[inMatOffset + 2],
			n = x0 * x0 + y0 * y0 + z0 * z0;

		if (n < neo3d.EPSILON2)
			_sharedTmpBuffer[9] = x0 = y0 = z0 = 0.0;
		else
		{
			_sharedTmpBuffer[9] = n = neo3d.sqrt(n);
			n = 1.0 / n;
			x0 *= n;
			y0 *= n;
			z0 *= n;
		}

		//Remove v1/v0 skew
		inMatOffset += vecSize;
		var x1 = inMatBuffer[inMatOffset],
			y1 = inMatBuffer[inMatOffset + 1],
			z1 = inMatBuffer[inMatOffset + 2];

		n = x1 * x0 + y1 * y0 + z1 * z0;
		x1 -= n * x0;
		y1 -= n * y0;
		z1 -= n * z0;

		//Remove v2/v0 skew
		inMatOffset += vecSize;
		var x2 = inMatBuffer[inMatOffset],
			y2 = inMatBuffer[inMatOffset + 1],
			z2 = inMatBuffer[inMatOffset + 2];

		n = x2 * x0 + y2 * y0 + z2 * z0;
		x2 -= n * x0;
		y2 -= n * y0;
		z2 -= n * z0;

		//Normalize v1
		n = x1 * x1 + y1 * y1 + z1 * z1;
		if (n < neo3d.EPSILON2)
			_sharedTmpBuffer[10] = x1 = y1 = z1 = 0.0;
		else
		{
			_sharedTmpBuffer[10] = n = neo3d.sqrt(n);
			n = 1.0 / n;
			x1 *= n;
			y1 *= n;
			z1 *= n;
		}

		//Remove v2/v1 skew
		n = x2 * x1 + y2 * y1 + z2 * z1;
		x2 -= n * x1;
		y2 -= n * y1;
		z2 -= n * z1;

		//Normalize v2
		n = x2 * x2 + y2 * y2 + z2 * z2;
		if (n < neo3d.EPSILON2)
			_sharedTmpBuffer[11] = x2 = y2 = z2 = 0.0;
		else
		{
			_sharedTmpBuffer[11] = n = neo3d.sqrt(n);
			n = 1.0 / n;
			x2 *= n;
			y2 *= n;
			z2 *= n;
		}

		_sharedTmpBuffer[0] = x0;
		_sharedTmpBuffer[1] = y0;
		_sharedTmpBuffer[2] = z0;

		_sharedTmpBuffer[3] = x1;
		_sharedTmpBuffer[4] = y1;
		_sharedTmpBuffer[5] = z1;

		_sharedTmpBuffer[6] = x2;
		_sharedTmpBuffer[7] = y2;
		_sharedTmpBuffer[8] = z2;

		return _sharedTmpBuffer;
	};
})();

neo3d.Mat3.bufferGetRSTransfo3D = function(outRotQuatBuffer, outRotQuatOffset, outScaleVec3Buffer, outScaleVec3Offset, inMat3Buffer, inMat3Offset)
{
	var buffer = neo3d.Mat3._orthoNormalizeTransfo(inMat3Buffer, inMat3Offset, 3);

	outScaleVec3Buffer[outScaleVec3Offset] = buffer[9];
	outScaleVec3Buffer[outScaleVec3Offset + 1] = buffer[10];
	outScaleVec3Buffer[outScaleVec3Offset + 2] = buffer[11];

	neo3d.Quat.bufferSetFromRotationMat3(outRotQuatBuffer, outRotQuatOffset, buffer, 0);

	return inMat3Buffer;
};

neo3d.Mat3.bufferNormalizeRSTransfo3D = function(outBuffer, outOffset, inBuffer, inOffset)
{
	var buffer = neo3d.Mat3._orthoNormalizeTransfo(inBuffer, inOffset, 3),
		sx = buffer[9],
		sy = buffer[10],
		sz = buffer[11];

	outBuffer[outOffset] = buffer[0] * sx;
	outBuffer[outOffset + 1] = buffer[1] * sx;
	outBuffer[outOffset + 2] = buffer[2] * sx;

	outBuffer[outOffset + 3] = buffer[3] * sy;
	outBuffer[outOffset + 4] = buffer[4] * sy;
	outBuffer[outOffset + 5] = buffer[5] * sy;

	outBuffer[outOffset + 6] = buffer[6] * sz;
	outBuffer[outOffset + 7] = buffer[7] * sz;
	outBuffer[outOffset + 8] = buffer[8] * sz;

	return outBuffer;
};

neo3d.Mat3.bufferGetTRSTransfo2D = function(outTransVec2Buffer, outTransVec2Offset, outScaleVec2Buffer, outScaleVec2Offset, inMat3Buffer, inMat3Offset)
{
	var buffer = neo3d.Mat2._orthoNormalizeTransfo(inMat3Buffer, inMat3Offset, 3);

	outScaleVec2Buffer[outScaleVec2Offset] = buffer[4];
	outScaleVec2Buffer[outScaleVec2Offset + 1] = buffer[5];

	outTransVec2Buffer[outTransVec2Offset] = inMat3Buffer[inMat3Offset + 6];
	outTransVec2Buffer[outTransVec2Offset + 1] = inMat3Buffer[inMat3Offset + 7];

	return neo3d.atan2(buffer[1], buffer[0]);
};

neo3d.Mat3.bufferNormalizeTRSTransfo2D = function(outBuffer, outOffset, inBuffer, inOffset)
{
	var buffer = neo3d.Mat2._orthoNormalizeTransfo(inBuffer, inOffset, 3),
		sx = buffer[4],
		sy = buffer[5];

	outBuffer[outOffset] = buffer[0] * sx;
	outBuffer[outOffset + 1] = buffer[1] * sx;
	outBuffer[outOffset + 2] = 0.0;

	outBuffer[outOffset + 3] = buffer[2] * sy;
	outBuffer[outOffset + 4] = buffer[3] * sy;
	outBuffer[outOffset + 5] = 0.0;

	outBuffer[outOffset + 8] = 1.0;

	return outBuffer;
};

neo3d.Mat3.bufferIsIdentity = function(inBuffer, inOffset)
{
	if ((neo3d.abs(inBuffer[inOffset] - 1.0) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 1]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 2]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 3]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 4] - 1.0) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 5]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 6]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 7]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 8] - 1.0) < neo3d.EPSILON))
		return true;
	else
		return false;
};

neo3d.Mat3.bufferEquals = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
	if (((inBufferA === inBufferB) && (inOffsetA === inOffsetB)) ||
		((neo3d.abs(inBufferB[inOffsetB] - inBufferA[inOffsetA]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 1] - inBufferA[inOffsetA + 1]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 2] - inBufferA[inOffsetA + 2]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 3] - inBufferA[inOffsetA + 3]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 4] - inBufferA[inOffsetA + 4]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 5] - inBufferA[inOffsetA + 5]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 6] - inBufferA[inOffsetA + 6]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 7] - inBufferA[inOffsetA + 7]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 8] - inBufferA[inOffsetA + 8]) < neo3d.EPSILON)))
		return true;
	else
		return false;
};

neo3d.Mat3.bufferMultiply = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
	//    | m00 m10 m20 |
	//M = | m01 m11 m21 |
	//    | m02 m12 m22 |
	var m00 = inBufferA[inOffsetA],
		m01 = inBufferA[inOffsetA + 1],
		m02 = inBufferA[inOffsetA + 2],
		m10 = inBufferA[inOffsetA + 3],
		m11 = inBufferA[inOffsetA + 4],
		m12 = inBufferA[inOffsetA + 5],
		m20 = inBufferA[inOffsetA + 6],
		m21 = inBufferA[inOffsetA + 7],
		m22 = inBufferA[inOffsetA + 8],
		x = inBufferB[inOffsetB],
		y = inBufferB[inOffsetB + 1],
		z = inBufferB[inOffsetB + 2];

	outBuffer[outOffset] = x * m00 + y * m10 + z * m20;
	outBuffer[outOffset + 1] = x * m01 + y * m11 + z * m21;
	outBuffer[outOffset + 2] = x * m02 + y * m12 + z * m22;

	x = inBufferB[inOffsetB + 3];
	y = inBufferB[inOffsetB + 4];
	z = inBufferB[inOffsetB + 5];
	outBuffer[outOffset + 3] = x * m00 + y * m10 + z * m20;
	outBuffer[outOffset + 4] = x * m01 + y * m11 + z * m21;
	outBuffer[outOffset + 5] = x * m02 + y * m12 + z * m22;

	x = inBufferB[inOffsetB + 6];
	y = inBufferB[inOffsetB + 7];
	z = inBufferB[inOffsetB + 8];
	outBuffer[outOffset + 6] = x * m00 + y * m10 + z * m20;
	outBuffer[outOffset + 7] = x * m01 + y * m11 + z * m21;
	outBuffer[outOffset + 8] = x * m02 + y * m12 + z * m22;

	return outBuffer;
};

neo3d.Mat3.bufferInvert = function(outBuffer, outOffset, inBuffer, inOffset)
{
	//    | m00 m10 m20 |
	//M = | m01 m11 m21 |
	//    | m02 m12 m22 |
	var m00 = inBuffer[inOffset],
		m01 = inBuffer[inOffset + 1],
		m02 = inBuffer[inOffset + 2],
		m10 = inBuffer[inOffset + 3],
		m11 = inBuffer[inOffset + 4],
		m12 = inBuffer[inOffset + 5],
		m20 = inBuffer[inOffset + 6],
		m21 = inBuffer[inOffset + 7],
		m22 = inBuffer[inOffset + 8],
		c00 = m11 * m22 - m21 * m12,
		c01 = m20 * m12 - m10 * m22,
		c02 = m10 * m21 - m20 * m11,
		det = m00 * c00 + m01 * c01 + m02 * c02;

	if (neo3d.abs(det) < neo3d.EPSILON)
	{
		outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] =
		outBuffer[outOffset + 3] = outBuffer[outOffset + 4] = outBuffer[outOffset + 5] =
		outBuffer[outOffset + 6] = outBuffer[outOffset + 7] = outBuffer[outOffset + 8] =
		(det >= 0.0) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

		return outBuffer;
	}

	det = 1.0 / det;
	outBuffer[outOffset] = c00 * det;
	outBuffer[outOffset + 1] = (m21 * m02 - m01 * m22) * det;
	outBuffer[outOffset + 2] = (m01 * m12 - m11 * m02) * det;
	outBuffer[outOffset + 3] = c01 * det;
	outBuffer[outOffset + 4] = (m00 * m22 - m20 * m02) * det;
	outBuffer[outOffset + 5] = (m10 * m02 - m00 * m12) * det;
	outBuffer[outOffset + 6] = c02 * det;
	outBuffer[outOffset + 7] = (m20 * m01 - m00 * m21) * det;
	outBuffer[outOffset + 8] = (m00 * m11 - m10 * m01) * det;

	return outBuffer;
};

neo3d.Mat3.bufferTranspose = function(outBuffer, outOffset, inBuffer, inOffset)
{
	//    | m00 m10 m20 |
	//M = | m01 m11 m21 |
	//    | m02 m12 m22 |
	var m01 = inBuffer[inOffset + 1],
		m02 = inBuffer[inOffset + 2],
		m12 = inBuffer[inOffset + 5];

	outBuffer[outOffset] = inBuffer[inOffset];
	outBuffer[outOffset + 1] = inBuffer[inOffset + 3];
	outBuffer[outOffset + 2] = inBuffer[inOffset + 6];
	outBuffer[outOffset + 3] = m01;
	outBuffer[outOffset + 4] = inBuffer[inOffset + 4];
	outBuffer[outOffset + 5] = inBuffer[inOffset + 7];
	outBuffer[outOffset + 6] = m02;
	outBuffer[outOffset + 7] = m12;
	outBuffer[outOffset + 8] = inBuffer[inOffset + 8];

	return outBuffer;
};

neo3d.Mat3.bufferTransformVec3 = function(outV3Buffer, outV3Offset, inM3Buffer, inM3Offset, inV3Buffer, inV3Offset)
{
	var x = inV3Buffer[inV3Offset],
		y = inV3Buffer[inV3Offset + 1],
		z = inV3Buffer[inV3Offset + 2];

	outV3Buffer[outV3Offset] = x * inM3Buffer[inM3Offset] + y * inM3Buffer[inM3Offset + 3] + z * inM3Buffer[inM3Offset + 6];
	outV3Buffer[outV3Offset + 1] = x * inM3Buffer[inM3Offset + 1] + y * inM3Buffer[inM3Offset + 4] + z * inM3Buffer[inM3Offset + 7];
	outV3Buffer[outV3Offset + 2] = x * inM3Buffer[inM3Offset + 2] + y * inM3Buffer[inM3Offset + 5] + z * inM3Buffer[inM3Offset + 8];

	return inM3Buffer;
};

neo3d.Mat3.bufferTransformVec2Pos = function(outV2Buffer, outV2Offset, inM3Buffer, inM3Offset, inV2Buffer, inV2Offset)
{
	var x = inV2Buffer[inV2Offset],
		y = inV2Buffer[inV2Offset + 1];

	outV2Buffer[outV2Offset] = x * inM3Buffer[inM3Offset] + y * inM3Buffer[inM3Offset + 3] + inM3Buffer[inM3Offset + 6];
	outV2Buffer[outV2Offset + 1] = x * inM3Buffer[inM3Offset + 1] + y * inM3Buffer[inM3Offset + 4] + inM3Buffer[inM3Offset + 7];

	return inM3Buffer;
};

neo3d.Mat3.bufferTransformVec2Dir = function(outV2Buffer, outV2Offset, inM3Buffer, inM3Offset, inV2Buffer, inV2Offset)
{
	var x = inV2Buffer[inV2Offset],
		y = inV2Buffer[inV2Offset + 1];

	outV2Buffer[outV2Offset] = x * inM3Buffer[inM3Offset] + y * inM3Buffer[inM3Offset + 3];
	outV2Buffer[outV2Offset + 1] = x * inM3Buffer[inM3Offset + 1] + y * inM3Buffer[inM3Offset + 4];

	return inM3Buffer;
};
