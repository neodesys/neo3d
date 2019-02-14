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

require("../asserts");
var math = require("../../src/neo3d/math");
var Mat3 = require("../../src/neo3d/Mat3");
var Mat4 = require("../../src/neo3d/Mat4");
var Vec3 = require("../../src/neo3d/Vec3");
var Vec4 = require("../../src/neo3d/Vec4");
var Quat = require("../../src/neo3d/Quat");

QUnit.module("Mat4", {
    beforeEach: function()
    {
        this.mat = new Mat4();

        //randomVal is directly wrapped into a Float32Array to prevent further
        //truncating of float values from double-precision to single-precision
        this.randomVal = new Float32Array([
            10.0 * Math.random(),
            10.0 * Math.random(),
            10.0 * Math.random(),
            10.0 * Math.random(),

            10.0 * Math.random(),
            10.0 * Math.random(),
            10.0 * Math.random(),
            10.0 * Math.random(),

            10.0 * Math.random(),
            10.0 * Math.random(),
            10.0 * Math.random(),
            10.0 * Math.random(),

            10.0 * Math.random(),
            10.0 * Math.random(),
            10.0 * Math.random(),
            10.0 * Math.random()
        ]);
    }
});

QUnit.test("constants", function(assert)
{
    assert.equal(Mat4.NB_COMPONENTS, 16);
    assert.bufferEqual(Mat4.IDENTITY.buffer, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
});

QUnit.test("createBuffer", function(assert)
{
    var buffer = Mat4.createBuffer(2);
    assert.equal(buffer.length, 2 * Mat4.NB_COMPONENTS);
    assert.bufferEqual(buffer, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
});

QUnit.test("setFromArray", function(assert)
{
    assert.bufferEqual(this.mat.setFromArray(this.randomVal).buffer, this.randomVal);
});

QUnit.test("setColumnVec4", function(assert)
{
    var v0 = new Vec4().setFromValues(this.randomVal[0], this.randomVal[1], this.randomVal[2], this.randomVal[3]),
        v1 = new Vec4().setFromValues(this.randomVal[4], this.randomVal[5], this.randomVal[6], this.randomVal[7]),
        v2 = new Vec4().setFromValues(this.randomVal[8], this.randomVal[9], this.randomVal[10], this.randomVal[11]),
        v3 = new Vec4().setFromValues(this.randomVal[12], this.randomVal[13], this.randomVal[14], this.randomVal[15]);

    this.mat.setColumnVec4(0, v0);
    this.mat.setColumnVec4(1, v1);
    this.mat.setColumnVec4(2, v2);
    this.mat.setColumnVec4(3, v3);

    assert.bufferEqual(this.mat.buffer, this.randomVal);
});

QUnit.test("setFromColumnsVec4", function(assert)
{
    var v0 = new Vec4().setFromValues(this.randomVal[0], this.randomVal[1], this.randomVal[2], this.randomVal[3]),
        v1 = new Vec4().setFromValues(this.randomVal[4], this.randomVal[5], this.randomVal[6], this.randomVal[7]),
        v2 = new Vec4().setFromValues(this.randomVal[8], this.randomVal[9], this.randomVal[10], this.randomVal[11]),
        v3 = new Vec4().setFromValues(this.randomVal[12], this.randomVal[13], this.randomVal[14], this.randomVal[15]);

    assert.bufferEqual(this.mat.setFromColumnsVec4(v0, v1, v2, v3).buffer, this.randomVal);
});

QUnit.test("setColumnVec3", function(assert)
{
    var v0 = new Vec3().setFromValues(this.randomVal[0], this.randomVal[1], this.randomVal[2]),
        v1 = new Vec3().setFromValues(this.randomVal[4], this.randomVal[5], this.randomVal[6]),
        v2 = new Vec3().setFromValues(this.randomVal[8], this.randomVal[9], this.randomVal[10]),
        v3 = new Vec3().setFromValues(this.randomVal[12], this.randomVal[13], this.randomVal[14]);

    this.mat.buffer[3] = 1.1;
    this.mat.buffer[7] = -0.6;
    this.mat.buffer[11] = 4.3;
    this.mat.buffer[15] = 5.7;

    this.mat.setColumnVec3(0, v0);
    this.mat.setColumnVec3(1, v1);
    this.mat.setColumnVec3(2, v2);
    this.mat.setColumnVec3(3, v3);

    this.randomVal[3] = this.randomVal[7] = this.randomVal[11] = 0.0;
    this.randomVal[15] = 1.0;

    assert.bufferEqual(this.mat.buffer, this.randomVal);
});

QUnit.test("setFromColumnsVec3", function(assert)
{
    var v0 = new Vec3().setFromValues(this.randomVal[0], this.randomVal[1], this.randomVal[2]),
        v1 = new Vec3().setFromValues(this.randomVal[4], this.randomVal[5], this.randomVal[6]),
        v2 = new Vec3().setFromValues(this.randomVal[8], this.randomVal[9], this.randomVal[10]),
        v3 = new Vec3().setFromValues(this.randomVal[12], this.randomVal[13], this.randomVal[14]);

    this.mat.buffer[3] = 1.1;
    this.mat.buffer[7] = -0.6;
    this.mat.buffer[11] = 4.3;
    this.mat.buffer[15] = 5.7;

    this.randomVal[3] = this.randomVal[7] = this.randomVal[11] = 0.0;
    this.randomVal[15] = 1.0;

    assert.bufferEqual(this.mat.setFromColumnsVec3(v0, v1, v2, v3).buffer, this.randomVal);
});

QUnit.test("setRotationFromQuat", function(assert)
{
    var p = new Vec3().setFromValues(1.4, 2.5, 3.1),
        q = new Quat().setFromValues(0.0412898, 0.433543, -0.2890287, 0.8525245);

    this.mat.setColumnVec3(3, p);

    assert.equalish(q.norm(), 1.0);
    assert.bufferEqualish(this.mat.setRotationFromQuat(q).buffer, [
        0.4570058, -0.4570062, -0.7630799, 0.0, //Col0
        0.5286098, 0.8295152, -0.1802115, 0.0,  //Col1
        0.7153442, -0.3210138, 0.6206712, 0.0,  //Col2
        1.4, 2.5, 3.1, 1.0                      //Col3
    ]);
});

QUnit.test("setRotScaleFromMat3", function(assert)
{
    var p = new Vec3().setFromValues(1.4, 2.5, 3.1),
        m3 = new Mat3().setFromArray([
            0.4570058, -0.4570062, -0.7630799, //Col0
            0.5286098, 0.8295152, -0.1802115,  //Col1
            0.7153442, -0.3210138, 0.6206712   //Col2
        ]);

    this.mat.setColumnVec3(3, p);

    assert.bufferEqual(this.mat.setRotScaleFromMat3(m3).buffer, [
        0.4570058, -0.4570062, -0.7630799, 0.0, //Col0
        0.5286098, 0.8295152, -0.1802115, 0.0,  //Col1
        0.7153442, -0.3210138, 0.6206712, 0.0,  //Col2
        1.4, 2.5, 3.1, 1.0                      //Col3
    ]);
});

QUnit.test("setFromTRSTransfo", function(assert)
{
    var p = new Vec3().setFromValues(1.4, 2.5, 3.1),
        s = new Vec3().setFromValues(1.2, 2.3, 0.7),
        q = new Quat().setFromValues(0.0412898, 0.433543, -0.2890287, 0.8525245);

    assert.equalish(q.norm(), 1.0);
    assert.bufferEqualish(this.mat.setFromTRSTransfo(p, q, s).buffer, [
        0.548407, -0.5484074, -0.9156959, 0.0, //Col0
        1.2158025, 1.907885, -0.4144864, 0.0,  //Col1
        0.5007409, -0.2247097, 0.4344698, 0.0, //Col2
        1.4, 2.5, 3.1, 1.0                     //Col3
    ]);
});

QUnit.test("setIdentity", function(assert)
{
    this.mat.setFromArray(this.randomVal);
    assert.bufferEqual(this.mat.setIdentity().buffer, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
});

QUnit.test("copy", function(assert)
{
    var m4 = new Mat4().setFromArray(this.randomVal);
    assert.bufferEqual(this.mat.copy(m4).buffer, this.randomVal);
});

QUnit.test("getTRSTransfo", function(assert)
{
    var p = new Vec3(),
        s = new Vec3(),
        q = new Quat();

    this.mat.setFromArray([
        0.548407, -0.5484074, -0.9156959, 0.0, //Col0
        1.2158025, 1.907885, -0.4144864, 0.0,  //Col1
        0.5007409, -0.2247097, 0.4344698, 0.0, //Col2
        1.4, 2.5, 3.1, 1.0                     //Col3
    ]);

    this.mat.getTRSTransfo(p, q, s);

    assert.equalish(q.norm(), 1.0);
    assert.bufferEqual(p.buffer, [1.4, 2.5, 3.1]);
    assert.bufferEqualish(q.buffer, [0.0412898, 0.433543, -0.2890287, 0.8525245]);
    assert.bufferEqualish(s.buffer, [1.2, 2.3, 0.7]);
});

QUnit.test("normalizeTRSTransfo", function(assert)
{
    var m4 = new Mat4().setFromArray([
        0.548408, -0.548407, -0.915696, 0.5, //Col0
        1.215802, 1.90788, -0.414485, 0.2,   //Col1
        0.50075, -0.22472, 0.434461, 1.8,    //Col2
        1.4, 2.5, 3.1, 1.3                   //Col3
    ]);

    var buffer = [
        0.548407, -0.5484074, -0.9156959, 0.0, //Col0
        1.2158025, 1.907885, -0.4144864, 0.0,  //Col1
        0.5007409, -0.2247097, 0.4344698, 0.0, //Col2
        1.4, 2.5, 3.1, 1.0                     //Col3
    ];

    assert.notBufferEqualish(m4.buffer, buffer);
    assert.bufferEqualish(this.mat.normalizeTRSTransfo(m4).buffer, buffer);
});

QUnit.test("normalizeTRSTransfoInPlace", function(assert)
{
    this.mat.setFromArray([
        0.548408, -0.548407, -0.915696, 0.5, //Col0
        1.215802, 1.90788, -0.414485, 0.2,   //Col1
        0.50075, -0.22472, 0.434461, 1.8,    //Col2
        1.4, 2.5, 3.1, 1.3                   //Col3
    ]);

    var buffer = [
        0.548407, -0.5484074, -0.9156959, 0.0, //Col0
        1.2158025, 1.907885, -0.4144864, 0.0,  //Col1
        0.5007409, -0.2247097, 0.4344698, 0.0, //Col2
        1.4, 2.5, 3.1, 1.0                     //Col3
    ];

    assert.notBufferEqualish(this.mat.buffer, buffer);
    assert.bufferEqualish(this.mat.normalizeTRSTransfoInPlace().buffer, buffer);
});

QUnit.test("isIdentity", function(assert)
{
    this.mat.setFromArray([
        1.0000001, -0.0000002, 0.0000003, -0.0000004, //Col0
        0.0000001, 0.9999998, 0.0000003, 0.0000004,   //Col1
        0.0000001, 0.0000002, 0.9999999, -0.0000004,  //Col2
        0.0000001, -0.0000002, 0.0000003, 1.0000004   //Col3
    ]);
    assert.ok(this.mat.isIdentity());

    this.mat.buffer[1] = 0.1;
    assert.notOk(this.mat.isIdentity());
});

QUnit.test("equals", function(assert)
{
    var m4 = new Mat4().setFromArray(this.randomVal);
    this.randomVal[1] += 0.9 * math.EPSILON;
    this.mat.setFromArray(this.randomVal);

    assert.ok(this.mat.equals(this.mat));

    assert.notBufferEqual(this.mat.buffer, m4.buffer);
    assert.bufferEqualish(this.mat.buffer, m4.buffer);
    assert.ok(this.mat.equals(m4));

    this.mat.buffer[1] += math.EPSILON;
    assert.bufferEqualish(this.mat.buffer, m4.buffer);
    assert.notOk(this.mat.equals(m4));

    this.mat.buffer[1] += 0.1;
    assert.notBufferEqualish(this.mat.buffer, m4.buffer);
    assert.notOk(this.mat.equals(m4));
});

QUnit.test("multiply", function(assert)
{
    var m0 = new Mat4().setFromArray([
        1.2, 0.5, -6.7, 5.4,  //Col0
        -0.5, 2.7, 8.3, -9.1, //Col1
        7.3, -8.6, 2.4, 0.8,  //Col2
        9.8, -5.6, 7.2, 4.3   //Col3
    ]),
        m1 = new Mat4().setFromArray([
            -4.1, 4.4, 0.8, 8.4, //Col0
            2.7, 0.2, -0.6, 3.5, //Col1
            9.1, -4.2, 2.1, 1.7, //Col2
            -0.4, -3.7, 8.5, 3.4 //Col3
        ]);

    assert.bufferEqualish(this.mat.multiply(m0, m1).buffer, [
        81.04, -44.09, 126.39, -25.42, //Col0
        33.06, -12.55, 7.33, 27.33,    //Col1
        45.01, -34.37, -78.55, 96.35,  //Col2
        96.74, -102.33, 16.85, 52.93   //Col3
    ]);

    assert.bufferEqualish(this.mat.multiply(m1, m0).buffer, [
        -66.7, 13.54, 32.49, 18.8,    //Col0
        88.51, -2.85, -61.94, -11.58, //Col1
        -31.63, 17.36, 22.84, 38.02,  //Col2
        8.5, -4.15, 62.87, 89.58      //Col3
    ]);
});

QUnit.test("multiplyInPlace", function(assert)
{
    var m4 = new Mat4().setFromArray([
        -4.1, 4.4, 0.8, 8.4, //Col0
        2.7, 0.2, -0.6, 3.5, //Col1
        9.1, -4.2, 2.1, 1.7, //Col2
        -0.4, -3.7, 8.5, 3.4 //Col3
    ]);

    this.mat.setFromArray([
        1.2, 0.5, -6.7, 5.4,  //Col0
        -0.5, 2.7, 8.3, -9.1, //Col1
        7.3, -8.6, 2.4, 0.8,  //Col2
        9.8, -5.6, 7.2, 4.3   //Col3
    ]);

    assert.bufferEqualish(this.mat.multiplyInPlace(m4).buffer, [
        81.04, -44.09, 126.39, -25.42, //Col0
        33.06, -12.55, 7.33, 27.33,    //Col1
        45.01, -34.37, -78.55, 96.35,  //Col2
        96.74, -102.33, 16.85, 52.93   //Col3
    ]);
});

QUnit.test("invert", function(assert)
{
    var m4 = new Mat4();
    assert.bufferEqual(this.mat.invert(m4).buffer, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    //det = +EPSILON
    m4.setFromArray([
        -4.1, 4.4, -8.2, 8.4, //Col0
        2.7, 0.2, 5.4, 3.5,   //Col1
        9.1, -4.2, 18.2, 1.7, //Col2
        -0.4, 3.7, -0.8, 3.4  //Col3
    ]);
    assert.bufferEqual(this.mat.invert(m4).buffer, [
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY
    ]);

    //det = -EPSILON
    m4.setFromArray([
        1.2, 0.5, -6.7, 5.4,   //Col0
        -0.5, 2.7, 8.3, -9.1,  //Col1
        2.4, 1.0, -13.4, 10.8, //Col2
        9.8, -5.6, 7.2, 4.3    //Col3
    ]);
    assert.bufferEqual(this.mat.invert(m4).buffer, [
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY
    ]);

    //det != 0
    m4.setFromArray([
        -4.1, 4.4, 0.8, 8.4, //Col0
        2.7, 0.2, -0.6, 3.5, //Col1
        9.1, -4.2, 2.1, 1.7, //Col2
        -0.4, 3.7, 8.5, 3.4  //Col3
    ]);
    assert.bufferEqualish(this.mat.invert(m4).buffer, [
        -0.2079038, 0.477143, -0.1216887, 0.0833124,  //Col0
        -0.3418939, 0.8287024, -0.3916796, 0.1874427, //Col1
        0.0627687, -0.268009, 0.1106776, 0.0654772,   //Col2
        0.1906801, -0.1756663, 0.1352291, -0.0637559  //Col3
    ]);

    assert.ok(this.mat.multiplyInPlace(m4).isIdentity());
});

QUnit.test("invertInPlace", function(assert)
{
    assert.bufferEqual(this.mat.invertInPlace().buffer, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    //det = +EPSILON
    this.mat.setFromArray([
        -4.1, 4.4, -8.2, 8.4, //Col0
        2.7, 0.2, 5.4, 3.5,   //Col1
        9.1, -4.2, 18.2, 1.7, //Col2
        -0.4, 3.7, -0.8, 3.4  //Col3
    ]);
    assert.bufferEqual(this.mat.invertInPlace().buffer, [
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY
    ]);

    //det = -EPSILON
    this.mat.setFromArray([
        1.2, 0.5, -6.7, 5.4,   //Col0
        -0.5, 2.7, 8.3, -9.1,  //Col1
        2.4, 1.0, -13.4, 10.8, //Col2
        9.8, -5.6, 7.2, 4.3    //Col3
    ]);
    assert.bufferEqual(this.mat.invertInPlace().buffer, [
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY
    ]);

    //det != 0
    this.mat.setFromArray([
        -4.1, 4.4, 0.8, 8.4, //Col0
        2.7, 0.2, -0.6, 3.5, //Col1
        9.1, -4.2, 2.1, 1.7, //Col2
        -0.4, 3.7, 8.5, 3.4  //Col3
    ]);
    assert.bufferEqualish(this.mat.invertInPlace().buffer, [
        -0.2079038, 0.477143, -0.1216887, 0.0833124,  //Col0
        -0.3418939, 0.8287024, -0.3916796, 0.1874427, //Col1
        0.0627687, -0.268009, 0.1106776, 0.0654772,   //Col2
        0.1906801, -0.1756663, 0.1352291, -0.0637559  //Col3
    ]);
});

QUnit.test("transpose", function(assert)
{
    assert.bufferEqual(this.mat.transpose(Mat4.IDENTITY).buffer, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    var m4 = new Mat4().setFromArray(this.randomVal);
    this.mat.transpose(m4);

    assert.equal(this.mat.buffer[0], this.randomVal[0]);
    assert.equal(this.mat.buffer[1], this.randomVal[4]);
    assert.equal(this.mat.buffer[2], this.randomVal[8]);
    assert.equal(this.mat.buffer[3], this.randomVal[12]);
    assert.equal(this.mat.buffer[4], this.randomVal[1]);
    assert.equal(this.mat.buffer[5], this.randomVal[5]);
    assert.equal(this.mat.buffer[6], this.randomVal[9]);
    assert.equal(this.mat.buffer[7], this.randomVal[13]);
    assert.equal(this.mat.buffer[8], this.randomVal[2]);
    assert.equal(this.mat.buffer[9], this.randomVal[6]);
    assert.equal(this.mat.buffer[10], this.randomVal[10]);
    assert.equal(this.mat.buffer[11], this.randomVal[14]);
    assert.equal(this.mat.buffer[12], this.randomVal[3]);
    assert.equal(this.mat.buffer[13], this.randomVal[7]);
    assert.equal(this.mat.buffer[14], this.randomVal[11]);
    assert.equal(this.mat.buffer[15], this.randomVal[15]);
});

QUnit.test("transposeInPlace", function(assert)
{
    assert.bufferEqual(this.mat.transposeInPlace().buffer, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    this.mat.setFromArray(this.randomVal).transposeInPlace();

    assert.equal(this.mat.buffer[0], this.randomVal[0]);
    assert.equal(this.mat.buffer[1], this.randomVal[4]);
    assert.equal(this.mat.buffer[2], this.randomVal[8]);
    assert.equal(this.mat.buffer[3], this.randomVal[12]);
    assert.equal(this.mat.buffer[4], this.randomVal[1]);
    assert.equal(this.mat.buffer[5], this.randomVal[5]);
    assert.equal(this.mat.buffer[6], this.randomVal[9]);
    assert.equal(this.mat.buffer[7], this.randomVal[13]);
    assert.equal(this.mat.buffer[8], this.randomVal[2]);
    assert.equal(this.mat.buffer[9], this.randomVal[6]);
    assert.equal(this.mat.buffer[10], this.randomVal[10]);
    assert.equal(this.mat.buffer[11], this.randomVal[14]);
    assert.equal(this.mat.buffer[12], this.randomVal[3]);
    assert.equal(this.mat.buffer[13], this.randomVal[7]);
    assert.equal(this.mat.buffer[14], this.randomVal[11]);
    assert.equal(this.mat.buffer[15], this.randomVal[15]);
});

QUnit.test("transformVec4", function(assert)
{
    var v0 = new Vec4().setFromValues(1.3, -5.4, 2.6, 0.3),
        v1 = new Vec4();

    this.mat.setFromArray([
        1.2, 0.5, -6.7, 5.4,   //Col0
        -0.5, 2.7, 8.3, -9.1,  //Col1
        2.4, 1.0, -13.4, 10.8, //Col2
        9.8, -5.6, 7.2, 4.3    //Col3
    ]);

    assert.bufferEqualish(this.mat.transformVec4(v1, v0).buffer, [13.44, -13.01, -86.21, 85.53]);
});

QUnit.test("transformVec4InPlace", function(assert)
{
    var v4 = new Vec4().setFromValues(1.3, -5.4, 2.6, 0.3);

    this.mat.setFromArray([
        1.2, 0.5, -6.7, 5.4,   //Col0
        -0.5, 2.7, 8.3, -9.1,  //Col1
        2.4, 1.0, -13.4, 10.8, //Col2
        9.8, -5.6, 7.2, 4.3    //Col3
    ]);

    assert.bufferEqualish(this.mat.transformVec4InPlace(v4).buffer, [13.44, -13.01, -86.21, 85.53]);
});

QUnit.test("transformVec3Pos", function(assert)
{
    var v0 = new Vec3().setFromValues(1.3, -5.4, 2.6),
        v1 = new Vec3();

    this.mat.setFromArray([
        1.2, 0.5, -6.7, 0.0,  //Col0
        -0.5, 2.7, 8.3, 0.0,  //Col1
        2.4, 1.0, -13.4, 0.0, //Col2
        9.8, -5.6, 7.2, 1.0   //Col3
    ]);

    assert.bufferEqualish(this.mat.transformVec3Pos(v1, v0).buffer, [20.3, -16.93, -81.17]);
});

QUnit.test("transformVec3PosInPlace", function(assert)
{
    var v3 = new Vec3().setFromValues(1.3, -5.4, 2.6);

    this.mat.setFromArray([
        1.2, 0.5, -6.7, 0.0,  //Col0
        -0.5, 2.7, 8.3, 0.0,  //Col1
        2.4, 1.0, -13.4, 0.0, //Col2
        9.8, -5.6, 7.2, 1.0   //Col3
    ]);

    assert.bufferEqualish(this.mat.transformVec3PosInPlace(v3).buffer, [20.3, -16.93, -81.17]);
});

QUnit.test("transformVec3Dir", function(assert)
{
    var v0 = new Vec3().setFromValues(1.3, -5.4, 2.6),
        v1 = new Vec3();

    this.mat.setFromArray([
        1.2, 0.5, -6.7, 0.0,  //Col0
        -0.5, 2.7, 8.3, 0.0,  //Col1
        2.4, 1.0, -13.4, 0.0, //Col2
        9.8, -5.6, 7.2, 1.0   //Col3
    ]);

    assert.bufferEqualish(this.mat.transformVec3Dir(v1, v0).buffer, [10.5, -11.33, -88.37]);
});

QUnit.test("transformVec3DirInPlace", function(assert)
{
    var v3 = new Vec3().setFromValues(1.3, -5.4, 2.6);

    this.mat.setFromArray([
        1.2, 0.5, -6.7, 0.0,  //Col0
        -0.5, 2.7, 8.3, 0.0,  //Col1
        2.4, 1.0, -13.4, 0.0, //Col2
        9.8, -5.6, 7.2, 1.0   //Col3
    ]);

    assert.bufferEqualish(this.mat.transformVec3DirInPlace(v3).buffer, [10.5, -11.33, -88.37]);
});

QUnit.test("buildFrustumProj", function(assert)
{
    assert.bufferEqualish(this.mat.buildFrustumProj(-1, 1, -1, 1, 0.1, 10.0).buffer, [
        0.1, 0, 0, 0,        //Col0
        0, 0.1, 0, 0,        //Col1
        0, 0, -1.020202, -1, //Col2
        0, 0, -0.2020202, 0  //Col3
    ]);
});

QUnit.test("buildPerspectiveProj", function(assert)
{
    assert.bufferEqualish(this.mat.buildPerspectiveProj(math.HALF_PI, 16.0 / 9.0, 0.1, 10.0).buffer, [
        1, 0, 0, 0,          //Col0
        0, 1.7777778, 0, 0,  //Col1
        0, 0, -1.020202, -1, //Col2
        0, 0, -0.2020202, 0  //Col3
    ]);
});

QUnit.test("buildOrthoProj", function(assert)
{
    assert.bufferEqualish(this.mat.buildOrthoProj(-1, 1, -1, 1, 0.1, 10.0).buffer, [
        1, 0, 0, 0,          //Col0
        0, 1, 0, 0,          //Col1
        0, 0, -0.2020202, 0, //Col2
        0, 0, -1.020202, 1   //Col3
    ]);
});

QUnit.test("buildLookAtView", function(assert)
{
    var eye = new Vec3().setFromValues(5, -5, 8),
        target = new Vec3().setFromValues(5.0000001, -4.9999998, 8.0000004),
        up = Vec3.K;

    //eye == target -> identity
    assert.bufferEqual(this.mat.buildLookAtView(eye, target, up).buffer, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    //eye != target
    target.setFromValues(3, 4, 0);
    assert.bufferEqualish(this.mat.buildLookAtView(eye, target, up).buffer, [
        0.9761871, -0.1421731, 0.1638464, 0.0, //Col0
        0.2169305, 0.6397789, -0.7373087, 0.0, //Col1
        0.0, 0.7552946, 0.6553855, 0.0,        //Col2
        -3.7962832, -2.1325965, -9.748859, 1.0 //Col3
    ]);
});

QUnit.test("buildFPSView", function(assert)
{
    var eye = new Vec3().setFromValues(1.4, -4.3, 8.5);

    assert.bufferEqualish(this.mat.buildFPSView(eye, 0.7853982, 1.0471975).buffer, [
        0.5, 0.0, 0.8660254, 0.0,              //Col0
        0.6123724, 0.7071068, -0.3535534, 0.0, //Col1
        -0.6123724, 0.7071068, 0.3535534, 0.0, //Col2
        7.1383667, -2.9698484, -5.7379193, 1.0 //Col3
    ]);
});
