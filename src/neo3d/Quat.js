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
var Vec4 = require("./Vec4");

var Quat = module.exports = function()
{
    //Always initialized to 0
    this.buffer = new Float32Array(4);
    this.buffer[3] = 1.0;
};

Quat.prototype.setFromValues = function(x, y, z, w)
{
    this.buffer[0] = x;
    this.buffer[1] = y;
    this.buffer[2] = z;
    this.buffer[3] = w;

    return this;
};

Quat.prototype.setFromArray = function(arr)
{
    this.buffer[0] = arr[0];
    this.buffer[1] = arr[1];
    this.buffer[2] = arr[2];
    this.buffer[3] = arr[3];

    return this;
};

Quat.prototype.setFromAxisAndAngle = function(v3, angle)
{
    Quat.bufferSetFromAxisAndAngle(this.buffer, 0, v3.buffer, 0, angle);
    return this;
};

Quat.prototype.setFromRotationTo = function(v3Start, v3End)
{
    Quat.bufferSetFromRotationTo(this.buffer, 0, v3Start.buffer, 0, v3End.buffer, 0);
    return this;
};

Quat.prototype.setFromRotationMat3 = function(m3)
{
    //m3 must be a pure 3x3 rotation matrix
    Quat.bufferSetFromRotationMat3(this.buffer, 0, m3.buffer, 0);
    return this;
};

Quat.prototype.setFromRotationMat4 = function(m4)
{
    //m4 upper-left 3x3 sub-matrix must be a pure rotation matrix
    Quat.bufferSetFromRotationMat4(this.buffer, 0, m4.buffer, 0);
    return this;
};

Quat.prototype.setIdentity = function()
{
    this.buffer[0] = this.buffer[1] = this.buffer[2] = 0.0;
    this.buffer[3] = 1.0;

    return this;
};

Quat.prototype.copy = function(q)
{
    this.buffer[0] = q.buffer[0];
    this.buffer[1] = q.buffer[1];
    this.buffer[2] = q.buffer[2];
    this.buffer[3] = q.buffer[3];

    return this;
};

Quat.prototype.getAxisAndAngle = function(v3)
{
    return Quat.bufferGetAxisAndAngle(v3.buffer, 0, this.buffer, 0);
};

Quat.prototype.isNull = function()
{
    return Quat.bufferIsNull(this.buffer, 0);
};

Quat.prototype.isIdentity = function()
{
    return Quat.bufferIsIdentity(this.buffer, 0);
};

Quat.prototype.equals = function(q)
{
    return Quat.bufferEquals(this.buffer, 0, q.buffer, 0);
};

Quat.prototype.fastRotationEquals = function(q)
{
    //Only valid for unit quaternions or quaternions with the same magnitude
    return Quat.bufferFastRotationEquals(this.buffer, 0, q.buffer, 0);
};

Quat.prototype.rotationEquals = function(q)
{
    return Quat.bufferRotationEquals(this.buffer, 0, q.buffer, 0);
};

Quat.prototype.scale = function(scale, q)
{
    Quat.bufferScale(this.buffer, 0, scale, q.buffer, 0);
    return this;
};

Quat.prototype.scaleInPlace = function(scale)
{
    Quat.bufferScaleInPlace(this.buffer, 0, scale);
    return this;
};

Quat.prototype.negate = function(q)
{
    Quat.bufferNegate(this.buffer, 0, q.buffer, 0);
    return this;
};

Quat.prototype.negateInPlace = function()
{
    Quat.bufferNegate(this.buffer, 0, this.buffer, 0);
    return this;
};

Quat.prototype.conjugate = function(q)
{
    Quat.bufferConjugate(this.buffer, 0, q.buffer, 0);
    return this;
};

Quat.prototype.conjugateInPlace = function()
{
    Quat.bufferConjugate(this.buffer, 0, this.buffer, 0);
    return this;
};

Quat.prototype.multiply = function(qA, qB)
{
    Quat.bufferMultiply(this.buffer, 0, qA.buffer, 0, qB.buffer, 0);
    return this;
};

Quat.prototype.multiplyInPlace = function(q)
{
    Quat.bufferMultiply(this.buffer, 0, this.buffer, 0, q.buffer, 0);
    return this;
};

Quat.prototype.invert = function(q)
{
    Quat.bufferInvert(this.buffer, 0, q.buffer, 0);
    return this;
};

Quat.prototype.invertInPlace = function()
{
    Quat.bufferInvert(this.buffer, 0, this.buffer, 0);
    return this;
};

Quat.prototype.squareNorm = function()
{
    return Quat.bufferSquareNorm(this.buffer, 0);
};

