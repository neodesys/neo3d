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

var Vec3 = module.exports = function()
{
    //Always initialized to 0
    this.buffer = new Float32Array(3);
};

Vec3.prototype.setFromValues = function(x, y, z)
{
    this.buffer[0] = x;
    this.buffer[1] = y;
    this.buffer[2] = z;

    return this;
};

Vec3.prototype.setFromArray = function(arr)
{
    this.buffer[0] = arr[0];
    this.buffer[1] = arr[1];
    this.buffer[2] = arr[2];

    return this;
};

Vec3.prototype.setFromVec2Pos = function(v2)
{
    this.buffer[0] = v2.buffer[0];
    this.buffer[1] = v2.buffer[1];
    this.buffer[2] = 1.0;

    return this;
};

Vec3.prototype.setFromVec2Dir = function(v2)
{
    this.buffer[0] = v2.buffer[0];
    this.buffer[1] = v2.buffer[1];
    this.buffer[2] = 0.0;

    return this;
};

Vec3.prototype.setNull = function()
{
    this.buffer[0] = this.buffer[1] = this.buffer[2] = 0.0;
    return this;
};

Vec3.prototype.setOne = function()
{
    this.buffer[0] = this.buffer[1] = this.buffer[2] = 1.0;
    return this;
};

Vec3.prototype.copy = function(v3)
{
    this.buffer[0] = v3.buffer[0];
    this.buffer[1] = v3.buffer[1];
    this.buffer[2] = v3.buffer[2];

    return this;
};

Vec3.prototype.isNull = function()
{
    return Vec3.bufferIsNull(this.buffer, 0);
};

Vec3.prototype.equals = function(v3)
{
    return Vec3.bufferEquals(this.buffer, 0, v3.buffer, 0);
};

Vec3.prototype.add = function(v3A, v3B)
{
    Vec3.bufferAdd(this.buffer, 0, v3A.buffer, 0, v3B.buffer, 0);
    return this;
};

Vec3.prototype.addInPlace = function(v3)
{
    Vec3.bufferAddInPlace(this.buffer, 0, v3.buffer, 0);
    return this;
};

Vec3.prototype.substract = function(v3A, v3B)
{
    Vec3.bufferSubstract(this.buffer, 0, v3A.buffer, 0, v3B.buffer, 0);
    return this;
};

Vec3.prototype.substractInPlace = function(v3)
{
    Vec3.bufferSubstractInPlace(this.buffer, 0, v3.buffer, 0);
    return this;
};

Vec3.prototype.scale = function(scale, v3)
{
    Vec3.bufferScale(this.buffer, 0, scale, v3.buffer, 0);
    return this;
};

Vec3.prototype.scaleInPlace = function(scale)
{
    Vec3.bufferScaleInPlace(this.buffer, 0, scale);
    return this;
};

Vec3.prototype.addScaled = function(v3A, scale, v3B)
{
    Vec3.bufferAddScaled(this.buffer, 0, v3A.buffer, 0, scale, v3B.buffer, 0);
    return this;
};

Vec3.prototype.addScaledInPlace = function(scale, v3)
{
    Vec3.bufferAddScaledInPlace(this.buffer, 0, scale, v3.buffer, 0);
    return this;
};

Vec3.prototype.negate = function(v3)
{
    Vec3.bufferNegate(this.buffer, 0, v3.buffer, 0);
    return this;
};

Vec3.prototype.negateInPlace = function()
{
    Vec3.bufferNegate(this.buffer, 0, this.buffer, 0);
    return this;
};

Vec3.prototype.squareDistance = function(v3)
{
    return Vec3.bufferSquareDistance(this.buffer, 0, v3.buffer, 0);
};

Vec3.prototype.distance = function(v3)
{
    return Vec3.bufferDistance(this.buffer, 0, v3.buffer, 0);
};

Vec3.prototype.squareNorm = function()
{
    return Vec3.bufferSquareNorm(this.buffer, 0);
};

Vec3.prototype.norm = function()
{
    return Vec3.bufferNorm(this.buffer, 0);
};

Vec3.prototype.normalize = function(v3)
{
    Vec3.bufferNormalize(this.buffer, 0, v3.buffer, 0);
    return this;
};

Vec3.prototype.normalizeInPlace = function()
{
    Vec3.bufferNormalize(this.buffer, 0, this.buffer, 0);
    return this;
};

Vec3.prototype.dotProduct = function(v3)
{
    return Vec3.bufferDotProduct(this.buffer, 0, v3.buffer, 0);
};

Vec3.prototype.crossProduct = function(v3A, v3B)
{
    Vec3.bufferCrossProduct(this.buffer, 0, v3A.buffer, 0, v3B.buffer, 0);
    return this;
};

