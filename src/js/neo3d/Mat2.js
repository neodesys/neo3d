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
 * @requires neomath.js
 */
neo3d.Mat2 = function()
{
	//Always initialized to 0
	this.buffer = new Float32Array(4);
	this.buffer[0] = this.buffer[3] = 1.0;
};

neo3d.Mat2.prototype.setFromArray = function(arr)
{
	//Column 0
	this.buffer[0] = arr[0];
	this.buffer[1] = arr[1];

	//Column 1
	this.buffer[2] = arr[2];
	this.buffer[3] = arr[3];

	return this;
};

neo3d.Mat2.prototype.setColumnVec2 = function(col, v2)
{
	var i = col * 2,
		inBuffer = v2.buffer;

	this.buffer[i] = inBuffer[0];
	this.buffer[i + 1] = inBuffer[1];

	return this;
};

neo3d.Mat2.prototype.setFromColumnsVec2 = function(v2i, v2j)
{
	var inBuffer = v2i.buffer;
	this.buffer[0] = inBuffer[0];
	this.buffer[1] = inBuffer[1];

	inBuffer = v2j.buffer;
	this.buffer[2] = inBuffer[0];
	this.buffer[3] = inBuffer[1];

	return this;
};

neo3d.Mat2.prototype.setFromRotAngle = function(angle)
{
	neo3d.Mat2.bufferSetFromRotAngle(this.buffer, 0, angle);
	return this;
};

neo3d.Mat2.prototype.setFromMat3RotScale = function(m3)
{
	neo3d.Mat2.bufferSetFromMat3RotScale(this.buffer, 0, m3.buffer, 0);
	return this;
};

neo3d.Mat2.prototype.setFromRSTransfo = function(rotAngle, scaleV2)
{
	neo3d.Mat2.bufferSetFromRSTransfo(this.buffer, 0, rotAngle, scaleV2.buffer, 0);
	return this;
};

neo3d.Mat2.prototype.setIdentity = function()
{
	this.buffer[0] = this.buffer[3] = 1.0;
	this.buffer[1] = this.buffer[2] = 0.0;

	return this;
};

neo3d.Mat2.prototype.copy = function(m2)
{
	var inBuffer = m2.buffer;

	//Column 0
	this.buffer[0] = inBuffer[0];
	this.buffer[1] = inBuffer[1];

	//Column 1
	this.buffer[2] = inBuffer[2];
	this.buffer[3] = inBuffer[3];

	return this;
};

neo3d.Mat2.prototype.getRSTransfo = function(scaleV2)
{
	return neo3d.Mat2.bufferGetRSTransfo(scaleV2.buffer, 0, this.buffer, 0);
};

neo3d.Mat2.prototype.normalizeRSTransfo = function(m2)
{
	neo3d.Mat2.bufferNormalizeRSTransfo(this.buffer, 0, m2.buffer, 0);
	return this;
};

