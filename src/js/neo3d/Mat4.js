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
neo3d.Mat4 = function()
{
	//Always initialized to 0
	this.buffer = new Float32Array(16);
	this.buffer[0] = this.buffer[5] = this.buffer[10] = this.buffer[15] = 1.0;
};

neo3d.Mat4.prototype.setFromArray = function(arr)
{
	//Column 0
	this.buffer[0] = arr[0];
	this.buffer[1] = arr[1];
	this.buffer[2] = arr[2];
	this.buffer[3] = arr[3];

	//Column 1
	this.buffer[4] = arr[4];
	this.buffer[5] = arr[5];
	this.buffer[6] = arr[6];
	this.buffer[7] = arr[7];

	//Column 2
	this.buffer[8] = arr[8];
	this.buffer[9] = arr[9];
	this.buffer[10] = arr[10];
	this.buffer[11] = arr[11];

	//Column 3
	this.buffer[12] = arr[12];
	this.buffer[13] = arr[13];
	this.buffer[14] = arr[14];
	this.buffer[15] = arr[15];

	return this;
};

neo3d.Mat4.prototype.setColumnVec4 = function(col, v4)
{
	var i = col * 4,
		inBuffer = v4.buffer;

	this.buffer[i] = inBuffer[0];
	this.buffer[i + 1] = inBuffer[1];
	this.buffer[i + 2] = inBuffer[2];
	this.buffer[i + 3] = inBuffer[3];

	return this;
};

neo3d.Mat4.prototype.setFromColumnsVec4 = function(v4i, v4j, v4k, v4l)
{
	var inBuffer = v4i.buffer;
	this.buffer[0] = inBuffer[0];
	this.buffer[1] = inBuffer[1];
	this.buffer[2] = inBuffer[2];
	this.buffer[3] = inBuffer[3];

	inBuffer = v4j.buffer;
	this.buffer[4] = inBuffer[0];
	this.buffer[5] = inBuffer[1];
	this.buffer[6] = inBuffer[2];
	this.buffer[7] = inBuffer[3];

	inBuffer = v4k.buffer;
	this.buffer[8] = inBuffer[0];
	this.buffer[9] = inBuffer[1];
	this.buffer[10] = inBuffer[2];
	this.buffer[11] = inBuffer[3];

	inBuffer = v4l.buffer;
	this.buffer[12] = inBuffer[0];
	this.buffer[13] = inBuffer[1];
	this.buffer[14] = inBuffer[2];
	this.buffer[15] = inBuffer[3];

	return this;
};

neo3d.Mat4.prototype.setColumnVec3 = function(col, v3)
{
	var i = col * 4,
		inBuffer = v3.buffer;

	this.buffer[i] = inBuffer[0];
	this.buffer[i + 1] = inBuffer[1];
	this.buffer[i + 2] = inBuffer[2];
	this.buffer[i + 3] = (col === 3) ? 1.0 : 0.0;

	return this;
};

neo3d.Mat4.prototype.setFromColumnsVec3 = function(v3i, v3j, v3k, v3l)
{
	var inBuffer = v3i.buffer;
	this.buffer[0] = inBuffer[0];
	this.buffer[1] = inBuffer[1];
	this.buffer[2] = inBuffer[2];
	this.buffer[3] = 0.0;

	inBuffer = v3j.buffer;
	this.buffer[4] = inBuffer[0];
	this.buffer[5] = inBuffer[1];
	this.buffer[6] = inBuffer[2];
	this.buffer[7] = 0.0;

	inBuffer = v3k.buffer;
	this.buffer[8] = inBuffer[0];
	this.buffer[9] = inBuffer[1];
	this.buffer[10] = inBuffer[2];
	this.buffer[11] = 0.0;

	inBuffer = v3l.buffer;
	this.buffer[12] = inBuffer[0];
	this.buffer[13] = inBuffer[1];
	this.buffer[14] = inBuffer[2];
	this.buffer[15] = 1.0;

	return this;
};