Vec3.prototype.crossProductInPlace = function(v3)
{
    Vec3.bufferCrossProduct(this.buffer, 0, this.buffer, 0, v3.buffer, 0);
    return this;
};

Vec3.prototype.shortestAngle = function(v3)
{
    return Vec3.bufferShortestAngle(this.buffer, 0, v3.buffer, 0);
};

Vec3.prototype.isPerpendicular = function(v3)
{
    return Vec3.bufferArePerpendicular(this.buffer, 0, v3.buffer, 0);
};

Vec3.prototype.isColinear = function(v3)
{
    return Vec3.bufferAreColinear(this.buffer, 0, v3.buffer, 0);
};

Vec3.prototype.linear = function(p0, t, p1)
{
    Vec3.bufferLinear(this.buffer, 0, p0.buffer, 0, t, p1.buffer, 0);
    return this;
};

Vec3.prototype.quadratic = function(p0, p1, t, p2)
{
    Vec3.bufferQuadratic(this.buffer, 0, p0.buffer, 0, p1.buffer, 0, t, p2.buffer, 0);
    return this;
};

Vec3.prototype.hermite = function(tan0, p0, t, p1, tan1)
{
    Vec3.bufferHermite(this.buffer, 0, tan0.buffer, 0, p0.buffer, 0, t, p1.buffer, 0, tan1.buffer, 0);
    return this;
};

Vec3.prototype.bezier = function(ctrl0, p0, t, p1, ctrl1)
{
    Vec3.bufferBezier(this.buffer, 0, ctrl0.buffer, 0, p0.buffer, 0, t, p1.buffer, 0, ctrl1.buffer, 0);
    return this;
};

Vec3.prototype.catmullRom = function(p0, p1, t, p2, p3)
{
    Vec3.bufferCatmullRom(this.buffer, 0, p0.buffer, 0, p1.buffer, 0, t, p2.buffer, 0, p3.buffer, 0);
    return this;
};

//MUST be considered as constants
Vec3.NB_COMPONENTS = 3;
Vec3.I = new Vec3().setFromValues(1.0, 0.0, 0.0);
Vec3.J = new Vec3().setFromValues(0.0, 1.0, 0.0);
Vec3.K = new Vec3().setFromValues(0.0, 0.0, 1.0);

Vec3.createBuffer = function(nbElems)
{
    //Always initialized to 0
    return new Float32Array(3 * nbElems);
};

Vec3.bufferIsNull = function(inBuffer, inOffset)
{
    return ((math.abs(inBuffer[inOffset]) < math.EPSILON) &&
        (math.abs(inBuffer[inOffset + 1]) < math.EPSILON) &&
        (math.abs(inBuffer[inOffset + 2]) < math.EPSILON));
};

Vec3.bufferEquals = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    return (((inBufferA === inBufferB) && (inOffsetA === inOffsetB)) ||
        ((math.abs(inBufferB[inOffsetB] - inBufferA[inOffsetA]) < math.EPSILON) &&
            (math.abs(inBufferB[inOffsetB + 1] - inBufferA[inOffsetA + 1]) < math.EPSILON) &&
            (math.abs(inBufferB[inOffsetB + 2] - inBufferA[inOffsetA + 2]) < math.EPSILON)));
};

Vec3.bufferAdd = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    outBuffer[outOffset] = inBufferA[inOffsetA] + inBufferB[inOffsetB];
    outBuffer[outOffset + 1] = inBufferA[inOffsetA + 1] + inBufferB[inOffsetB + 1];
    outBuffer[outOffset + 2] = inBufferA[inOffsetA + 2] + inBufferB[inOffsetB + 2];

    return outBuffer;
};

Vec3.bufferAddInPlace = function(outBuffer, outOffset, inBuffer, inOffset)
{
    outBuffer[outOffset] += inBuffer[inOffset];
    outBuffer[outOffset + 1] += inBuffer[inOffset + 1];
    outBuffer[outOffset + 2] += inBuffer[inOffset + 2];

    return outBuffer;
};

Vec3.bufferSubstract = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    outBuffer[outOffset] = inBufferA[inOffsetA] - inBufferB[inOffsetB];
    outBuffer[outOffset + 1] = inBufferA[inOffsetA + 1] - inBufferB[inOffsetB + 1];
    outBuffer[outOffset + 2] = inBufferA[inOffsetA + 2] - inBufferB[inOffsetB + 2];

    return outBuffer;
};

Vec3.bufferSubstractInPlace = function(outBuffer, outOffset, inBuffer, inOffset)
{
    outBuffer[outOffset] -= inBuffer[inOffset];
    outBuffer[outOffset + 1] -= inBuffer[inOffset + 1];
    outBuffer[outOffset + 2] -= inBuffer[inOffset + 2];

    return outBuffer;
};