Quat.prototype.norm = function()
{
    return Quat.bufferNorm(this.buffer, 0);
};

Quat.prototype.normalize = function(q)
{
    Quat.bufferNormalize(this.buffer, 0, q.buffer, 0);
    return this;
};

Quat.prototype.normalizeInPlace = function()
{
    Quat.bufferNormalize(this.buffer, 0, this.buffer, 0);
    return this;
};

Quat.prototype.dotProduct = function(q)
{
    return Quat.bufferDotProduct(this.buffer, 0, q.buffer, 0);
};

Quat.prototype.log = function(q)
{
    Quat.bufferLog(this.buffer, 0, q.buffer, 0);
    return this;
};

Quat.prototype.logInPlace = function()
{
    Quat.bufferLog(this.buffer, 0, this.buffer, 0);
    return this;
};

Quat.prototype.exp = function(q)
{
    Quat.bufferExp(this.buffer, 0, q.buffer, 0);
    return this;
};

Quat.prototype.expInPlace = function()
{
    Quat.bufferExp(this.buffer, 0, this.buffer, 0);
    return this;
};

Quat.prototype.pow = function(q, p)
{
    Quat.bufferPow(this.buffer, 0, q.buffer, 0, p);
    return this;
};

Quat.prototype.powInPlace = function(p)
{
    Quat.bufferPow(this.buffer, 0, this.buffer, 0, p);
    return this;
};

Quat.prototype.transformVec3 = function(outV3, inV3)
{
    //This quaternion must be a unit quaternion
    Quat.bufferTransformVec3(outV3.buffer, 0, this.buffer, 0, inV3.buffer, 0);
    return outV3;
};

Quat.prototype.transformVec3InPlace = function(v3)
{
    //This quaternion must be a unit quaternion
    Quat.bufferTransformVec3(v3.buffer, 0, this.buffer, 0, v3.buffer, 0);
    return v3;
};

Quat.prototype.lerp = function(q0, t, q1)
{
    Quat.bufferLerp(this.buffer, 0, q0.buffer, 0, t, q1.buffer, 0);
    return this;
};

Quat.prototype.slerp = function(q0, t, q1)
{
    //q0 and q1 must be unit quaternions
    Quat.bufferSlerp(this.buffer, 0, q0.buffer, 0, t, q1.buffer, 0);
    return this;
};

Quat.prototype.squad = function(s0, q0, t, q1, s1)
{
    //s0, q0, q1 and s1 must be unit quaternions
    Quat.bufferSquad(this.buffer, 0, s0.buffer, 0, q0.buffer, 0, t, q1.buffer, 0, s1.buffer, 0);
    return this;
};

Quat.prototype.computeSquadIntermediate = function(q0, q1, q2)
{
    //Computes squad intermediate for quaternion q1
    //q0, q1 and q2 must be unit quaternions
    //Computed intermediate quaternion is normalized to ensure stability
    Quat.bufferComputeSquadIntermediate(this.buffer, 0, q0.buffer, 0, q1.buffer, 0, q2.buffer, 0);
    return this;
};

//MUST be considered as constants
Quat.NB_COMPONENTS = 4;
Quat.IDENTITY = new Quat();

Quat.createBuffer = function(nbElems)
{
    nbElems *= 4;

    //Always initialized to 0
    var buffer = new Float32Array(nbElems);

    for (var i = 3; i < nbElems; i += 4)
    {
        buffer[i] = 1.0;
    }

    return buffer;
};

Quat.bufferIsNull = Vec4.bufferIsNull;
Quat.bufferEquals = Vec4.bufferEquals;
Quat.bufferScale = Vec4.bufferScale;
Quat.bufferScaleInPlace = Vec4.bufferScaleInPlace;
Quat.bufferNegate = Vec4.bufferNegate;
Quat.bufferSquareNorm = Vec4.bufferSquareNorm;
Quat.bufferNorm = Vec4.bufferNorm;
Quat.bufferNormalize = Vec4.bufferNormalize;
Quat.bufferDotProduct = Vec4.bufferDotProduct;
Quat.bufferLerp = Vec4.bufferLinear;

Quat.bufferSetFromAxisAndAngle = function(outBuffer, outOffset, inV3Buffer, inV3Offset, angle)
{
    var x = inV3Buffer[inV3Offset],
        y = inV3Buffer[inV3Offset + 1],
        z = inV3Buffer[inV3Offset + 2],
        n = x * x + y * y + z * z;

    if (n < math.EPSILON2)
    {
        //Rotation axis is a null-vector so q is Identity
        outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
        outBuffer[outOffset + 3] = 1.0;
        return outBuffer;
    }

    angle *= 0.5;
    n = math.sin(angle) / math.sqrt(n);

    outBuffer[outOffset] = x * n;
    outBuffer[outOffset + 1] = y * n;
    outBuffer[outOffset + 2] = z * n;
    outBuffer[outOffset + 3] = math.cos(angle);

    return outBuffer;
};

