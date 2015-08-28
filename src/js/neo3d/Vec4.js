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
neo3d.Vec4 = function()
{
	this.buffer = neo3d.Vec4.createBuffer(1);
};

neo3d.Vec4.prototype.setFromValues = function(x, y, z, w)
{
	this.buffer[0] = x;
	this.buffer[1] = y;
	this.buffer[2] = z;
	this.buffer[3] = w;

	return this;
};

neo3d.Vec4.prototype.setFromArray = function(arr)
{
	this.buffer[0] = arr[0];
	this.buffer[1] = arr[1];
	this.buffer[2] = arr[2];
	this.buffer[3] = arr[3];

	return this;
};

neo3d.Vec4.prototype.setFromVec3Pos = function(v3)
{
	this.buffer[0] = v3.buffer[0];
	this.buffer[1] = v3.buffer[1];
	this.buffer[2] = v3.buffer[2];
	this.buffer[3] = 1.0;

	return this;
};

neo3d.Vec4.prototype.setFromVec3Dir = function(v3)
{
	this.buffer[0] = v3.buffer[0];
	this.buffer[1] = v3.buffer[1];
	this.buffer[2] = v3.buffer[2];
	this.buffer[3] = 0.0;

	return this;
};

neo3d.Vec4.prototype.setNull = function()
{
	this.buffer[0] = this.buffer[1] = this.buffer[2] = this.buffer[3] = 0.0;
	return this;
};

neo3d.Vec4.prototype.setOne = function()
{
	this.buffer[0] = this.buffer[1] = this.buffer[2] = this.buffer[3] = 1.0;
	return this;
};

neo3d.Vec4.prototype.copy = function(v4)
{
	this.buffer[0] = v4.buffer[0];
	this.buffer[1] = v4.buffer[1];
	this.buffer[2] = v4.buffer[2];
	this.buffer[3] = v4.buffer[3];

	return this;
};

neo3d.Vec4.prototype.equals = function(v4)
{
	return neo3d.Vec4.bufferEquals(this.buffer, 0, v4.buffer, 0);
};