Vec3.bufferScale = function(outBuffer, outOffset, scale, inBuffer, inOffset)
{
    outBuffer[outOffset] = scale * inBuffer[inOffset];
    outBuffer[outOffset + 1] = scale * inBuffer[inOffset + 1];
    outBuffer[outOffset + 2] = scale * inBuffer[inOffset + 2];

    return outBuffer;
};

Vec3.bufferScaleInPlace = function(outBuffer, outOffset, scale)
{
    outBuffer[outOffset] *= scale;
    outBuffer[outOffset + 1] *= scale;
    outBuffer[outOffset + 2] *= scale;

    return outBuffer;
};

Vec3.bufferAddScaled = function(outBuffer, outOffset, inBufferA, inOffsetA, scale, inBufferB, inOffsetB)
{
    outBuffer[outOffset] = inBufferA[inOffsetA] + scale * inBufferB[inOffsetB];
    outBuffer[outOffset + 1] = inBufferA[inOffsetA + 1] + scale * inBufferB[inOffsetB + 1];
    outBuffer[outOffset + 2] = inBufferA[inOffsetA + 2] + scale * inBufferB[inOffsetB + 2];

    return outBuffer;
};

Vec3.bufferAddScaledInPlace = function(outBuffer, outOffset, scale, inBuffer, inOffset)
{
    outBuffer[outOffset] += scale * inBuffer[inOffset];
    outBuffer[outOffset + 1] += scale * inBuffer[inOffset + 1];
    outBuffer[outOffset + 2] += scale * inBuffer[inOffset + 2];

    return outBuffer;
};

Vec3.bufferNegate = function(outBuffer, outOffset, inBuffer, inOffset)
{
    outBuffer[outOffset] = -inBuffer[inOffset];
    outBuffer[outOffset + 1] = -inBuffer[inOffset + 1];
    outBuffer[outOffset + 2] = -inBuffer[inOffset + 2];

    return outBuffer;
};

Vec3.bufferSquareDistance = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var x = inBufferB[inOffsetB] - inBufferA[inOffsetA],
        y = inBufferB[inOffsetB + 1] - inBufferA[inOffsetA + 1],
        z = inBufferB[inOffsetB + 2] - inBufferA[inOffsetA + 2];

    return x * x + y * y + z * z;
};

Vec3.bufferDistance = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var x = inBufferB[inOffsetB] - inBufferA[inOffsetA],
        y = inBufferB[inOffsetB + 1] - inBufferA[inOffsetA + 1],
        z = inBufferB[inOffsetB + 2] - inBufferA[inOffsetA + 2];

    return math.sqrt(x * x + y * y + z * z);
};

Vec3.bufferSquareNorm = function(inBuffer, inOffset)
{
    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1],
        z = inBuffer[inOffset + 2];

    return x * x + y * y + z * z;
};

Vec3.bufferNorm = function(inBuffer, inOffset)
{
    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1],
        z = inBuffer[inOffset + 2];

    return math.sqrt(x * x + y * y + z * z);
};

Vec3.bufferNormalize = function(outBuffer, outOffset, inBuffer, inOffset)
{
    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1],
        z = inBuffer[inOffset + 2],
        n = x * x + y * y + z * z;

    if (n < math.EPSILON2)
    {
        outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
        return outBuffer;
    }

    n = 1.0 / math.sqrt(n);
    outBuffer[outOffset] = x * n;
    outBuffer[outOffset + 1] = y * n;
    outBuffer[outOffset + 2] = z * n;

    return outBuffer;
};

Vec3.bufferDotProduct = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    return inBufferA[inOffsetA] * inBufferB[inOffsetB] +
        inBufferA[inOffsetA + 1] * inBufferB[inOffsetB + 1] +
        inBufferA[inOffsetA + 2] * inBufferB[inOffsetB + 2];
};

Vec3.bufferCrossProduct = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var xa = inBufferA[inOffsetA],
        ya = inBufferA[inOffsetA + 1],
        za = inBufferA[inOffsetA + 2],
        xb = inBufferB[inOffsetB],
        yb = inBufferB[inOffsetB + 1],
        zb = inBufferB[inOffsetB + 2];

    outBuffer[outOffset] = ya * zb - yb * za;
    outBuffer[outOffset + 1] = za * xb - zb * xa;
    outBuffer[outOffset + 2] = xa * yb - xb * ya;

    return outBuffer;
};

