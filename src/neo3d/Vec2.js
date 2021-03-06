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

var math = require("./math");

var Vec2 = module.exports = function()
{
    //Always initialized to 0
    this.buffer = new Float32Array(2);
};

Vec2.prototype.setFromValues = function(x, y)
{
    this.buffer[0] = x;
    this.buffer[1] = y;

    return this;
};

Vec2.prototype.setFromArray = function(arr)
{
    this.buffer[0] = arr[0];
    this.buffer[1] = arr[1];

    return this;
};

Vec2.prototype.setNull = function()
{
    this.buffer[0] = this.buffer[1] = 0.0;
    return this;
};

Vec2.prototype.setOne = function()
{
    this.buffer[0] = this.buffer[1] = 1.0;
    return this;
};

Vec2.prototype.copy = function(v2)
{
    this.buffer[0] = v2.buffer[0];
    this.buffer[1] = v2.buffer[1];

    return this;
};

Vec2.prototype.isNull = function()
{
    return Vec2.bufferIsNull(this.buffer, 0);
};

Vec2.prototype.equals = function(v2)
{
    return Vec2.bufferEquals(this.buffer, 0, v2.buffer, 0);
};

Vec2.prototype.add = function(v2A, v2B)
{
    Vec2.bufferAdd(this.buffer, 0, v2A.buffer, 0, v2B.buffer, 0);
    return this;
};

Vec2.prototype.addInPlace = function(v2)
{
    Vec2.bufferAddInPlace(this.buffer, 0, v2.buffer, 0);
    return this;
};

Vec2.prototype.substract = function(v2A, v2B)
{
    Vec2.bufferSubstract(this.buffer, 0, v2A.buffer, 0, v2B.buffer, 0);
    return this;
};

Vec2.prototype.substractInPlace = function(v2)
{
    Vec2.bufferSubstractInPlace(this.buffer, 0, v2.buffer, 0);
    return this;
};

Vec2.prototype.scale = function(scale, v2)
{
    Vec2.bufferScale(this.buffer, 0, scale, v2.buffer, 0);
    return this;
};

Vec2.prototype.scaleInPlace = function(scale)
{
    Vec2.bufferScaleInPlace(this.buffer, 0, scale);
    return this;
};

Vec2.prototype.addScaled = function(v2A, scale, v2B)
{
    Vec2.bufferAddScaled(this.buffer, 0, v2A.buffer, 0, scale, v2B.buffer, 0);
    return this;
};

Vec2.prototype.addScaledInPlace = function(scale, v2)
{
    Vec2.bufferAddScaledInPlace(this.buffer, 0, scale, v2.buffer, 0);
    return this;
};

Vec2.prototype.negate = function(v2)
{
    Vec2.bufferNegate(this.buffer, 0, v2.buffer, 0);
    return this;
};

Vec2.prototype.negateInPlace = function()
{
    Vec2.bufferNegate(this.buffer, 0, this.buffer, 0);
    return this;
};

Vec2.prototype.squareDistance = function(v2)
{
    return Vec2.bufferSquareDistance(this.buffer, 0, v2.buffer, 0);
};

Vec2.prototype.distance = function(v2)
{
    return Vec2.bufferDistance(this.buffer, 0, v2.buffer, 0);
};

Vec2.prototype.squareNorm = function()
{
    return Vec2.bufferSquareNorm(this.buffer, 0);
};

Vec2.prototype.norm = function()
{
    return Vec2.bufferNorm(this.buffer, 0);
};

Vec2.prototype.normalize = function(v2)
{
    Vec2.bufferNormalize(this.buffer, 0, v2.buffer, 0);
    return this;
};

Vec2.prototype.normalizeInPlace = function()
{
    Vec2.bufferNormalize(this.buffer, 0, this.buffer, 0);
    return this;
};

Vec2.prototype.dotProduct = function(v2)
{
    return Vec2.bufferDotProduct(this.buffer, 0, v2.buffer, 0);
};