Quat.bufferSetFromRotationTo = function(outBuffer, outOffset, inV3StartBuffer, inV3StartOffset, inV3EndBuffer, inV3EndOffset)
{
    var x0 = inV3StartBuffer[inV3StartOffset],
        y0 = inV3StartBuffer[inV3StartOffset + 1],
        z0 = inV3StartBuffer[inV3StartOffset + 2],
        n0 = x0 * x0 + y0 * y0 + z0 * z0;

    if (n0 < math.EPSILON2)
    {
        //v3Start is a null-vector, thus transformation is the Identity
        //quaternion
        outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
        outBuffer[outOffset + 3] = 1.0;
        return outBuffer;
    }

    var x1 = inV3EndBuffer[inV3EndOffset],
        y1 = inV3EndBuffer[inV3EndOffset + 1],
        z1 = inV3EndBuffer[inV3EndOffset + 2],
        n1 = x1 * x1 + y1 * y1 + z1 * z1;

    if (n1 < math.EPSILON2)
    {
        //v3End is a null-vector, thus transformation is the Identity
        //quaternion
        outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
        outBuffer[outOffset + 3] = 1.0;
        return outBuffer;
    }

    n0 = 1.0 / math.sqrt(n0);
    x0 *= n0;
    y0 *= n0;
    z0 *= n0;

    n1 = 1.0 / math.sqrt(n1);
    x1 *= n1;
    y1 *= n1;
    z1 *= n1;

    var dot = x0 * x1 + y0 * y1 + z0 * z1,
        x = 0.0, y = 0.0, z = 0.0;

    if (dot > 1.0 - math.EPSILON)
    {
        //Angle between vectors (almost) equals 0, thus transformation is the
        //Identity quaternion
        outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
        outBuffer[outOffset + 3] = 1.0;
        return outBuffer;
    }

    if (dot < math.EPSILON - 1.0)
    {
        //Angle between vectors (almost) equals PI, thus cross product between
        //vectors is a null-vector, we have to search for the best suitable
        //perpendicular vector using successively Vec3.I ^ v3Start and
        //Vec3.J ^ v3Start (no need for Vec3.K ^ v3Start as
        //Vec3.K = Vec3.I ^ Vec3.J)
        y = -z0;
        z = y0;
        n0 = y * y + z * z;

        if (n0 < math.EPSILON2)
        {
            x = z0;
            y = 0.0;
            z = -x0;
            n0 = x * x + z * z;
        }

        n0 = 1.0 / math.sqrt(n0);
        outBuffer[outOffset] = x * n0;
        outBuffer[outOffset + 1] = y * n0;
        outBuffer[outOffset + 2] = z * n0;
        outBuffer[outOffset + 3] = 0.0;

        return outBuffer;
    }

    //-1 < dot < 1, so angle 'a' between vectors is such as: 0 < a < PI, thus
    //cross product between vectors is not a null-vector but the right rotation
    //axis
    x = y0 * z1 - z0 * y1;
    y = z0 * x1 - x0 * z1;
    z = x0 * y1 - y0 * x1;
    dot += 1.0;

    n0 = 1.0 / math.sqrt(x * x + y * y + z * z + dot * dot);
    outBuffer[outOffset] = x * n0;
    outBuffer[outOffset + 1] = y * n0;
    outBuffer[outOffset + 2] = z * n0;
    outBuffer[outOffset + 3] = dot * n0;

    return outBuffer;
};