Vec3.bufferShortestAngle = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var xa = inBufferA[inOffsetA],
        ya = inBufferA[inOffsetA + 1],
        za = inBufferA[inOffsetA + 2],
        na = xa * xa + ya * ya + za * za;

    if (na < math.EPSILON2)
    {
        return 0.0;
    }

    var xb = inBufferB[inOffsetB],
        yb = inBufferB[inOffsetB + 1],
        zb = inBufferB[inOffsetB + 2],
        nb = xb * xb + yb * yb + zb * zb;

    if (nb < math.EPSILON2)
    {
        return 0.0;
    }

    var dot = xa * xb + ya * yb + za * zb;
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

Vec3.bufferArePerpendicular = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var xa = inBufferA[inOffsetA],
        ya = inBufferA[inOffsetA + 1],
        za = inBufferA[inOffsetA + 2],
        xb = inBufferB[inOffsetB],
        yb = inBufferB[inOffsetB + 1],
        zb = inBufferB[inOffsetB + 2];

    return (((math.abs(xa) >= math.EPSILON) ||
        (math.abs(ya) >= math.EPSILON) ||
        (math.abs(za) >= math.EPSILON)) &&
        ((math.abs(xb) >= math.EPSILON) ||
            (math.abs(yb) >= math.EPSILON) ||
            (math.abs(zb) >= math.EPSILON)) &&
        (math.abs(xa * xb + ya * yb + za * zb) < math.EPSILON));
};

Vec3.bufferAreColinear = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var xa = inBufferA[inOffsetA],
        ya = inBufferA[inOffsetA + 1],
        za = inBufferA[inOffsetA + 2],
        xb = inBufferB[inOffsetB],
        yb = inBufferB[inOffsetB + 1],
        zb = inBufferB[inOffsetB + 2];

    return (((math.abs(xa) >= math.EPSILON) ||
        (math.abs(ya) >= math.EPSILON) ||
        (math.abs(za) >= math.EPSILON)) &&
        ((math.abs(xb) >= math.EPSILON) ||
            (math.abs(yb) >= math.EPSILON) ||
            (math.abs(zb) >= math.EPSILON)) &&
        (math.abs(ya * zb - yb * za) < math.EPSILON) &&
        (math.abs(za * xb - zb * xa) < math.EPSILON) &&
        (math.abs(xa * yb - xb * ya) < math.EPSILON));
};

Vec3.bufferLinear = function(outBuffer, outOffset, inBufferP0, inOffsetP0, t, inBufferP1, inOffsetP1)
{
    var x = inBufferP0[inOffsetP0],
        y = inBufferP0[inOffsetP0 + 1],
        z = inBufferP0[inOffsetP0 + 2];

    outBuffer[outOffset] = x + t * (inBufferP1[inOffsetP1] - x);
    outBuffer[outOffset + 1] = y + t * (inBufferP1[inOffsetP1 + 1] - y);
    outBuffer[outOffset + 2] = z + t * (inBufferP1[inOffsetP1 + 2] - z);

    return outBuffer;
};

Vec3.bufferQuadratic = function(outBuffer, outOffset, inBufferP0, inOffsetP0, inBufferP1, inOffsetP1, t, inBufferP2, inOffsetP2)
{
    //Interpolation is between points P1 and P2
    var f0 = 0.5 * (t - 1.0) * t,
        f1 = 1.0 - t * t,
        f2 = 0.5 * (t + 1.0) * t;

    outBuffer[outOffset] = f0 * inBufferP0[inOffsetP0] + f1 * inBufferP1[inOffsetP1] + f2 * inBufferP2[inOffsetP2];
    outBuffer[outOffset + 1] = f0 * inBufferP0[inOffsetP0 + 1] + f1 * inBufferP1[inOffsetP1 + 1] + f2 * inBufferP2[inOffsetP2 + 1];
    outBuffer[outOffset + 2] = f0 * inBufferP0[inOffsetP0 + 2] + f1 * inBufferP1[inOffsetP1 + 2] + f2 * inBufferP2[inOffsetP2 + 2];

    return outBuffer;
};

Vec3.bufferHermite = function(outBuffer, outOffset, inBufferT0, inOffsetT0, inBufferP0, inOffsetP0, t, inBufferP1, inOffsetP1, inBufferT1, inOffsetT1)
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

    return outBuffer;
};

Vec3.bufferBezier = function(outBuffer, outOffset, inBufferC0, inOffsetC0, inBufferP0, inOffsetP0, t, inBufferP1, inOffsetP1, inBufferC1, inOffsetC1)
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

    return outBuffer;
};

Vec3.bufferCatmullRom = function(outBuffer, outOffset, inBufferP0, inOffsetP0, inBufferP1, inOffsetP1, t, inBufferP2, inOffsetP2, inBufferP3, inOffsetP3)
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

    return outBuffer;
};