neo3d.Vec4.prototype.add = function(v4A, v4B)
{
	neo3d.Vec4.bufferAdd(this.buffer, 0, v4A.buffer, 0, v4B.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.addInPlace = function(v4)
{
	neo3d.Vec4.bufferAddInPlace(this.buffer, 0, v4.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.substract = function(v4A, v4B)
{
	neo3d.Vec4.bufferSubstract(this.buffer, 0, v4A.buffer, 0, v4B.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.substractInPlace = function(v4)
{
	neo3d.Vec4.bufferSubstractInPlace(this.buffer, 0, v4.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.scale = function(scale, v4)
{
	neo3d.Vec4.bufferScale(this.buffer, 0, scale, v4.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.scaleInPlace = function(scale)
{
	neo3d.Vec4.bufferScaleInPlace(this.buffer, 0, scale);
	return this;
};

neo3d.Vec4.prototype.addScaled = function(v4A, scale, v4B)
{
	neo3d.Vec4.bufferAddScaled(this.buffer, 0, v4A.buffer, 0, scale, v4B.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.addScaledInPlace = function(scale, v4)
{
	neo3d.Vec4.bufferAddScaledInPlace(this.buffer, 0, scale, v4.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.squareDistance = function(v4)
{
	return neo3d.Vec4.bufferSquareDistance(this.buffer, 0, v4.buffer, 0);
};

neo3d.Vec4.prototype.distance = function(v4)
{
	return neo3d.Vec4.bufferDistance(this.buffer, 0, v4.buffer, 0);
};

neo3d.Vec4.prototype.squareNorm = function()
{
	return neo3d.Vec4.bufferSquareNorm(this.buffer, 0);
};

neo3d.Vec4.prototype.norm = function()
{
	return neo3d.Vec4.bufferNorm(this.buffer, 0);
};

neo3d.Vec4.prototype.normalize = function(v4)
{
	neo3d.Vec4.bufferNormalize(this.buffer, 0, v4.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.normalizeInPlace = function()
{
	neo3d.Vec4.bufferNormalize(this.buffer, 0, this.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.dotProduct = function(v4)
{
	return neo3d.Vec4.bufferDotProduct(this.buffer, 0, v4.buffer, 0);
};

neo3d.Vec4.prototype.linear = function(p0, t, p1)
{
	neo3d.Vec4.bufferLinear(this.buffer, 0, p0.buffer, 0, t, p1.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.quadratic = function(p0, p1, t, p2)
{
	neo3d.Vec4.bufferQuadratic(this.buffer, 0, p0.buffer, 0, p1.buffer, 0, t, p2.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.hermite = function(tan0, p0, t, p1, tan1)
{
	neo3d.Vec4.bufferHermite(this.buffer, 0, tan0.buffer, 0, p0.buffer, 0, t, p1.buffer, 0, tan1.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.bezier = function(ctrl0, p0, t, p1, ctrl1)
{
	neo3d.Vec4.bufferBezier(this.buffer, 0, ctrl0.buffer, 0, p0.buffer, 0, t, p1.buffer, 0, ctrl1.buffer, 0);
	return this;
};

neo3d.Vec4.prototype.catmullRom = function(p0, p1, t, p2, p3)
{
	neo3d.Vec4.bufferCatmullRom(this.buffer, 0, p0.buffer, 0, p1.buffer, 0, t, p2.buffer, 0, p3.buffer, 0);
	return this;
};

neo3d.Vec4.NB_COMPONENTS = 4;

neo3d.Vec4.createBuffer = function(nbElems)
{
	//Always initialized to 0
	return new Float32Array(4 * nbElems);
};

neo3d.Vec4.I = new neo3d.Vec4().setFromValues(1.0, 0.0, 0.0, 0.0);

neo3d.Vec4.J = new neo3d.Vec4().setFromValues(0.0, 1.0, 0.0, 0.0);

neo3d.Vec4.K = new neo3d.Vec4().setFromValues(0.0, 0.0, 1.0, 0.0);

neo3d.Vec4.L = new neo3d.Vec4().setFromValues(0.0, 0.0, 0.0, 1.0);

neo3d.Vec4.bufferEquals = function(bufferA, offsetA, bufferB, offsetB)
{
	if ((bufferA === bufferB) ||
		((neo3d.abs(bufferB[offsetB] - bufferA[offsetA]) < neo3d.EPSILON) &&
		(neo3d.abs(bufferB[offsetB + 1] - bufferA[offsetA + 1]) < neo3d.EPSILON) &&
		(neo3d.abs(bufferB[offsetB + 2] - bufferA[offsetA + 2]) < neo3d.EPSILON) &&
		(neo3d.abs(bufferB[offsetB + 3] - bufferA[offsetA + 3]) < neo3d.EPSILON)))
		return true;
	else
		return false;
};

neo3d.Vec4.bufferAdd = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
	outBuffer[outOffset] = inBufferA[inOffsetA] + inBufferB[inOffsetB];
	outBuffer[outOffset + 1] = inBufferA[inOffsetA + 1] + inBufferB[inOffsetB + 1];
	outBuffer[outOffset + 2] = inBufferA[inOffsetA + 2] + inBufferB[inOffsetB + 2];
	outBuffer[outOffset + 3] = inBufferA[inOffsetA + 3] + inBufferB[inOffsetB + 3];

	return outBuffer;
};

neo3d.Vec4.bufferAddInPlace = function(outBuffer, outOffset, inBuffer, inOffset)
{
	outBuffer[outOffset] += inBuffer[inOffset];
	outBuffer[outOffset + 1] += inBuffer[inOffset + 1];
	outBuffer[outOffset + 2] += inBuffer[inOffset + 2];
	outBuffer[outOffset + 3] += inBuffer[inOffset + 3];

	return outBuffer;
};

neo3d.Vec4.bufferSubstract = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
	outBuffer[outOffset] = inBufferA[inOffsetA] - inBufferB[inOffsetB];
	outBuffer[outOffset + 1] = inBufferA[inOffsetA + 1] - inBufferB[inOffsetB + 1];
	outBuffer[outOffset + 2] = inBufferA[inOffsetA + 2] - inBufferB[inOffsetB + 2];
	outBuffer[outOffset + 3] = inBufferA[inOffsetA + 3] - inBufferB[inOffsetB + 3];

	return outBuffer;
};

neo3d.Vec4.bufferSubstractInPlace = function(outBuffer, outOffset, inBuffer, inOffset)
{
	outBuffer[outOffset] -= inBuffer[inOffset];
	outBuffer[outOffset + 1] -= inBuffer[inOffset + 1];
	outBuffer[outOffset + 2] -= inBuffer[inOffset + 2];
	outBuffer[outOffset + 3] -= inBuffer[inOffset + 3];

	return outBuffer;
};

neo3d.Vec4.bufferScale = function(outBuffer, outOffset, scale, inBuffer, inOffset)
{
	outBuffer[outOffset] = scale * inBuffer[inOffset];
	outBuffer[outOffset + 1] = scale * inBuffer[inOffset + 1];
	outBuffer[outOffset + 2] = scale * inBuffer[inOffset + 2];
	outBuffer[outOffset + 3] = scale * inBuffer[inOffset + 3];

	return outBuffer;
};

neo3d.Vec4.bufferScaleInPlace = function(outBuffer, outOffset, scale)
{
	outBuffer[outOffset] *= scale;
	outBuffer[outOffset + 1] *= scale;
	outBuffer[outOffset + 2] *= scale;
	outBuffer[outOffset + 3] *= scale;

	return outBuffer;
};

neo3d.Vec4.bufferAddScaled = function(outBuffer, outOffset, inBufferA, inOffsetA, scale, inBufferB, inOffsetB)
{
	outBuffer[outOffset] = inBufferA[inOffsetA] + scale * inBufferB[inOffsetB];
	outBuffer[outOffset + 1] = inBufferA[inOffsetA + 1] + scale * inBufferB[inOffsetB + 1];
	outBuffer[outOffset + 2] = inBufferA[inOffsetA + 2] + scale * inBufferB[inOffsetB + 2];
	outBuffer[outOffset + 3] = inBufferA[inOffsetA + 3] + scale * inBufferB[inOffsetB + 3];

	return outBuffer;
};

neo3d.Vec4.bufferAddScaledInPlace = function(outBuffer, outOffset, scale, inBuffer, inOffset)
{
	outBuffer[outOffset] += scale * inBuffer[inOffset];
	outBuffer[outOffset + 1] += scale * inBuffer[inOffset + 1];
	outBuffer[outOffset + 2] += scale * inBuffer[inOffset + 2];
	outBuffer[outOffset + 3] += scale * inBuffer[inOffset + 3];

	return outBuffer;
};

neo3d.Vec4.bufferSquareDistance = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
	var x = inBufferB[inOffsetB] - inBufferA[inOffsetA],
		y = inBufferB[inOffsetB + 1] - inBufferA[inOffsetA + 1],
		z = inBufferB[inOffsetB + 2] - inBufferA[inOffsetA + 2],
		w = inBufferB[inOffsetB + 3] - inBufferA[inOffsetA + 3];

	return x * x + y * y + z * z + w * w;
};

neo3d.Vec4.bufferDistance = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
	var x = inBufferB[inOffsetB] - inBufferA[inOffsetA],
		y = inBufferB[inOffsetB + 1] - inBufferA[inOffsetA + 1],
		z = inBufferB[inOffsetB + 2] - inBufferA[inOffsetA + 2],
		w = inBufferB[inOffsetB + 3] - inBufferA[inOffsetA + 3];

	return neo3d.sqrt(x * x + y * y + z * z + w * w);
};

neo3d.Vec4.bufferSquareNorm = function(inBuffer, inOffset)
{
	var x = inBuffer[inOffset],
		y = inBuffer[inOffset + 1],
		z = inBuffer[inOffset + 2],
		w = inBuffer[inOffset + 3];

	return x * x + y * y + z * z + w * w;
};

neo3d.Vec4.bufferNorm = function(inBuffer, inOffset)
{
	var x = inBuffer[inOffset],
		y = inBuffer[inOffset + 1],
		z = inBuffer[inOffset + 2],
		w = inBuffer[inOffset + 3];

	return neo3d.sqrt(x * x + y * y + z * z + w * w);
};

neo3d.Vec4.bufferNormalize = function(outBuffer, outOffset, inBuffer, inOffset)
{
	var x = inBuffer[inOffset],
		y = inBuffer[inOffset + 1],
		z = inBuffer[inOffset + 2],
		w = inBuffer[inOffset + 3],
		n = x * x + y * y + z * z + w * w;

	if (n < neo3d.EPSILON2)
	{
		outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = outBuffer[outOffset + 3] = 0.0;
		return outBuffer;
	}

	n = 1.0 / neo3d.sqrt(n);
	outBuffer[outOffset] = x * n;
	outBuffer[outOffset + 1] = y * n;
	outBuffer[outOffset + 2] = z * n;
	outBuffer[outOffset + 3] = w * n;

	return outBuffer;
};

neo3d.Vec4.bufferDotProduct = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
	return inBufferA[inOffsetA] * inBufferB[inOffsetB] +
		   inBufferA[inOffsetA + 1] * inBufferB[inOffsetB + 1] +
		   inBufferA[inOffsetA + 2] * inBufferB[inOffsetB + 2] +
		   inBufferA[inOffsetA + 3] * inBufferB[inOffsetB + 3];
};

neo3d.Vec4.bufferLinear = function(outBuffer, outOffset, inBufferP0, inOffsetP0, t, inBufferP1, inOffsetP1)
{
	var x = inBufferP0[inOffsetP0],
		y = inBufferP0[inOffsetP0 + 1],
		z = inBufferP0[inOffsetP0 + 2],
		w = inBufferP0[inOffsetP0 + 3];

	outBuffer[outOffset] = x + t * (inBufferP1[inOffsetP1] - x);
	outBuffer[outOffset + 1] = y + t * (inBufferP1[inOffsetP1 + 1] - y);
	outBuffer[outOffset + 2] = z + t * (inBufferP1[inOffsetP1 + 2] - z);
	outBuffer[outOffset + 3] = w + t * (inBufferP1[inOffsetP1 + 3] - w);

	return outBuffer;
};

neo3d.Vec4.bufferQuadratic = function(outBuffer, outOffset, inBufferP0, inOffsetP0, inBufferP1, inOffsetP1, t, inBufferP2, inOffsetP2)
{
	//Interpolation is between points P1 and P2
	var f0 = 0.5 * (t - 1.0) * t,
		f1 = 1.0 - t * t,
		f2 = 0.5 * (t + 1.0) * t;

	outBuffer[outOffset] = f0 * inBufferP0[inOffsetP0] + f1 * inBufferP1[inOffsetP1] + f2 * inBufferP2[inOffsetP2];
	outBuffer[outOffset + 1] = f0 * inBufferP0[inOffsetP0 + 1] + f1 * inBufferP1[inOffsetP1 + 1] + f2 * inBufferP2[inOffsetP2 + 1];
	outBuffer[outOffset + 2] = f0 * inBufferP0[inOffsetP0 + 2] + f1 * inBufferP1[inOffsetP1 + 2] + f2 * inBufferP2[inOffsetP2 + 2];
	outBuffer[outOffset + 3] = f0 * inBufferP0[inOffsetP0 + 3] + f1 * inBufferP1[inOffsetP1 + 3] + f2 * inBufferP2[inOffsetP2 + 3];

	return outBuffer;
};

neo3d.Vec4.bufferHermite = function(outBuffer, outOffset, inBufferT0, inOffsetT0, inBufferP0, inOffsetP0, t, inBufferP1, inOffsetP1, inBufferT1, inOffsetT1)
{
	//Ti is the tangent at point Pi
	var tt = t * t,
		f0 = tt * (t - 2.0) + t,
		f1 = tt * (2.0 * t - 3.0) + 1.0,
		f2 = tt * (3.0 - 2.0 * t),
		f3 = tt * (t - 1.0);

	outBuffer[outOffset] = f0 * inBufferT0[inOffsetT0] + f1 * inBufferP0[inOffsetP0] + f2 * inBufferP1[inOffsetP1] + f3 * inBufferT1[inOffsetT1];
	outBuffer[outOffset + 1] = f0 * inBufferT0[inOffsetT0 + 1] + f1 * inBufferP0[inOffsetP0 + 1] + f2 * inBufferP1[inOffsetP1 + 1] + f3 * inBufferT1[inOffsetT1 + 1];
	outBuffer[outOffset + 2] = f0 * inBufferT0[inOffsetT0 + 2] + f1 * inBufferP0[inOffsetP0 + 2] + f2 * inBufferP1[inOffsetP1 + 2] + f3 * inBufferT1[inOffsetT1 + 2];
	outBuffer[outOffset + 3] = f0 * inBufferT0[inOffsetT0 + 3] + f1 * inBufferP0[inOffsetP0 + 3] + f2 * inBufferP1[inOffsetP1 + 3] + f3 * inBufferT1[inOffsetT1 + 3];

	return outBuffer;
};

neo3d.Vec4.bufferBezier = function(outBuffer, outOffset, inBufferC0, inOffsetC0, inBufferP0, inOffsetP0, t, inBufferP1, inOffsetP1, inBufferC1, inOffsetC1)
{
	//Ci is the control point at point Pi
	//Bezier interpolation is a special Hermite interpolation with:
	//T0 = 3 * (C0 - P0)
	//T1 = 3 * (P1 - C1)
	var tt = t * t,
		lessT = 1.0 - t,
		lessT2 = lessT * lessT,
		f0 = 3.0 * lessT2 * t,
		f1 = lessT2 * lessT,
		f2 = tt * t,
		f3 = 3.0 * lessT * tt;

	outBuffer[outOffset] = f0 * inBufferC0[inOffsetC0] + f1 * inBufferP0[inOffsetP0] + f2 * inBufferP1[inOffsetP1] + f3 * inBufferC1[inOffsetC1];
	outBuffer[outOffset + 1] = f0 * inBufferC0[inOffsetC0 + 1] + f1 * inBufferP0[inOffsetP0 + 1] + f2 * inBufferP1[inOffsetP1 + 1] + f3 * inBufferC1[inOffsetC1 + 1];
	outBuffer[outOffset + 2] = f0 * inBufferC0[inOffsetC0 + 2] + f1 * inBufferP0[inOffsetP0 + 2] + f2 * inBufferP1[inOffsetP1 + 2] + f3 * inBufferC1[inOffsetC1 + 2];
	outBuffer[outOffset + 3] = f0 * inBufferC0[inOffsetC0 + 3] + f1 * inBufferP0[inOffsetP0 + 3] + f2 * inBufferP1[inOffsetP1 + 3] + f3 * inBufferC1[inOffsetC1 + 3];

	return outBuffer;
};

neo3d.Vec4.bufferCatmullRom = function(outBuffer, outOffset, inBufferP0, inOffsetP0, inBufferP1, inOffsetP1, t, inBufferP2, inOffsetP2, inBufferP3, inOffsetP3)
{
	//Interpolation is between points P1 and P2
	//Catmull-Rom interpolation is a special Hermite interpolation with:
	//Ti = 0.5 * (Pi+1 - Pi-1)
	var tt = t * t,
		lessHalfT = -0.5 * t,
		f0 = lessHalfT * (tt + 1.0) + tt,
		f1 = lessHalfT * (5.0 * t - 3.0 * tt) + 1.0,
		f2 = lessHalfT * (3.0 * tt - 4.0 * t - 1.0),
		f3 = lessHalfT * (t - tt);

	outBuffer[outOffset] = f0 * inBufferP0[inOffsetP0] + f1 * inBufferP1[inOffsetP1] + f2 * inBufferP2[inOffsetP2] + f3 * inBufferP3[inOffsetP3];
	outBuffer[outOffset + 1] = f0 * inBufferP0[inOffsetP0 + 1] + f1 * inBufferP1[inOffsetP1 + 1] + f2 * inBufferP2[inOffsetP2 + 1] + f3 * inBufferP3[inOffsetP3 + 1];
	outBuffer[outOffset + 2] = f0 * inBufferP0[inOffsetP0 + 2] + f1 * inBufferP1[inOffsetP1 + 2] + f2 * inBufferP2[inOffsetP2 + 2] + f3 * inBufferP3[inOffsetP3 + 2];
	outBuffer[outOffset + 3] = f0 * inBufferP0[inOffsetP0 + 3] + f1 * inBufferP1[inOffsetP1 + 3] + f2 * inBufferP2[inOffsetP2 + 3] + f3 * inBufferP3[inOffsetP3 + 3];

	return outBuffer;
};