Vec2.prototype.shortestAngle = function(v2)
{
    return Vec2.bufferShortestAngle(this.buffer, 0, v2.buffer, 0);
};

Vec2.prototype.isPerpendicular = function(v2)
{
    return Vec2.bufferArePerpendicular(this.buffer, 0, v2.buffer, 0);
};

Vec2.prototype.isColinear = function(v2)
{
    return Vec2.bufferAreColinear(this.buffer, 0, v2.buffer, 0);
};

Vec2.prototype.linear = function(p0, t, p1)
{
    Vec2.bufferLinear(this.buffer, 0, p0.buffer, 0, t, p1.buffer, 0);
    return this;
};

Vec2.prototype.quadratic = function(p0, p1, t, p2)
{
    Vec2.bufferQuadratic(this.buffer, 0, p0.buffer, 0, p1.buffer, 0, t, p2.buffer, 0);
    return this;
};

Vec2.prototype.hermite = function(tan0, p0, t, p1, tan1)
{
    Vec2.bufferHermite(this.buffer, 0, tan0.buffer, 0, p0.buffer, 0, t, p1.buffer, 0, tan1.buffer, 0);
    return this;
};

Vec2.prototype.bezier = function(ctrl0, p0, t, p1, ctrl1)
{
    Vec2.bufferBezier(this.buffer, 0, ctrl0.buffer, 0, p0.buffer, 0, t, p1.buffer, 0, ctrl1.buffer, 0);
    return this;
};

Vec2.prototype.catmullRom = function(p0, p1, t, p2, p3)
{
    Vec2.bufferCatmullRom(this.buffer, 0, p0.buffer, 0, p1.buffer, 0, t, p2.buffer, 0, p3.buffer, 0);
    return this;
};

//MUST be considered as constants
Vec2.NB_COMPONENTS = 2;
Vec2.I = new Vec2().setFromValues(1.0, 0.0);
Vec2.J = new Vec2().setFromValues(0.0, 1.0);

Vec2.createBuffer = function(nbElems)
{
    //Always initialized to 0
    return new Float32Array(2 * nbElems);
};

Vec2.bufferIsNull = function(inBuffer, inOffset)
{
    return ((math.abs(inBuffer[inOffset]) < math.EPSILON) &&
        (math.abs(inBuffer[inOffset + 1]) < math.EPSILON));
};

Vec2.bufferEquals = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    return (((inBufferA === inBufferB) && (inOffsetA === inOffsetB)) ||
        ((math.abs(inBufferB[inOffsetB] - inBufferA[inOffsetA]) < math.EPSILON) &&
            (math.abs(inBufferB[inOffsetB + 1] - inBufferA[inOffsetA + 1]) < math.EPSILON)));
};

Vec2.bufferAdd = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    outBuffer[outOffset] = inBufferA[inOffsetA] + inBufferB[inOffsetB];
    outBuffer[outOffset + 1] = inBufferA[inOffsetA + 1] + inBufferB[inOffsetB + 1];

    return outBuffer;
};

Vec2.bufferAddInPlace = function(outBuffer, outOffset, inBuffer, inOffset)
{
    outBuffer[outOffset] += inBuffer[inOffset];
    outBuffer[outOffset + 1] += inBuffer[inOffset + 1];

    return outBuffer;
};

Vec2.bufferSubstract = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    outBuffer[outOffset] = inBufferA[inOffsetA] - inBufferB[inOffsetB];
    outBuffer[outOffset + 1] = inBufferA[inOffsetA + 1] - inBufferB[inOffsetB + 1];

    return outBuffer;
};

Vec2.bufferSubstractInPlace = function(outBuffer, outOffset, inBuffer, inOffset)
{
    outBuffer[outOffset] -= inBuffer[inOffset];
    outBuffer[outOffset + 1] -= inBuffer[inOffset + 1];

    return outBuffer;
};