neo3d.Mat4.prototype.setRotationFromQuat = function(q)
{
	//q quaternion must be a unit quaternion
	neo3d.Mat4.bufferSetRotationFromQuat(this.buffer, 0, q.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.setRotScaleFromMat3 = function(m3)
{
	neo3d.Mat4.bufferSetRotScaleFromMat3(this.buffer, 0, m3.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.setFromTRSTransfo = function(transV3, rotQuat, scaleV3)
{
	//rotQuat quaternion must be a unit quaternion
	neo3d.Mat4.bufferSetFromTRSTransfo(this.buffer, 0, transV3.buffer, 0, rotQuat.buffer, 0, scaleV3.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.setIdentity = function()
{
	this.buffer[0] = this.buffer[5] = this.buffer[10] = this.buffer[15] = 1.0;
	this.buffer[1] = this.buffer[2] = this.buffer[3] = this.buffer[4] =
	this.buffer[6] = this.buffer[7] = this.buffer[8] = this.buffer[9] =
	this.buffer[11] = this.buffer[12] = this.buffer[13] = this.buffer[14] = 0.0;

	return this;
};

neo3d.Mat4.prototype.copy = function(m4)
{
	var inBuffer = m4.buffer;

	//Column 0
	this.buffer[0] = inBuffer[0];
	this.buffer[1] = inBuffer[1];
	this.buffer[2] = inBuffer[2];
	this.buffer[3] = inBuffer[3];

	//Column 1
	this.buffer[4] = inBuffer[4];
	this.buffer[5] = inBuffer[5];
	this.buffer[6] = inBuffer[6];
	this.buffer[7] = inBuffer[7];

	//Column 2
	this.buffer[8] = inBuffer[8];
	this.buffer[9] = inBuffer[9];
	this.buffer[10] = inBuffer[10];
	this.buffer[11] = inBuffer[11];

	//Column 3
	this.buffer[12] = inBuffer[12];
	this.buffer[13] = inBuffer[13];
	this.buffer[14] = inBuffer[14];
	this.buffer[15] = inBuffer[15];

	return this;
};

neo3d.Mat4.prototype.isIdentity = function()
{
	return neo3d.Mat4.bufferIsIdentity(this.buffer, 0);
};

neo3d.Mat4.prototype.equals = function(m4)
{
	return neo3d.Mat4.bufferEquals(this.buffer, 0, m4.buffer, 0);
};

neo3d.Mat4.prototype.multiply = function(m4A, m4B)
{
	neo3d.Mat4.bufferMultiply(this.buffer, 0, m4A.buffer, 0, m4B.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.multiplyInPlace = function(m4)
{
	neo3d.Mat4.bufferMultiply(this.buffer, 0, this.buffer, 0, m4.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.invert = function(m4)
{
	neo3d.Mat4.bufferInvert(this.buffer, 0, m4.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.invertInPlace = function()
{
	neo3d.Mat4.bufferInvert(this.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.transpose = function(m4)
{
	neo3d.Mat4.bufferTranspose(this.buffer, 0, m4.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.transposeInPlace = function()
{
	neo3d.Mat4.bufferTranspose(this.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.transformVec4 = function(outV4, inV4)
{
	neo3d.Mat4.bufferTransformVec4(outV4.buffer, 0, this.buffer, 0, inV4.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.transformVec4InPlace = function(v4)
{
	neo3d.Mat4.bufferTransformVec4(v4.buffer, 0, this.buffer, 0, v4.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.transformVec3Pos = function(outV3, inV3)
{
	neo3d.Mat4.bufferTransformVec3Pos(outV3.buffer, 0, this.buffer, 0, inV3.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.transformVec3PosInPlace = function(v3)
{
	neo3d.Mat4.bufferTransformVec3Pos(v3.buffer, 0, this.buffer, 0, v3.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.transformVec3Dir = function(outV3, inV3)
{
	neo3d.Mat4.bufferTransformVec3Dir(outV3.buffer, 0, this.buffer, 0, inV3.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.transformVec3DirInPlace = function(v3)
{
	neo3d.Mat4.bufferTransformVec3Dir(v3.buffer, 0, this.buffer, 0, v3.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.buildFrustumProj = function(left, right, bottom, top, near, far)
{
	//We must have:
	//left < right
	//bottom < top
	//0 < near < far (near and far are positive distances along -z direction)
	neo3d.Mat4.bufferBuildFrustumProj(this.buffer, 0, left, right, bottom, top, near, far);
	return this;
};

neo3d.Mat4.prototype.buildPerspectiveProj = function(fov, aspect, near, far)
{
	//We must have:
	//0 < fov < PI
	//0 < aspect (aspect = width / height of near projection plane)
	//0 < near < far (near and far are positive distances along -z direction)
	neo3d.Mat4.bufferBuildPerspectiveProj(this.buffer, 0, fov, aspect, near, far);
	return this;
};

neo3d.Mat4.prototype.buildOrthoProj = function(left, right, bottom, top, near, far)
{
	//We must have:
	//left < right
	//bottom < top
	//0 < near < far (near and far are positive distances along -z direction)
	neo3d.Mat4.bufferBuildOrthoProj(this.buffer, 0, left, right, bottom, top, near, far);
	return this;
};

neo3d.Mat4.prototype.buildLookAtView = function(eyeV3, targetV3, upV3)
{
	neo3d.Mat4.bufferBuildLookAtView(this.buffer, 0, eyeV3.buffer, 0, targetV3.buffer, 0, upV3.buffer, 0);
	return this;
};

neo3d.Mat4.prototype.buildFPSView = function(eyeV3, pitchAngle, yawAngle)
{
	//We must have:
	//- PI/2 <= pitchAngle <= PI/2
	//0 <= yawAngle < 2.PI
	neo3d.Mat4.bufferBuildFPSView(this.buffer, 0, eyeV3.buffer, 0, pitchAngle, yawAngle);
	return this;
};

//MUST be considered as constants
neo3d.Mat4.NB_COMPONENTS = 16;
neo3d.Mat4.IDENTITY = new neo3d.Mat4();

neo3d.Mat4.createBuffer = function(nbElems)
{
	nbElems *= 16;

	//Always initialized to 0
	var buffer = new Float32Array(nbElems);

	for (var i = 0; i < nbElems; i += 16)
		buffer[i] = buffer[i + 5] = buffer[i + 10] = buffer[i + 15] = 1.0;

	return buffer;
};

neo3d.Mat4.bufferSetRotationFromQuat = function(outBuffer, outOffset, inQBuffer, inQOffset)
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
	outBuffer[outOffset + 3] = 0.0;

	outBuffer[outOffset + 4] = x2y - z2w;
	outBuffer[outOffset + 5] = 1.0 - x2x - z2z;
	outBuffer[outOffset + 6] = x2w + y2z;
	outBuffer[outOffset + 7] = 0.0;

	outBuffer[outOffset + 8] = y2w + x2z;
	outBuffer[outOffset + 9] = y2z - x2w;
	outBuffer[outOffset + 10] = 1.0 - x2x - y2y;
	outBuffer[outOffset + 11] = 0.0;

	return outBuffer;
};

neo3d.Mat4.bufferSetRotScaleFromMat3 = function(outBuffer, outOffset, inMat3Buffer, inMat3Offset)
{
	outBuffer[outOffset] = inMat3Buffer[inMat3Offset];
	outBuffer[outOffset + 1] = inMat3Buffer[inMat3Offset + 1];
	outBuffer[outOffset + 2] = inMat3Buffer[inMat3Offset + 2];
	outBuffer[outOffset + 3] = 0.0;

	outBuffer[outOffset + 4] = inMat3Buffer[inMat3Offset + 3];
	outBuffer[outOffset + 5] = inMat3Buffer[inMat3Offset + 4];
	outBuffer[outOffset + 6] = inMat3Buffer[inMat3Offset + 5];
	outBuffer[outOffset + 7] = 0.0;

	outBuffer[outOffset + 8] = inMat3Buffer[inMat3Offset + 6];
	outBuffer[outOffset + 9] = inMat3Buffer[inMat3Offset + 7];
	outBuffer[outOffset + 10] = inMat3Buffer[inMat3Offset + 8];
	outBuffer[outOffset + 11] = 0.0;

	return outBuffer;
};

neo3d.Mat4.bufferSetFromTRSTransfo = function(outBuffer, outOffset, inTransVec3Buffer, inTransVec3Offset, inRotQuatBuffer, inRotQuatOffset, inScaleVec3Buffer, inScaleVec3Offset)
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
	outBuffer[outOffset + 3] = 0.0;

	outBuffer[outOffset + 4] = (x2y - z2w) * sy;
	outBuffer[outOffset + 5] = (1.0 - x2x - z2z) * sy;
	outBuffer[outOffset + 6] = (x2w + y2z) * sy;
	outBuffer[outOffset + 7] = 0.0;

	outBuffer[outOffset + 8] = (y2w + x2z) * sz;
	outBuffer[outOffset + 9] = (y2z - x2w) * sz;
	outBuffer[outOffset + 10] = (1.0 - x2x - y2y) * sz;
	outBuffer[outOffset + 11] = 0.0;

	outBuffer[outOffset + 12] = inTransVec3Buffer[inTransVec3Offset];
	outBuffer[outOffset + 13] = inTransVec3Buffer[inTransVec3Offset + 1];
	outBuffer[outOffset + 14] = inTransVec3Buffer[inTransVec3Offset + 2];
	outBuffer[outOffset + 15] = 1.0;

	return outBuffer;
};

neo3d.Mat4.bufferIsIdentity = function(inBuffer, inOffset)
{
	if ((neo3d.abs(inBuffer[inOffset] - 1.0) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 1]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 2]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 3]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 4]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 5] - 1.0) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 6]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 7]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 8]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 9]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 10] - 1.0) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 11]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 12]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 13]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 14]) < neo3d.EPSILON) &&
		(neo3d.abs(inBuffer[inOffset + 15] - 1.0) < neo3d.EPSILON))
		return true;
	else
		return false;
};

neo3d.Mat4.bufferEquals = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
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
		 (neo3d.abs(inBufferB[inOffsetB + 8] - inBufferA[inOffsetA + 8]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 9] - inBufferA[inOffsetA + 9]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 10] - inBufferA[inOffsetA + 10]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 11] - inBufferA[inOffsetA + 11]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 12] - inBufferA[inOffsetA + 12]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 13] - inBufferA[inOffsetA + 13]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 14] - inBufferA[inOffsetA + 14]) < neo3d.EPSILON) &&
		 (neo3d.abs(inBufferB[inOffsetB + 15] - inBufferA[inOffsetA + 15]) < neo3d.EPSILON)))
		return true;
	else
		return false;
};

neo3d.Mat4.bufferMultiply = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
	//    | m00 m10 m20 m30 |
	//M = | m01 m11 m21 m31 |
	//    | m02 m12 m22 m32 |
	//    | m03 m13 m23 m33 |
	var m00 = inBufferA[inOffsetA],
		m01 = inBufferA[inOffsetA + 1],
		m02 = inBufferA[inOffsetA + 2],
		m03 = inBufferA[inOffsetA + 3],
		m10 = inBufferA[inOffsetA + 4],
		m11 = inBufferA[inOffsetA + 5],
		m12 = inBufferA[inOffsetA + 6],
		m13 = inBufferA[inOffsetA + 7],
		m20 = inBufferA[inOffsetA + 8],
		m21 = inBufferA[inOffsetA + 9],
		m22 = inBufferA[inOffsetA + 10],
		m23 = inBufferA[inOffsetA + 11],
		m30 = inBufferA[inOffsetA + 12],
		m31 = inBufferA[inOffsetA + 13],
		m32 = inBufferA[inOffsetA + 14],
		m33 = inBufferA[inOffsetA + 15],
		x = inBufferB[inOffsetB],
		y = inBufferB[inOffsetB + 1],
		z = inBufferB[inOffsetB + 2],
		w = inBufferB[inOffsetB + 3];

	outBuffer[outOffset] = x * m00 + y * m10 + z * m20 + w * m30;
	outBuffer[outOffset + 1] = x * m01 + y * m11 + z * m21 + w * m31;
	outBuffer[outOffset + 2] = x * m02 + y * m12 + z * m22 + w * m32;
	outBuffer[outOffset + 3] = x * m03 + y * m13 + z * m23 + w * m33;

	x = inBufferB[inOffsetB + 4];
	y = inBufferB[inOffsetB + 5];
	z = inBufferB[inOffsetB + 6];
	w = inBufferB[inOffsetB + 7];
	outBuffer[outOffset + 4] = x * m00 + y * m10 + z * m20 + w * m30;
	outBuffer[outOffset + 5] = x * m01 + y * m11 + z * m21 + w * m31;
	outBuffer[outOffset + 6] = x * m02 + y * m12 + z * m22 + w * m32;
	outBuffer[outOffset + 7] = x * m03 + y * m13 + z * m23 + w * m33;

	x = inBufferB[inOffsetB + 8];
	y = inBufferB[inOffsetB + 9];
	z = inBufferB[inOffsetB + 10];
	w = inBufferB[inOffsetB + 11];
	outBuffer[outOffset + 8] = x * m00 + y * m10 + z * m20 + w * m30;
	outBuffer[outOffset + 9] = x * m01 + y * m11 + z * m21 + w * m31;
	outBuffer[outOffset + 10] = x * m02 + y * m12 + z * m22 + w * m32;
	outBuffer[outOffset + 11] = x * m03 + y * m13 + z * m23 + w * m33;

	x = inBufferB[inOffsetB + 12];
	y = inBufferB[inOffsetB + 13];
	z = inBufferB[inOffsetB + 14];
	w = inBufferB[inOffsetB + 15];
	outBuffer[outOffset + 12] = x * m00 + y * m10 + z * m20 + w * m30;
	outBuffer[outOffset + 13] = x * m01 + y * m11 + z * m21 + w * m31;
	outBuffer[outOffset + 14] = x * m02 + y * m12 + z * m22 + w * m32;
	outBuffer[outOffset + 15] = x * m03 + y * m13 + z * m23 + w * m33;

	return outBuffer;
};

neo3d.Mat4.bufferInvert = function(outBuffer, outOffset, inBuffer, inOffset)
{
	//    | m00 m10 m20 m30 |
	//M = | m01 m11 m21 m31 |
	//    | m02 m12 m22 m32 |
	//    | m03 m13 m23 m33 |
	var m00 = inBuffer[inOffset],
		m01 = inBuffer[inOffset + 1],
		m02 = inBuffer[inOffset + 2],
		m03 = inBuffer[inOffset + 3],
		m10 = inBuffer[inOffset + 4],
		m11 = inBuffer[inOffset + 5],
		m12 = inBuffer[inOffset + 6],
		m13 = inBuffer[inOffset + 7],
		m20 = inBuffer[inOffset + 8],
		m21 = inBuffer[inOffset + 9],
		m22 = inBuffer[inOffset + 10],
		m23 = inBuffer[inOffset + 11],
		m30 = inBuffer[inOffset + 12],
		m31 = inBuffer[inOffset + 13],
		m32 = inBuffer[inOffset + 14],
		m33 = inBuffer[inOffset + 15],
		s00 = m00 * m11 - m10 * m01,
		s01 = m00 * m12 - m10 * m02,
		s02 = m00 * m13 - m10 * m03,
		s03 = m01 * m12 - m11 * m02,
		s04 = m01 * m13 - m11 * m03,
		s05 = m02 * m13 - m12 * m03,
		c00 = m22 * m33 - m32 * m23,
		c01 = m21 * m33 - m31 * m23,
		c02 = m21 * m32 - m31 * m22,
		c03 = m20 * m33 - m30 * m23,
		c04 = m20 * m32 - m30 * m22,
		c05 = m20 * m31 - m30 * m21,
		det = s00 * c00 - s01 * c01 + s02 * c02 + s03 * c03 - s04 * c04 + s05 * c05;

	if (neo3d.abs(det) < neo3d.EPSILON)
	{
		outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = outBuffer[outOffset + 3] =
		outBuffer[outOffset + 4] = outBuffer[outOffset + 5] = outBuffer[outOffset + 6] = outBuffer[outOffset + 7] =
		outBuffer[outOffset + 8] = outBuffer[outOffset + 9] = outBuffer[outOffset + 10] = outBuffer[outOffset + 11] =
		outBuffer[outOffset + 12] = outBuffer[outOffset + 13] = outBuffer[outOffset + 14] = outBuffer[outOffset + 15] =
		(det >= 0.0) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

		return outBuffer;
	}

	det = 1.0 / det;
	outBuffer[outOffset] = (m11 * c00 - m12 * c01 + m13 * c02) * det;
	outBuffer[outOffset + 1] = (m02 * c01 - m01 * c00 - m03 * c02) * det;
	outBuffer[outOffset + 2] = (m31 * s05 - m32 * s04 + m33 * s03) * det;
	outBuffer[outOffset + 3] = (m22 * s04 - m21 * s05 - m23 * s03) * det;
	outBuffer[outOffset + 4] = (m12 * c03 - m10 * c00 - m13 * c04) * det;
	outBuffer[outOffset + 5] = (m00 * c00 - m02 * c03 + m03 * c04) * det;
	outBuffer[outOffset + 6] = (m32 * s02 - m30 * s05 - m33 * s01) * det;
	outBuffer[outOffset + 7] = (m20 * s05 - m22 * s02 + m23 * s01) * det;
	outBuffer[outOffset + 8] = (m10 * c01 - m11 * c03 + m13 * c05) * det;
	outBuffer[outOffset + 9] = (m01 * c03 - m00 * c01 - m03 * c05) * det;
	outBuffer[outOffset + 10] = (m30 * s04 - m31 * s02 + m33 * s00) * det;
	outBuffer[outOffset + 11] = (m21 * s02 - m20 * s04 - m23 * s00) * det;
	outBuffer[outOffset + 12] = (m11 * c04 - m10 * c02 - m12 * c05) * det;
	outBuffer[outOffset + 13] = (m00 * c02 - m01 * c04 + m02 * c05) * det;
	outBuffer[outOffset + 14] = (m31 * s01 - m30 * s03 - m32 * s00) * det;
	outBuffer[outOffset + 15] = (m20 * s03 - m21 * s01 + m22 * s00) * det;

	return outBuffer;
};

neo3d.Mat4.bufferTranspose = function(outBuffer, outOffset, inBuffer, inOffset)
{
	//    | m00 m10 m20 m30 |
	//M = | m01 m11 m21 m31 |
	//    | m02 m12 m22 m32 |
	//    | m03 m13 m23 m33 |
	var m01 = inBuffer[inOffset + 1],
		m02 = inBuffer[inOffset + 2],
		m03 = inBuffer[inOffset + 3],
		m12 = inBuffer[inOffset + 6],
		m13 = inBuffer[inOffset + 7],
		m23 = inBuffer[inOffset + 11];

	outBuffer[outOffset] = inBuffer[inOffset];
	outBuffer[outOffset + 1] = inBuffer[inOffset + 4];
	outBuffer[outOffset + 2] = inBuffer[inOffset + 8];
	outBuffer[outOffset + 3] = inBuffer[inOffset + 12];
	outBuffer[outOffset + 4] = m01;
	outBuffer[outOffset + 5] = inBuffer[inOffset + 5];
	outBuffer[outOffset + 6] = inBuffer[inOffset + 9];
	outBuffer[outOffset + 7] = inBuffer[inOffset + 13];
	outBuffer[outOffset + 8] = m02;
	outBuffer[outOffset + 9] = m12;
	outBuffer[outOffset + 10] = inBuffer[inOffset + 10];
	outBuffer[outOffset + 11] = inBuffer[inOffset + 14];
	outBuffer[outOffset + 12] = m03;
	outBuffer[outOffset + 13] = m13;
	outBuffer[outOffset + 14] = m23;
	outBuffer[outOffset + 15] = inBuffer[inOffset + 15];

	return outBuffer;
};

neo3d.Mat4.bufferTransformVec4 = function(outV4Buffer, outV4Offset, inM4Buffer, inM4Offset, inV4Buffer, inV4Offset)
{
	var x = inV4Buffer[inV4Offset],
		y = inV4Buffer[inV4Offset + 1],
		z = inV4Buffer[inV4Offset + 2],
		w = inV4Buffer[inV4Offset + 3];

	outV4Buffer[outV4Offset] = x * inM4Buffer[inM4Offset] + y * inM4Buffer[inM4Offset + 4] + z * inM4Buffer[inM4Offset + 8] + w * inM4Buffer[inM4Offset + 12];
	outV4Buffer[outV4Offset + 1] = x * inM4Buffer[inM4Offset + 1] + y * inM4Buffer[inM4Offset + 5] + z * inM4Buffer[inM4Offset + 9] + w * inM4Buffer[inM4Offset + 13];
	outV4Buffer[outV4Offset + 2] = x * inM4Buffer[inM4Offset + 2] + y * inM4Buffer[inM4Offset + 6] + z * inM4Buffer[inM4Offset + 10] + w * inM4Buffer[inM4Offset + 14];
	outV4Buffer[outV4Offset + 3] = x * inM4Buffer[inM4Offset + 3] + y * inM4Buffer[inM4Offset + 7] + z * inM4Buffer[inM4Offset + 11] + w * inM4Buffer[inM4Offset + 15];

	return inM4Buffer;
};

neo3d.Mat4.bufferTransformVec3Pos = function(outV3Buffer, outV3Offset, inM4Buffer, inM4Offset, inV3Buffer, inV3Offset)
{
	var x = inV3Buffer[inV3Offset],
		y = inV3Buffer[inV3Offset + 1],
		z = inV3Buffer[inV3Offset + 2];

	outV3Buffer[outV3Offset] = x * inM4Buffer[inM4Offset] + y * inM4Buffer[inM4Offset + 4] + z * inM4Buffer[inM4Offset + 8] + inM4Buffer[inM4Offset + 12];
	outV3Buffer[outV3Offset + 1] = x * inM4Buffer[inM4Offset + 1] + y * inM4Buffer[inM4Offset + 5] + z * inM4Buffer[inM4Offset + 9] + inM4Buffer[inM4Offset + 13];
	outV3Buffer[outV3Offset + 2] = x * inM4Buffer[inM4Offset + 2] + y * inM4Buffer[inM4Offset + 6] + z * inM4Buffer[inM4Offset + 10] + inM4Buffer[inM4Offset + 14];

	return inM4Buffer;
};

neo3d.Mat4.bufferTransformVec3Dir = function(outV3Buffer, outV3Offset, inM4Buffer, inM4Offset, inV3Buffer, inV3Offset)
{
	var x = inV3Buffer[inV3Offset],
		y = inV3Buffer[inV3Offset + 1],
		z = inV3Buffer[inV3Offset + 2];

	outV3Buffer[outV3Offset] = x * inM4Buffer[inM4Offset] + y * inM4Buffer[inM4Offset + 4] + z * inM4Buffer[inM4Offset + 8];
	outV3Buffer[outV3Offset + 1] = x * inM4Buffer[inM4Offset + 1] + y * inM4Buffer[inM4Offset + 5] + z * inM4Buffer[inM4Offset + 9];
	outV3Buffer[outV3Offset + 2] = x * inM4Buffer[inM4Offset + 2] + y * inM4Buffer[inM4Offset + 6] + z * inM4Buffer[inM4Offset + 10];

	return inM4Buffer;
};

neo3d.Mat4.bufferBuildFrustumProj = function(outBuffer, outOffset, left, right, bottom, top, near, far)
{
	//We must have:
	//left < right
	//bottom < top
	//0 < near < far (near and far are positive distances along -z direction)
	var rl = 1.0 / (right - left),
		tb = 1.0 / (top - bottom),
		nf = 1.0 / (near - far),
		near2 = near + near;

	outBuffer[outOffset] = near2 * rl;
	outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = outBuffer[outOffset + 3] = outBuffer[outOffset + 4] = 0.0;
	outBuffer[outOffset + 5] = near2 * tb;
	outBuffer[outOffset + 6] = outBuffer[outOffset + 7] = 0.0;
	outBuffer[outOffset + 8] = (right + left) * rl;
	outBuffer[outOffset + 9] = (top + bottom) * tb;
	outBuffer[outOffset + 10] = (far + near) * nf;
	outBuffer[outOffset + 11] = -1.0;
	outBuffer[outOffset + 12] = outBuffer[outOffset + 13] = 0.0;
	outBuffer[outOffset + 14] = far * near2 * nf;
	outBuffer[outOffset + 15] = 0.0;

	return outBuffer;
};

neo3d.Mat4.bufferBuildPerspectiveProj = function(outBuffer, outOffset, fov, aspect, near, far)
{
	//We must have:
	//0 < fov < PI
	//0 < aspect (aspect = width / height of near projection plane)
	//0 < near < far (near and far are positive distances along -z direction)
	var f = 1.0 / neo3d.tan(0.5 * fov),
		nf = 1.0 / (near - far);

	outBuffer[outOffset] = f;
	outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = outBuffer[outOffset + 3] = outBuffer[outOffset + 4] = 0.0;
	outBuffer[outOffset + 5] = f * aspect;
	outBuffer[outOffset + 6] = outBuffer[outOffset + 7] = outBuffer[outOffset + 8] = outBuffer[outOffset + 9] = 0.0;
	outBuffer[outOffset + 10] = (far + near) * nf;
	outBuffer[outOffset + 11] = -1.0;
	outBuffer[outOffset + 12] = outBuffer[outOffset + 13] = 0.0;
	outBuffer[outOffset + 14] = far * (near + near) * nf;
	outBuffer[outOffset + 15] = 0.0;

	return outBuffer;
};

neo3d.Mat4.bufferBuildOrthoProj = function(outBuffer, outOffset, left, right, bottom, top, near, far)
{
	//We must have:
	//left < right
	//bottom < top
	//0 < near < far (near and far are positive distances along -z direction)
	var rl = 1.0 / (right - left),
		tb = 1.0 / (top - bottom),
		nf = 1.0 / (near - far);

	outBuffer[outOffset] = rl + rl;
	outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = outBuffer[outOffset + 3] = outBuffer[outOffset + 4] = 0.0;
	outBuffer[outOffset + 5] = tb + tb;
	outBuffer[outOffset + 6] = outBuffer[outOffset + 7] = outBuffer[outOffset + 8] = outBuffer[outOffset + 9] = 0.0;
	outBuffer[outOffset + 10] = nf + nf;
	outBuffer[outOffset + 11] = 0.0;
	outBuffer[outOffset + 12] = -(right + left) * rl;
	outBuffer[outOffset + 13] = -(top + bottom) * tb;
	outBuffer[outOffset + 14] = (far + near) * nf;
	outBuffer[outOffset + 15] = 1.0;

	return outBuffer;
};

neo3d.Mat4.bufferBuildLookAtView = function(outBuffer, outOffset, eyeV3Buffer, eyeV3Offset, targetV3Buffer, targetV3Offset, upV3Buffer, upV3Offset)
{
	var xEye = eyeV3Buffer[eyeV3Offset],
		yEye = eyeV3Buffer[eyeV3Offset + 1],
		zEye = eyeV3Buffer[eyeV3Offset + 2],
		xUp = upV3Buffer[upV3Offset],
		yUp = upV3Buffer[upV3Offset + 1],
		zUp = upV3Buffer[upV3Offset + 2],
		z0 = xEye - targetV3Buffer[targetV3Offset],
		z1 = yEye - targetV3Buffer[targetV3Offset + 1],
		z2 = zEye - targetV3Buffer[targetV3Offset + 2],
		n = z0 * z0 + z1 * z1 + z2 * z2;

	if (n < neo3d.EPSILON2)
	{
		//Invalid lookAt target, returned matrix is set to Identity
		outBuffer[outOffset] = outBuffer[outOffset + 5] = outBuffer[outOffset + 10] = outBuffer[outOffset + 15] = 1.0;
		outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = outBuffer[outOffset + 3] = outBuffer[outOffset + 4] =
		outBuffer[outOffset + 6] = outBuffer[outOffset + 7] = outBuffer[outOffset + 8] = outBuffer[outOffset + 9] =
		outBuffer[outOffset + 11] = outBuffer[outOffset + 12] = outBuffer[outOffset + 13] = outBuffer[outOffset + 14] = 0.0;

		return outBuffer;
	}

	n = 1.0 / neo3d.sqrt(n);
	z0 *= n;
	z1 *= n;
	z2 *= n;

	var x0 = yUp * z2 - z1 * zUp,
		x1 = zUp * z0 - z2 * xUp,
		x2 = xUp * z1 - z0 * yUp;

	n = x0 * x0 + x1 * x1 + x2 * x2;
	if (n < neo3d.EPSILON2)
		x0 = x1 = x2 = 0.0; //eye->target vector is colinear with up-vector
	else
	{
		n = 1.0 / neo3d.sqrt(n);
		x0 *= n;
		x1 *= n;
		x2 *= n;
	}

	var y0 = z1 * x2 - x1 * z2,
		y1 = z2 * x0 - x2 * z0,
		y2 = z0 * x1 - x0 * z1;

	n = y0 * y0 + y1 * y1 + y2 * y2;
	if (n < neo3d.EPSILON2)
		y0 = y1 = y2 = 0.0;
	else
	{
		n = 1.0 / neo3d.sqrt(n);
		y0 *= n;
		y1 *= n;
		y2 *= n;
	}

	outBuffer[outOffset] = x0;
	outBuffer[outOffset + 1] = y0;
	outBuffer[outOffset + 2] = z0;
	outBuffer[outOffset + 3] = 0.0;

	outBuffer[outOffset + 4] = x1;
	outBuffer[outOffset + 5] = y1;
	outBuffer[outOffset + 6] = z1;
	outBuffer[outOffset + 7] = 0.0;

	outBuffer[outOffset + 8] = x2;
	outBuffer[outOffset + 9] = y2;
	outBuffer[outOffset + 10] = z2;
	outBuffer[outOffset + 11] = 0.0;

	outBuffer[outOffset + 12] = -(x0 * xEye + x1 * yEye + x2 * zEye);
	outBuffer[outOffset + 13] = -(y0 * xEye + y1 * yEye + y2 * zEye);
	outBuffer[outOffset + 14] = -(z0 * xEye + z1 * yEye + z2 * zEye);
	outBuffer[outOffset + 15] = 1.0;

	return outBuffer;
};

neo3d.Mat4.bufferBuildFPSView = function(outBuffer, outOffset, eyeV3Buffer, eyeV3Offset, pitchAngle, yawAngle)
{
	//We must have:
	//- PI/2 <= pitchAngle <= PI/2
	//0 <= yawAngle < 2.PI
	var xEye = eyeV3Buffer[eyeV3Offset],
		yEye = eyeV3Buffer[eyeV3Offset + 1],
		zEye = eyeV3Buffer[eyeV3Offset + 2],
		x0 = neo3d.cos(yawAngle), //x1 = 0.0
		x2 = -neo3d.sin(yawAngle),
		y1 = neo3d.cos(pitchAngle),
		z1 = -neo3d.sin(pitchAngle),
		y0 = x2 * z1,
		y2 = -x0 * z1,
		z0 = -x2 * y1,
		z2 = x0 * y1;

	outBuffer[outOffset] = x0;
	outBuffer[outOffset + 1] = y0;
	outBuffer[outOffset + 2] = z0;
	outBuffer[outOffset + 3] = 0.0;

	outBuffer[outOffset + 4] = 0.0;
	outBuffer[outOffset + 5] = y1;
	outBuffer[outOffset + 6] = z1;
	outBuffer[outOffset + 7] = 0.0;

	outBuffer[outOffset + 8] = x2;
	outBuffer[outOffset + 9] = y2;
	outBuffer[outOffset + 10] = z2;
	outBuffer[outOffset + 11] = 0.0;

	outBuffer[outOffset + 12] = -(x0 * xEye + x2 * zEye);
	outBuffer[outOffset + 13] = -(y0 * xEye + y1 * yEye + y2 * zEye);
	outBuffer[outOffset + 14] = -(z0 * xEye + z1 * yEye + z2 * zEye);
	outBuffer[outOffset + 15] = 1.0;

	return outBuffer;
};