Quat.bufferSetFromRotationMat3 = function(outBuffer, outOffset, inM3Buffer, inM3Offset)
{
    //m3 must be a pure 3x3 rotation matrix
    var trace = inM3Buffer[inM3Offset] + inM3Buffer[inM3Offset + 4] + inM3Buffer[inM3Offset + 8],
        f = 0.0;

    if (trace > 0.0)
    {
        f = math.sqrt(trace + 1.0);
        outBuffer[outOffset + 3] = 0.5 * f;

        f = 0.5 / f;
        outBuffer[outOffset] = (inM3Buffer[inM3Offset + 5] - inM3Buffer[inM3Offset + 7]) * f;
        outBuffer[outOffset + 1] = (inM3Buffer[inM3Offset + 6] - inM3Buffer[inM3Offset + 2]) * f;
        outBuffer[outOffset + 2] = (inM3Buffer[inM3Offset + 1] - inM3Buffer[inM3Offset + 3]) * f;
    }
    else
    {
        var i = 0;
        if (inM3Buffer[inM3Offset + 4] > inM3Buffer[inM3Offset])
        {
            i = 1;
        }

        if (inM3Buffer[inM3Offset + 8] > inM3Buffer[inM3Offset + 4 * i])
        {
            i = 2;
        }

        var j = (i + 1) % 3,
            k = (i + 2) % 3;

        f = math.sqrt(inM3Buffer[inM3Offset + 4 * i] - inM3Buffer[inM3Offset + 4 * j] - inM3Buffer[inM3Offset + 4 * k] + 1.0);
        outBuffer[outOffset + i] = 0.5 * f;

        f = 0.5 / f;
        outBuffer[outOffset + 3] = (inM3Buffer[inM3Offset + 3 * j + k] - inM3Buffer[inM3Offset + 3 * k + j]) * f;
        outBuffer[outOffset + j] = (inM3Buffer[inM3Offset + 3 * j + i] + inM3Buffer[inM3Offset + 3 * i + j]) * f;
        outBuffer[outOffset + k] = (inM3Buffer[inM3Offset + 3 * k + i] + inM3Buffer[inM3Offset + 3 * i + k]) * f;
    }

    return Quat.bufferNormalize(outBuffer, outOffset, outBuffer, outOffset);
};

Quat.bufferSetFromRotationMat4 = function(outBuffer, outOffset, inM4Buffer, inM4Offset)
{
    //m4 upper-left 3x3 sub-matrix must be a pure rotation matrix
    var trace = inM4Buffer[inM4Offset] + inM4Buffer[inM4Offset + 5] + inM4Buffer[inM4Offset + 10],
        f = 0.0;

    if (trace > 0.0)
    {
        f = math.sqrt(trace + 1.0);
        outBuffer[outOffset + 3] = 0.5 * f;

        f = 0.5 / f;
        outBuffer[outOffset] = (inM4Buffer[inM4Offset + 6] - inM4Buffer[inM4Offset + 9]) * f;
        outBuffer[outOffset + 1] = (inM4Buffer[inM4Offset + 8] - inM4Buffer[inM4Offset + 2]) * f;
        outBuffer[outOffset + 2] = (inM4Buffer[inM4Offset + 1] - inM4Buffer[inM4Offset + 4]) * f;
    }
    else
    {
        var i = 0;
        if (inM4Buffer[inM4Offset + 5] > inM4Buffer[inM4Offset])
        {
            i = 1;
        }

        if (inM4Buffer[inM4Offset + 10] > inM4Buffer[inM4Offset + 5 * i])
        {
            i = 2;
        }

        var j = (i + 1) % 3,
            k = (i + 2) % 3;

        f = math.sqrt(inM4Buffer[inM4Offset + 5 * i] - inM4Buffer[inM4Offset + 5 * j] - inM4Buffer[inM4Offset + 5 * k] + 1.0);
        outBuffer[outOffset + i] = 0.5 * f;

        f = 0.5 / f;
        outBuffer[outOffset + 3] = (inM4Buffer[inM4Offset + 4 * j + k] - inM4Buffer[inM4Offset + 4 * k + j]) * f;
        outBuffer[outOffset + j] = (inM4Buffer[inM4Offset + 4 * j + i] + inM4Buffer[inM4Offset + 4 * i + j]) * f;
        outBuffer[outOffset + k] = (inM4Buffer[inM4Offset + 4 * k + i] + inM4Buffer[inM4Offset + 4 * i + k]) * f;
    }

    return Quat.bufferNormalize(outBuffer, outOffset, outBuffer, outOffset);
};

Quat.bufferGetAxisAndAngle = function(outV3Buffer, outV3Offset, inBuffer, inOffset)
{
    //This computes the angle and axis of the rotation that is represented by
    //the inBuffer quaternion if it were a unit quaternion.
    //With û the 3D unit vector defining the rotation axis and 'a' the angle
    //around this axis, we compute 'a' and û such as:
    //q == ||q||.[cos(a/2) + sin(a/2).û]
    //So, if the former quaternion is not a unit quaternion, it should be
    //normalized before using it in other computations else the returned axis
    //and angle will not correspond.
    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1],
        z = inBuffer[inOffset + 2],
        w = inBuffer[inOffset + 3],
        m = x * x + y * y + z * z;

    if (m < math.EPSILON2)
    {
        //q is a null-quaternion or sin(a/2) == 0
        if (math.abs(w) < math.EPSILON)
        {
            //q is a null-quaternion, thus it cannot represent a rotation
            outV3Buffer[outV3Offset] = outV3Buffer[outV3Offset + 1] = outV3Buffer[outV3Offset + 2] = 0.0;
            return 0.0;
        }
        else
        {
            //Rotation angle 'a' equals 0 or 2.PI with a rotation axis that may
            //be anything. We choose arbitrarily û = [1, 0, 0]
            outV3Buffer[outV3Offset] = 1.0;
            outV3Buffer[outV3Offset + 1] = outV3Buffer[outV3Offset + 2] = 0.0;

            return (w > 0.0) ? 0.0 : math.TWO_PI;
        }
    }

    m = math.sqrt(m);
    var theta = math.atan2(m, w); //More stable than acos(w / ||q||)

    m = 1.0 / m;
    outV3Buffer[outV3Offset] = x * m;
    outV3Buffer[outV3Offset + 1] = y * m;
    outV3Buffer[outV3Offset + 2] = z * m;

    return 2.0 * theta;
};