Vec2.bufferScale = function(outBuffer, outOffset, scale, inBuffer, inOffset)
{
    outBuffer[outOffset] = scale * inBuffer[inOffset];
    outBuffer[outOffset + 1] = scale * inBuffer[inOffset + 1];

    return outBuffer;
};

Vec2.bufferScaleInPlace = function(outBuffer, outOffset, scale)
{
    outBuffer[outOffset] *= scale;
    outBuffer[outOffset + 1] *= scale;

    return outBuffer;
};

Vec2.bufferAddScaled = function(outBuffer, outOffset, inBufferA, inOffsetA, scale, inBufferB, inOffsetB)
{
    outBuffer[outOffset] = inBufferA[inOffsetA] + scale * inBufferB[inOffsetB];
    outBuffer[outOffset + 1] = inBufferA[inOffsetA + 1] + scale * inBufferB[inOffsetB + 1];

    return outBuffer;
};

Vec2.bufferAddScaledInPlace = function(outBuffer, outOffset, scale, inBuffer, inOffset)
{
    outBuffer[outOffset] += scale * inBuffer[inOffset];
    outBuffer[outOffset + 1] += scale * inBuffer[inOffset + 1];

    return outBuffer;
};

Vec2.bufferNegate = function(outBuffer, outOffset, inBuffer, inOffset)
{
    outBuffer[outOffset] = -inBuffer[inOffset];
    outBuffer[outOffset + 1] = -inBuffer[inOffset + 1];

    return outBuffer;
};

Vec2.bufferSquareDistance = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var x = inBufferB[inOffsetB] - inBufferA[inOffsetA],
        y = inBufferB[inOffsetB + 1] - inBufferA[inOffsetA + 1];

    return x * x + y * y;
};

Vec2.bufferDistance = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var x = inBufferB[inOffsetB] - inBufferA[inOffsetA],
        y = inBufferB[inOffsetB + 1] - inBufferA[inOffsetA + 1];

    return math.sqrt(x * x + y * y);
};

Vec2.bufferSquareNorm = function(inBuffer, inOffset)
{
    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1];

    return x * x + y * y;
};

Vec2.bufferNorm = function(inBuffer, inOffset)
{
    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1];

    return math.sqrt(x * x + y * y);
};

Vec2.bufferNormalize = function(outBuffer, outOffset, inBuffer, inOffset)
{
    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1],
        n = x * x + y * y;

    if (n < math.EPSILON2)
    {
        outBuffer[outOffset] = outBuffer[outOffset + 1] = 0.0;
        return outBuffer;
    }

    n = 1.0 / math.sqrt(n);
    outBuffer[outOffset] = x * n;
    outBuffer[outOffset + 1] = y * n;

    return outBuffer;
};

Vec2.bufferDotProduct = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    return inBufferA[inOffsetA] * inBufferB[inOffsetB] +
        inBufferA[inOffsetA + 1] * inBufferB[inOffsetB + 1];
};

Vec2.bufferShortestAngle = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var xa = inBufferA[inOffsetA],
        ya = inBufferA[inOffsetA + 1],
        na = xa * xa + ya * ya;

    if (na < math.EPSILON2)
    {
        return 0.0;
    }

    var xb = inBufferB[inOffsetB],
        yb = inBufferB[inOffsetB + 1],
        nb = xb * xb + yb * yb;

    if (nb < math.EPSILON2)
    {
        return 0.0;
    }

    var dot = xa * xb + ya * yb;
    if (math.abs(dot) < math.EPSILON)
    {
        return math.HALF_PI;
    }

    dot /= math.sqrt(na * nb);
    if (dot > 1.0 - math.EPSILON)
    {
        return 0.0;
    }
    else if (dot < math.EPSILON - 1.0)
    {
        return math.PI;
    }
    else
    {
        return math.acos(dot);
    }
};