neo3d.Mat2.prototype.normalizeRSTransfoInPlace = function()
{
	neo3d.Mat2.bufferNormalizeRSTransfo(this.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Mat2.prototype.isIdentity = function()
{
	return neo3d.Mat2.bufferIsIdentity(this.buffer, 0);
};

neo3d.Mat2.prototype.equals = function(m2)
{
	return neo3d.Mat2.bufferEquals(this.buffer, 0, m2.buffer, 0);
};

neo3d.Mat2.prototype.multiply = function(m2A, m2B)
{
	neo3d.Mat2.bufferMultiply(this.buffer, 0, m2A.buffer, 0, m2B.buffer, 0);
	return this;
};

neo3d.Mat2.prototype.multiplyInPlace = function(m2)
{
	neo3d.Mat2.bufferMultiply(this.buffer, 0, this.buffer, 0, m2.buffer, 0);
	return this;
};

neo3d.Mat2.prototype.invert = function(m2)
{
	neo3d.Mat2.bufferInvert(this.buffer, 0, m2.buffer, 0);
	return this;
};

neo3d.Mat2.prototype.invertInPlace = function()
{
	neo3d.Mat2.bufferInvert(this.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Mat2.prototype.transpose = function(m2)
{
	neo3d.Mat2.bufferTranspose(this.buffer, 0, m2.buffer, 0);
	return this;
};

neo3d.Mat2.prototype.transposeInPlace = function()
{
	neo3d.Mat2.bufferTranspose(this.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Mat2.prototype.transformVec2 = function(outV2, inV2)
{
	neo3d.Mat2.bufferTransformVec2(outV2.buffer, 0, this.buffer, 0, inV2.buffer, 0);
	return outV2;
};

neo3d.Mat2.prototype.transformVec2InPlace = function(v2)
{
	neo3d.Mat2.bufferTransformVec2(v2.buffer, 0, this.buffer, 0, v2.buffer, 0);
	return v2;
};

//MUST be considered as constants
neo3d.Mat2.NB_COMPONENTS = 4;
neo3d.Mat2.IDENTITY = new neo3d.Mat2();

neo3d.Mat2.createBuffer = function(nbElems)
{
	nbElems *= 4;

	//Always initialized to 0
	var buffer = new Float32Array(nbElems);

	for (var i = 0; i < nbElems; i += 4)
		buffer[i] = buffer[i + 3] = 1.0;

	return buffer;
};

neo3d.Mat2.bufferSetFromRotAngle = function(outBuffer, outOffset, angle)
{
	var cosa = neo3d.cos(angle),
		sina = neo3d.sin(angle);

	outBuffer[outOffset] = cosa;
	outBuffer[outOffset + 1] = sina;

	outBuffer[outOffset + 2] = -sina;
	outBuffer[outOffset + 3] = cosa;

	return outBuffer;
};

neo3d.Mat2.bufferSetFromMat3RotScale = function(outBuffer, outOffset, inMat3Buffer, inMat3Offset)
{
	outBuffer[outOffset] = inMat3Buffer[inMat3Offset];
	outBuffer[outOffset + 1] = inMat3Buffer[inMat3Offset + 1];

	outBuffer[outOffset + 2] = inMat3Buffer[inMat3Offset + 3];
	outBuffer[outOffset + 3] = inMat3Buffer[inMat3Offset + 4];

	return outBuffer;
};

neo3d.Mat2.bufferSetFromRSTransfo = function(outBuffer, outOffset, rotAngle, inScaleVec2Buffer, inScaleVec2Offset)
{
	var cosa = neo3d.cos(rotAngle),
		sina = neo3d.sin(rotAngle),
		sx = inScaleVec2Buffer[inScaleVec2Offset],
		sy = inScaleVec2Buffer[inScaleVec2Offset + 1];

	outBuffer[outOffset] = cosa * sx;
	outBuffer[outOffset + 1] = sina * sx;

	outBuffer[outOffset + 2] = -sina * sy;
	outBuffer[outOffset + 3] = cosa * sy;

	return outBuffer;
};

(function()
{
	//It is safe to use a "statically" shared temporary buffer for
	//_orthoNormalizeTransfo because web workers never share their global
	//contexts, so _sharedTmpBuffer will never be accessed from different
	//threads
	var _sharedTmpBuffer = new Float32Array(6);

	neo3d.Mat2._orthoNormalizeTransfo = function(inMatBuffer, inMatOffset, vecSize)
	{
		//RSTransfo 2x2 matrix is normalized using the stabilized Gram–Schmidt
		//orthonormalization algorithm

		//Normalize v0
		var x0 = inMatBuffer[inMatOffset],
			y0 = inMatBuffer[inMatOffset + 1],
			n = x0 * x0 + y0 * y0;

		if (n < neo3d.EPSILON2)
			_sharedTmpBuffer[4] = x0 = y0 = 0.0;
		else
		{
			_sharedTmpBuffer[4] = n = neo3d.sqrt(n);
			n = 1.0 / n;
			x0 *= n;
			y0 *= n;
		}

		//Remove v1/v0 skew
		inMatOffset += vecSize;
		var x1 = inMatBuffer[inMatOffset],
			y1 = inMatBuffer[inMatOffset + 1];

		n = x1 * x0 + y1 * y0;
		x1 -= n * x0;
		y1 -= n * y0;

		//Normalize v1
		n = x1 * x1 + y1 * y1;
		if (n < neo3d.EPSILON2)
			_sharedTmpBuffer[5] = x1 = y1 = 0.0;
		else
		{
			_sharedTmpBuffer[5] = n = neo3d.sqrt(n);
			n = 1.0 / n;
			x1 *= n;
			y1 *= n;
		}

		_sharedTmpBuffer[0] = x0;
		_sharedTmpBuffer[1] = y0;

		_sharedTmpBuffer[2] = x1;
		_sharedTmpBuffer[3] = y1;

		return _sharedTmpBuffer;
	};
})();

neo3d.Mat2.bufferGetRSTransfo = function(outScaleVec2Buffer, outScaleVec2Offset, inMat2Buffer, inMat2Offset)
{
	var buffer = neo3d.Mat2._orthoNormalizeTransfo(inMat2Buffer, inMat2Offset, 2);

	outScaleVec2Buffer[outScaleVec2Offset] = buffer[4];
	outScaleVec2Buffer[outScaleVec2Offset + 1] = buffer[5];

	return neo3d.atan2(buffer[1], buffer[0]);
};

neo3d.Mat2.bufferNormalizeRSTransfo = function(outBuffer, outOffset, inBuffer, inOffset)
{
	var buffer = neo3d.Mat2._orthoNormalizeTransfo(inBuffer, inOffset, 2),
		sx = buffer[4],
		sy = buffer[5];

	outBuffer[outOffset] = buffer[0] * sx;
	outBuffer[outOffset + 1] = buffer[1] * sx;

	outBuffer[outOffset + 2] = buffer[2] * sy;
	outBuffer[outOffset + 3] = buffer[3] * sy;

	return outBuffer;
};

neo3d.Mat2.bufferIsIdentity = function(inBuffer, inOffset)
{
	if ((neo3d.abs(inBuffer[inOffset] - 1.0) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 1]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 2]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 3] - 1.0) < neo3d.EPSILON))
		return true;
	else
		return false;
};

neo3d.Mat2.bufferEquals = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
	if (((inBufferA === inBufferB) && (inOffsetA === inOffsetB)) ||
		((neo3d.abs(inBufferB[inOffsetB] - inBufferA[inOffsetA]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 1] - inBufferA[inOffsetA + 1]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 2] - inBufferA[inOffsetA + 2]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 3] - inBufferA[inOffsetA + 3]) < neo3d.EPSILON)))
		return true;
	else
		return false;
};