Quat.bufferIsIdentity = function(inBuffer, inOffset)
{
    return ((math.abs(inBuffer[inOffset]) < math.EPSILON) &&
        (math.abs(inBuffer[inOffset + 1]) < math.EPSILON) &&
        (math.abs(inBuffer[inOffset + 2]) < math.EPSILON) &&
        (math.abs(inBuffer[inOffset + 3] - 1.0) < math.EPSILON));
};

Quat.bufferFastRotationEquals = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    //Only valid for unit quaternions or quaternions with the same magnitude
    var xa = inBufferA[inOffsetA],
        ya = inBufferA[inOffsetA + 1],
        za = inBufferA[inOffsetA + 2],
        wa = inBufferA[inOffsetA + 3];

    if ((inBufferA === inBufferB) && (inOffsetA === inOffsetB))
    {
        return !((math.abs(xa) < math.EPSILON) &&
            (math.abs(ya) < math.EPSILON) &&
            (math.abs(za) < math.EPSILON) &&
            (math.abs(wa) < math.EPSILON));
    }

    var xb = inBufferB[inOffsetB],
        yb = inBufferB[inOffsetB + 1],
        zb = inBufferB[inOffsetB + 2],
        wb = inBufferB[inOffsetB + 3];

    return (((math.abs(xa) >= math.EPSILON) ||
        (math.abs(ya) >= math.EPSILON) ||
        (math.abs(za) >= math.EPSILON) ||
        (math.abs(wa) >= math.EPSILON)) &&
        ((math.abs(xb) >= math.EPSILON) ||
            (math.abs(yb) >= math.EPSILON) ||
            (math.abs(zb) >= math.EPSILON) ||
            (math.abs(wb) >= math.EPSILON)) &&
        (((math.abs(xb - xa) < math.EPSILON) &&
            (math.abs(yb - ya) < math.EPSILON) &&
            (math.abs(zb - za) < math.EPSILON) &&
            (math.abs(wb - wa) < math.EPSILON)) ||
            ((math.abs(xb + xa) < math.EPSILON) &&
                (math.abs(yb + ya) < math.EPSILON) &&
                (math.abs(zb + za) < math.EPSILON) &&
                (math.abs(wb + wa) < math.EPSILON))));
};

Quat.bufferRotationEquals = function(inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var xa = inBufferA[inOffsetA],
        ya = inBufferA[inOffsetA + 1],
        za = inBufferA[inOffsetA + 2],
        wa = inBufferA[inOffsetA + 3];

    if ((inBufferA === inBufferB) && (inOffsetA === inOffsetB))
    {
        return !((math.abs(xa) < math.EPSILON) &&
            (math.abs(ya) < math.EPSILON) &&
            (math.abs(za) < math.EPSILON) &&
            (math.abs(wa) < math.EPSILON));
    }

    var na = xa * xa + ya * ya + za * za + wa * wa;
    if (na < math.EPSILON2)
    {
        return false;
    }

    var xb = inBufferB[inOffsetB],
        yb = inBufferB[inOffsetB + 1],
        zb = inBufferB[inOffsetB + 2],
        wb = inBufferB[inOffsetB + 3],
        nb = xb * xb + yb * yb + zb * zb + wb * wb;

    if (nb < math.EPSILON2)
    {
        return false;
    }

    var dot = math.abs(xa * xb + ya * yb + za * zb + wa * wb);
    if (dot < math.EPSILON)
    {
        return false;
    }

    dot /= math.sqrt(na * nb);
    if (dot <= 1.0 - math.EPSILON)
    {
        return false;
    }

    return true;
};

Quat.bufferConjugate = function(outBuffer, outOffset, inBuffer, inOffset)
{
    outBuffer[outOffset] = -inBuffer[inOffset];
    outBuffer[outOffset + 1] = -inBuffer[inOffset + 1];
    outBuffer[outOffset + 2] = -inBuffer[inOffset + 2];
    outBuffer[outOffset + 3] = inBuffer[inOffset + 3];

    return outBuffer;
};