Vec2.bufferArePerpendicular = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var xa = inBufferA[inOffsetA],
        ya = inBufferA[inOffsetA + 1],
        xb = inBufferB[inOffsetB],
        yb = inBufferB[inOffsetB + 1];

    return (((math.abs(xa) >= math.EPSILON) ||
        (math.abs(ya) >= math.EPSILON)) &&
        ((math.abs(xb) >= math.EPSILON) ||
            (math.abs(yb) >= math.EPSILON)) &&
        (math.abs(xa * xb + ya * yb) < math.EPSILON));
};

Vec2.bufferAreColinear = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var xa = inBufferA[inOffsetA],
        ya = inBufferA[inOffsetA + 1],
        xb = inBufferB[inOffsetB],
        yb = inBufferB[inOffsetB + 1];

    return (((math.abs(xa) >= math.EPSILON) ||
        (math.abs(ya) >= math.EPSILON)) &&
        ((math.abs(xb) >= math.EPSILON) ||
            (math.abs(yb) >= math.EPSILON)) &&
        (math.abs(xa * yb - xb * ya) < math.EPSILON));
};

Vec2.bufferLinear = function(outBuffer, outOffset, inBufferP0, inOffsetP0, t, inBufferP1, inOffsetP1)
{
    var x = inBufferP0[inOffsetP0],
        y = inBufferP0[inOffsetP0 + 1];

    outBuffer[outOffset] = x + t * (inBufferP1[inOffsetP1] - x);
    outBuffer[outOffset + 1] = y + t * (inBufferP1[inOffsetP1 + 1] - y);

    return outBuffer;
};

Vec2.bufferQuadratic = function(outBuffer, outOffset, inBufferP0, inOffsetP0, inBufferP1, inOffsetP1, t, inBufferP2, inOffsetP2)
{
    //Interpolation is between points P1 and P2
    var f0 = 0.5 * (t - 1.0) * t,
        f1 = 1.0 - t * t,
        f2 = 0.5 * (t + 1.0) * t;

    outBuffer[outOffset] = f0 * inBufferP0[inOffsetP0] + f1 * inBufferP1[inOffsetP1] + f2 * inBufferP2[inOffsetP2];
    outBuffer[outOffset + 1] = f0 * inBufferP0[inOffsetP0 + 1] + f1 * inBufferP1[inOffsetP1 + 1] + f2 * inBufferP2[inOffsetP2 + 1];

    return outBuffer;
};

Vec2.bufferHermite = function(outBuffer, outOffset, inBufferT0, inOffsetT0, inBufferP0, inOffsetP0, t, inBufferP1, inOffsetP1, inBufferT1, inOffsetT1)
{
    //Ti is the tangent at point Pi
    var tt = t * t,
        f0 = tt * (t - 2.0) + t,
        f1 = tt * (2.0 * t - 3.0) + 1.0,
        f2 = tt * (3.0 - 2.0 * t),
        f3 = tt * (t - 1.0);

    outBuffer[outOffset] = f0 * inBufferT0[inOffsetT0] + f1 * inBufferP0[inOffsetP0] + f2 * inBufferP1[inOffsetP1] + f3 * inBufferT1[inOffsetT1];
    outBuffer[outOffset + 1] = f0 * inBufferT0[inOffsetT0 + 1] + f1 * inBufferP0[inOffsetP0 + 1] + f2 * inBufferP1[inOffsetP1 + 1] + f3 * inBufferT1[inOffsetT1 + 1];

    return outBuffer;
};

Vec2.bufferBezier = function(outBuffer, outOffset, inBufferC0, inOffsetC0, inBufferP0, inOffsetP0, t, inBufferP1, inOffsetP1, inBufferC1, inOffsetC1)
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

    return outBuffer;
};

Vec2.bufferCatmullRom = function(outBuffer, outOffset, inBufferP0, inOffsetP0, inBufferP1, inOffsetP1, t, inBufferP2, inOffsetP2, inBufferP3, inOffsetP3)
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

    return outBuffer;
};