neo3d.Mat2.bufferMultiply = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
	//M = | m00 m10 |
	//    | m01 m11 |
	var m00 = inBufferA[inOffsetA],
		m01 = inBufferA[inOffsetA + 1],
		m10 = inBufferA[inOffsetA + 2],
		m11 = inBufferA[inOffsetA + 3],
		x = inBufferB[inOffsetB],
		y = inBufferB[inOffsetB + 1];

	outBuffer[outOffset] = x * m00 + y * m10;
	outBuffer[outOffset + 1] = x * m01 + y * m11;

	x = inBufferB[inOffsetB + 2];
	y = inBufferB[inOffsetB + 3];
	outBuffer[outOffset + 2] = x * m00 + y * m10;
	outBuffer[outOffset + 3] = x * m01 + y * m11;

	return outBuffer;
};

neo3d.Mat2.bufferInvert = function(outBuffer, outOffset, inBuffer, inOffset)
{
	//M = | m00 m10 |
	//    | m01 m11 |
	var m00 = inBuffer[inOffset],
		m01 = inBuffer[inOffset + 1],
		m10 = inBuffer[inOffset + 2],
		m11 = inBuffer[inOffset + 3],
		det = m00 * m11 - m10 * m01;

	if (neo3d.abs(det) < neo3d.EPSILON)
	{
		outBuffer[outOffset] = outBuffer[outOffset + 1] =
		outBuffer[outOffset + 2] = outBuffer[outOffset + 3] =
		(det >= 0.0) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

		return outBuffer;
	}

	det = 1.0 / det;
	outBuffer[outOffset] = m11 * det;
	outBuffer[outOffset + 1] = -m01 * det;
	outBuffer[outOffset + 2] = -m10 * det;
	outBuffer[outOffset + 3] = m00 * det;

	return outBuffer;
};

neo3d.Mat2.bufferTranspose = function(outBuffer, outOffset, inBuffer, inOffset)
{
	//M = | m00 m10 |
	//    | m01 m11 |
	var m01 = inBuffer[inOffset + 1];

	outBuffer[outOffset] = inBuffer[inOffset];
	outBuffer[outOffset + 1] = inBuffer[inOffset + 2];
	outBuffer[outOffset + 2] = m01;
	outBuffer[outOffset + 3] = inBuffer[inOffset + 3];

	return outBuffer;
};

neo3d.Mat2.bufferTransformVec2 = function(outV2Buffer, outV2Offset, inM2Buffer, inM2Offset, inV2Buffer, inV2Offset)
{
	var x = inV2Buffer[inV2Offset],
		y = inV2Buffer[inV2Offset + 1];

	outV2Buffer[outV2Offset] = x * inM2Buffer[inM2Offset] + y * inM2Buffer[inM2Offset + 2];
	outV2Buffer[outV2Offset + 1] = x * inM2Buffer[inM2Offset + 1] + y * inM2Buffer[inM2Offset + 3];

	return outV2Buffer;
};