Quat.bufferMultiply = function(outBuffer, outOffset, inBufferA, inOffsetA, inBufferB, inOffsetB)
{
    var xa = inBufferA[inOffsetA],
        ya = inBufferA[inOffsetA + 1],
        za = inBufferA[inOffsetA + 2],
        wa = inBufferA[inOffsetA + 3],
        xb = inBufferB[inOffsetB],
        yb = inBufferB[inOffsetB + 1],
        zb = inBufferB[inOffsetB + 2],
        wb = inBufferB[inOffsetB + 3];

    outBuffer[outOffset] = wa * xb + wb * xa + ya * zb - yb * za;
    outBuffer[outOffset + 1] = wa * yb + wb * ya + za * xb - zb * xa;
    outBuffer[outOffset + 2] = wa * zb + wb * za + xa * yb - xb * ya;
    outBuffer[outOffset + 3] = wa * wb - xa * xb - ya * yb - za * zb;

    return outBuffer;
};

Quat.bufferInvert = function(outBuffer, outOffset, inBuffer, inOffset)
{
    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1],
        z = inBuffer[inOffset + 2],
        w = inBuffer[inOffset + 3],
        n = x * x + y * y + z * z + w * w;

    if (n < math.EPSILON2)
    {
        //q is a null-quaternion, thus a real number and 1 / 0 == +/-Infinity
        outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
        outBuffer[outOffset + 3] = (w >= 0.0) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
        return outBuffer;
    }

    n = 1.0 / n;
    outBuffer[outOffset] = -x * n;
    outBuffer[outOffset + 1] = -y * n;
    outBuffer[outOffset + 2] = -z * n;
    outBuffer[outOffset + 3] = w * n;

    return outBuffer;
};

Quat.bufferLog = function(outBuffer, outOffset, inBuffer, inOffset)
{
    //With û a 3D unit vector,
    //q = ||q||.[cos(theta) + sin(theta).û]
    //q = ||q||.exp(theta.û)
    //log(q) = log(||q||) + theta.û
    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1],
        z = inBuffer[inOffset + 2],
        w = inBuffer[inOffset + 3],
        m = x * x + y * y + z * z;

    if (m < math.EPSILON2)
    {
        //q is a null-quaternion or sin(theta) == 0
        if (w > 0.0)
        {
            //Theta equals 0
            outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
            outBuffer[outOffset + 3] = math.log(w);
        }
        else if (w < 0.0)
        {
            //Theta equals PI and the vector part of the quaternion may be
            //anything, we choose arbitrarily û = [1, 0, 0]
            outBuffer[outOffset] = math.PI;
            outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
            outBuffer[outOffset + 3] = math.log(-w);
        }
        else
        {
            //q is a null-quaternion, thus a real number and log(0) == -Infinity
            outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
            outBuffer[outOffset + 3] = Number.NEGATIVE_INFINITY;
        }

        return outBuffer;
    }

    var n2 = m + w * w;
    m = math.sqrt(m);
    var theta = math.atan2(m, w); //More stable than acos(w / ||q||)
    theta /= m;

    outBuffer[outOffset] = x * theta;
    outBuffer[outOffset + 1] = y * theta;
    outBuffer[outOffset + 2] = z * theta;
    outBuffer[outOffset + 3] = 0.5 * math.log(n2);

    return outBuffer;
};

Quat.bufferExp = function(outBuffer, outOffset, inBuffer, inOffset)
{
    //With û a 3D unit vector,
    //q = ||q||.[cos(theta) + sin(theta).û]
    //exp(q) = exp[||q||.cos(theta)] x exp[||q||.sin(theta).û]
    //exp(q) = exp[||q||.cos(theta)] x {cos[||q||.sin(theta)] + sin[||q||.sin(theta)].û}
    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1],
        z = inBuffer[inOffset + 2],
        expW = math.exp(inBuffer[inOffset + 3]),
        m = x * x + y * y + z * z;

    if (m < math.EPSILON2)
    {
        outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
        outBuffer[outOffset + 3] = expW;
        return outBuffer;
    }

    m = math.sqrt(m);
    outBuffer[outOffset + 3] = expW * math.cos(m);

    m = expW * math.sin(m) / m;
    outBuffer[outOffset] = x * m;
    outBuffer[outOffset + 1] = y * m;
    outBuffer[outOffset + 2] = z * m;

    return outBuffer;
};

Quat.bufferPow = function(outBuffer, outOffset, inBuffer, inOffset, p)
{
    //With û a 3D unit vector,
    //q = ||q||.exp(theta.û)
    //pow(q, p) = pow(||q||, p).exp(p.theta.û)
    //pow(q, p) = pow(||q||, p).[cos(p.theta) + sin(p.theta).û]
    if (math.abs(p) < math.EPSILON)
    {
        //pow(q, 0) == Identity
        outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;
        outBuffer[outOffset + 3] = 1.0;
        return outBuffer;
    }

    if (math.abs(p - 1.0) < math.EPSILON2)
    {
        //pow(q, 1) == q
        outBuffer[outOffset] = inBuffer[inOffset];
        outBuffer[outOffset + 1] = inBuffer[inOffset + 1];
        outBuffer[outOffset + 2] = inBuffer[inOffset + 2];
        outBuffer[outOffset + 3] = inBuffer[inOffset + 3];

        return outBuffer;
    }

    var x = inBuffer[inOffset],
        y = inBuffer[inOffset + 1],
        z = inBuffer[inOffset + 2],
        w = inBuffer[inOffset + 3],
        m = x * x + y * y + z * z;

    if (m < math.EPSILON2)
    {
        //q is a null-quaternion or sin(theta) == 0
        outBuffer[outOffset] = outBuffer[outOffset + 1] = outBuffer[outOffset + 2] = 0.0;

        if (math.abs(w) < math.EPSILON)
        {
            //q is a null-quaternion, thus a real number and pow(0, p) == 0
            outBuffer[outOffset + 3] = 0.0;
        }
        else
        {
            //Theta equals 0 or PI
            outBuffer[outOffset + 3] = math.pow(w, p);
        }

        return outBuffer;
    }

    var n = math.pow(m + w * w, 0.5 * p);
    m = math.sqrt(m);

    var theta = math.atan2(m, w); //More stable than acos(w / ||q||)
    theta *= p;

    outBuffer[outOffset + 3] = n * math.cos(theta);
    theta = n * math.sin(theta) / m;

    outBuffer[outOffset] = x * theta;
    outBuffer[outOffset + 1] = y * theta;
    outBuffer[outOffset + 2] = z * theta;

    return outBuffer;
};

Quat.bufferTransformVec3 = function(outV3Buffer, outV3Offset, inQBuffer, inQOffset, inV3Buffer, inV3Offset)
{
    //q quaternion must be a unit quaternion
    //outV3 = q.inV3.inv(q)
    //outV3 = q.inV3.(conj(q) / ||q||²)
    //outV3 = q.inV3.conj(q) because unit quaternion
    var vx = inV3Buffer[inV3Offset],
        vy = inV3Buffer[inV3Offset + 1],
        vz = inV3Buffer[inV3Offset + 2],
        qx = inQBuffer[inQOffset],
        qy = inQBuffer[inQOffset + 1],
        qz = inQBuffer[inQOffset + 2],
        qw = inQBuffer[inQOffset + 3],
        rx = qw * vx - vy * qz + qy * vz, //r = inV3.conj(q)
        ry = qw * vy - vz * qx + qz * vx,
        rz = qw * vz - vx * qy + qx * vy,
        rw = vx * qx + vy * qy + vz * qz;

    //outV3 = q.r
    outV3Buffer[outV3Offset] = qw * rx + rw * qx + qy * rz - ry * qz;
    outV3Buffer[outV3Offset + 1] = qw * ry + rw * qy + qz * rx - rz * qx;
    outV3Buffer[outV3Offset + 2] = qw * rz + rw * qz + qx * ry - rx * qy;

    return outV3Buffer;
};

Quat.bufferSlerp = function(outBuffer, outOffset, inBufferQ0, inOffsetQ0, t, inBufferQ1, inOffsetQ1)
{
    //q0 and q1 must be unit quaternions
    //q(t) = {sin[(1 - t).theta] / sin(theta)}.q0 + [sin(t.theta) / sin(theta)].q1
    //with cos(theta) = q0.q1 / ||q0||.||q1|| = q0.q1 because unit quaternions
    var x0 = inBufferQ0[inOffsetQ0],
        y0 = inBufferQ0[inOffsetQ0 + 1],
        z0 = inBufferQ0[inOffsetQ0 + 2],
        w0 = inBufferQ0[inOffsetQ0 + 3],
        x1 = inBufferQ1[inOffsetQ1],
        y1 = inBufferQ1[inOffsetQ1 + 1],
        z1 = inBufferQ1[inOffsetQ1 + 2],
        w1 = inBufferQ1[inOffsetQ1 + 3],
        dot = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1;

    if (dot < 0.0)
    {
        //Let's interpolate along the shortest path
        dot = -dot;
        x1 = -x1;
        y1 = -y1;
        z1 = -z1;
        w1 = -w1;
    }

    if (dot > 1.0 - math.EPSILON)
    {
        //Angle theta (almost) equals 0 so 1/sin(theta) will overflow.
        //We fallback doing a simple linear interpolation as the difference
        //between q0 and q1 is very small
        outBuffer[outOffset] = x0 + t * (x1 - x0);
        outBuffer[outOffset + 1] = y0 + t * (y1 - y0);
        outBuffer[outOffset + 2] = z0 + t * (z1 - z0);
        outBuffer[outOffset + 3] = w0 + t * (w1 - w0);

        return outBuffer;
    }

    dot = math.acos(dot);
    var invSin = 1.0 / math.sin(dot),
        s = math.sin((1.0 - t) * dot) * invSin;
    t = math.sin(t * dot) * invSin;

    outBuffer[outOffset] = s * x0 + t * x1;
    outBuffer[outOffset + 1] = s * y0 + t * y1;
    outBuffer[outOffset + 2] = s * z0 + t * z1;
    outBuffer[outOffset + 3] = s * w0 + t * w1;

    return outBuffer;
};

//It is safe to use a "statically" shared temporary buffer for bufferSquad
//and bufferComputeSquadIntermediate because web workers never share their
//global contexts, so _sharedTmpBuffer will never be accessed from
//different threads
var _sharedTmpBuffer = new Float32Array(8);

Quat.bufferSquad = function(outBuffer, outOffset, inBufferS0, inOffsetS0, inBufferQ0, inOffsetQ0, t, inBufferQ1, inOffsetQ1, inBufferS1, inOffsetS1)
{
    //s0, q0, q1 and s1 must be unit quaternions
    //squad(s0, q0, t, q1, s1) = slerp[slerp(q0, t, q1), 2t(1 - t), slerp(s0, t, s1)]
    //with:
    //s0 = exp{-1/4 x [log(q1.inv(q0)) + log(q-1.inv(q0))]}.q0
    //s1 = exp{-1/4 x [log(q2.inv(q1)) + log(q0.inv(q1))]}.q1
    //s0 and s1 can be computed using bufferComputeSquadIntermediate

    Quat.bufferSlerp(_sharedTmpBuffer, 0, inBufferS0, inOffsetS0, t, inBufferS1, inOffsetS1);
    Quat.bufferSlerp(outBuffer, outOffset, inBufferQ0, inOffsetQ0, t, inBufferQ1, inOffsetQ1);
    Quat.bufferSlerp(outBuffer, outOffset, outBuffer, outOffset, 2.0 * t * (1.0 - t), _sharedTmpBuffer, 0);

    return outBuffer;
};

Quat.bufferComputeSquadIntermediate = function(outBuffer, outOffset, inBufferQ0, inOffsetQ0, inBufferQ1, inOffsetQ1, inBufferQ2, inOffsetQ2)
{
    //Computes squad intermediate for quaternion q1
    //q0, q1 and q2 must be unit quaternions
    //Computed intermediate quaternion is normalized to ensure stability
    //s1 = exp{-1/4 x [log(q2.inv(q1)) + log(q0.inv(q1))]}.q1
    Quat.bufferInvert(_sharedTmpBuffer, 4, inBufferQ1, inOffsetQ1);

    Quat.bufferMultiply(_sharedTmpBuffer, 0, inBufferQ2, inOffsetQ2, _sharedTmpBuffer, 4);
    Quat.bufferLog(_sharedTmpBuffer, 0, _sharedTmpBuffer, 0);

    Quat.bufferMultiply(_sharedTmpBuffer, 4, inBufferQ0, inOffsetQ0, _sharedTmpBuffer, 4);
    Quat.bufferLog(_sharedTmpBuffer, 4, _sharedTmpBuffer, 4);

    _sharedTmpBuffer[0] = -0.25 * (_sharedTmpBuffer[0] + _sharedTmpBuffer[4]);
    _sharedTmpBuffer[1] = -0.25 * (_sharedTmpBuffer[1] + _sharedTmpBuffer[5]);
    _sharedTmpBuffer[2] = -0.25 * (_sharedTmpBuffer[2] + _sharedTmpBuffer[6]);
    _sharedTmpBuffer[3] = -0.25 * (_sharedTmpBuffer[3] + _sharedTmpBuffer[7]);

    Quat.bufferExp(_sharedTmpBuffer, 0, _sharedTmpBuffer, 0);
    Quat.bufferMultiply(outBuffer, outOffset, _sharedTmpBuffer, 0, inBufferQ1, inOffsetQ1);

    Quat.bufferNormalize(outBuffer, outOffset, outBuffer, outOffset);
    return outBuffer;
};
