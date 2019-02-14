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
var Mat2 = require("../../src/neo3d/Mat2");
var Mat3 = require("../../src/neo3d/Mat3");
var Vec2 = require("../../src/neo3d/Vec2");

QUnit.module("Mat2", {
    beforeEach: function()
    {
        this.mat = new Mat2();

        //randomVal is directly wrapped into a Float32Array to prevent further
        //truncating of float values from double-precision to single-precision
        this.randomVal = new Float32Array([
            10.0 * Math.random(),
            10.0 * Math.random(),

            10.0 * Math.random(),
            10.0 * Math.random()
        ]);
    }
});

QUnit.test("constants", function(assert)
{
    assert.equal(Mat2.NB_COMPONENTS, 4);
    assert.bufferEqual(Mat2.IDENTITY.buffer, [1, 0, 0, 1]);
});

QUnit.test("createBuffer", function(assert)
{
    var buffer = Mat2.createBuffer(2);
    assert.equal(buffer.length, 2 * Mat2.NB_COMPONENTS);
    assert.bufferEqual(buffer, [1, 0, 0, 1, 1, 0, 0, 1]);
});

QUnit.test("setFromArray", function(assert)
{
    assert.bufferEqual(this.mat.setFromArray(this.randomVal).buffer, this.randomVal);
});

QUnit.test("setColumnVec2", function(assert)
{
    var v0 = new Vec2().setFromValues(this.randomVal[0], this.randomVal[1]),
        v1 = new Vec2().setFromValues(this.randomVal[2], this.randomVal[3]);

    this.mat.setColumnVec2(0, v0);
    this.mat.setColumnVec2(1, v1);

    assert.bufferEqual(this.mat.buffer, this.randomVal);
});

QUnit.test("setFromColumnsVec2", function(assert)
{
    var v0 = new Vec2().setFromValues(this.randomVal[0], this.randomVal[1]),
        v1 = new Vec2().setFromValues(this.randomVal[2], this.randomVal[3]);

    assert.bufferEqual(this.mat.setFromColumnsVec2(v0, v1).buffer, this.randomVal);
});

QUnit.test("setFromRotAngle", function(assert)
{
    assert.bufferEqualish(this.mat.setFromRotAngle(1.0471975).buffer, [
        0.5, 0.8660254, //Col0
        -0.8660254, 0.5 //Col1
    ]);
});

QUnit.test("setFromMat3RotScale", function(assert)
{
    var m3 = new Mat3().setFromArray([
        0.5, 0.8660254, 0.0,  //Col0
        -0.8660254, 0.5, 0.0, //Col1
        1.2, -3.4, 1.0        //Col2
    ]);

    assert.bufferEqual(this.mat.setFromMat3RotScale(m3).buffer, [
        0.5, 0.8660254, //Col0
        -0.8660254, 0.5 //Col1
    ]);
});

QUnit.test("setFromRSTransfo", function(assert)
{
    var s = new Vec2().setFromValues(1.2, 2.3);

    assert.bufferEqualish(this.mat.setFromRSTransfo(1.0471975, s).buffer, [
        0.6, 1.0392305,  //Col0
        -1.9918584, 1.15 //Col1
    ]);
});

QUnit.test("setIdentity", function(assert)
{
    this.mat.setFromArray(this.randomVal);
    assert.bufferEqual(this.mat.setIdentity().buffer, [1, 0, 0, 1]);
});

QUnit.test("copy", function(assert)
{
    var m2 = new Mat2().setFromArray(this.randomVal);
    assert.bufferEqual(this.mat.copy(m2).buffer, this.randomVal);
});

QUnit.test("getRSTransfo", function(assert)
{
    var s = new Vec2();

    this.mat.setFromArray([
        0.6, 1.0392305,  //Col0
        -1.9918584, 1.15 //Col1
    ]);

    assert.equalish(this.mat.getRSTransfo(s), 1.0471975);
    assert.bufferEqualish(s.buffer, [1.2, 2.3]);
});

QUnit.test("normalizeRSTransfo", function(assert)
{
    var m2 = new Mat2().setFromArray([
        0.60001, 1.03924, //Col0
        -1.99185, 1.15002 //Col1
    ]);

    var buffer = [
        0.6, 1.0392305,  //Col0
        -1.9918584, 1.15 //Col1
    ];

    assert.notBufferEqualish(m2.buffer, buffer);
    assert.bufferEqualish(this.mat.normalizeRSTransfo(m2).buffer, buffer);
});

QUnit.test("normalizeRSTransfoInPlace", function(assert)
{
    this.mat.setFromArray([
        0.60001, 1.03924, //Col0
        -1.99185, 1.15002 //Col1
    ]);

    var buffer = [
        0.6, 1.0392305,  //Col0
        -1.9918584, 1.15 //Col1
    ];

    assert.notBufferEqualish(this.mat.buffer, buffer);
    assert.bufferEqualish(this.mat.normalizeRSTransfoInPlace().buffer, buffer);
});

QUnit.test("isIdentity", function(assert)
{
    this.mat.setFromArray([
        1.0000001, -0.0000002, //Col0
        0.0000001, 0.9999998   //Col1
    ]);
    assert.ok(this.mat.isIdentity());

    this.mat.buffer[1] = 0.1;
    assert.notOk(this.mat.isIdentity());
});

QUnit.test("equals", function(assert)
{
    var m2 = new Mat2().setFromArray(this.randomVal);
    this.randomVal[1] += 0.9 * math.EPSILON;
    this.mat.setFromArray(this.randomVal);

    assert.ok(this.mat.equals(this.mat));

    assert.notBufferEqual(this.mat.buffer, m2.buffer);
    assert.bufferEqualish(this.mat.buffer, m2.buffer);
    assert.ok(this.mat.equals(m2));

    this.mat.buffer[1] += math.EPSILON;
    assert.bufferEqualish(this.mat.buffer, m2.buffer);
    assert.notOk(this.mat.equals(m2));

    this.mat.buffer[1] += 0.1;
    assert.notBufferEqualish(this.mat.buffer, m2.buffer);
    assert.notOk(this.mat.equals(m2));
});

QUnit.test("multiply", function(assert)
{
    var m0 = new Mat2().setFromArray([
        1.2, 0.5, //Col0
        -0.5, 2.7 //Col1
    ]),
        m1 = new Mat2().setFromArray([
            -4.1, 4.4, //Col0
            2.7, 0.2   //Col1
        ]);

    assert.bufferEqualish(this.mat.multiply(m0, m1).buffer, [
        -7.12, 9.83, //Col0
        3.14, 1.89   //Col1
    ]);

    assert.bufferEqualish(this.mat.multiply(m1, m0).buffer, [
        -3.57, 5.38, //Col0
        9.34, -1.66  //Col1
    ]);
});

QUnit.test("multiplyInPlace", function(assert)
{
    var m2 = new Mat2().setFromArray([
        -4.1, 4.4, //Col0
        2.7, 0.2   //Col1
    ]);

    this.mat.setFromArray([
        1.2, 0.5, //Col0
        -0.5, 2.7 //Col1
    ]);

    assert.bufferEqualish(this.mat.multiplyInPlace(m2).buffer, [
        -7.12, 9.83, //Col0
        3.14, 1.89   //Col1
    ]);
});

QUnit.test("invert", function(assert)
{
    var m2 = new Mat2();
    assert.bufferEqual(this.mat.invert(m2).buffer, [1, 0, 0, 1]);

    //det = +math.EPSILON
    m2.setFromArray([
        -4.1, 8.2, //Col0
        2.7, -5.4  //Col1
    ]);
    assert.bufferEqual(this.mat.invert(m2).buffer, [
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY
    ]);

    //det = -math.EPSILON
    m2.setFromArray([
        -4.1, 4.4, //Col0
        -0.0000033, 0.0000036 //Col1
    ]);
    assert.bufferEqual(this.mat.invert(m2).buffer, [
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY
    ]);

    //det != 0
    m2.setFromArray([
        -4.1, 4.4, //Col0
        2.7, 0.2   //Col1
    ]);
    assert.bufferEqualish(this.mat.invert(m2).buffer, [
        -0.015748, 0.3464567, //Col0
        0.2125984, 0.3228346  //Col1
    ]);

    assert.ok(this.mat.multiplyInPlace(m2).isIdentity());
});

QUnit.test("invertInPlace", function(assert)
{
    assert.bufferEqual(this.mat.invertInPlace().buffer, [1, 0, 0, 1]);

    //det = +math.EPSILON
    this.mat.setFromArray([
        -4.1, 8.2, //Col0
        2.7, -5.4  //Col1
    ]);
    assert.bufferEqual(this.mat.invertInPlace().buffer, [
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY
    ]);

    //det = -math.EPSILON
    this.mat.setFromArray([
        -4.1, 4.4, //Col0
        -0.0000033, 0.0000036 //Col1
    ]);
    assert.bufferEqual(this.mat.invertInPlace().buffer, [
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY
    ]);

    //det != 0
    this.mat.setFromArray([
        -4.1, 4.4, //Col0
        2.7, 0.2   //Col1
    ]);
    assert.bufferEqualish(this.mat.invertInPlace().buffer, [
        -0.015748, 0.3464567, //Col0
        0.2125984, 0.3228346  //Col1
    ]);
});

QUnit.test("transpose", function(assert)
{
    assert.bufferEqual(this.mat.transpose(Mat2.IDENTITY).buffer, [1, 0, 0, 1]);

    var m2 = new Mat2().setFromArray(this.randomVal);
    this.mat.transpose(m2);

    assert.equal(this.mat.buffer[0], this.randomVal[0]);
    assert.equal(this.mat.buffer[1], this.randomVal[2]);
    assert.equal(this.mat.buffer[2], this.randomVal[1]);
    assert.equal(this.mat.buffer[3], this.randomVal[3]);
});

QUnit.test("transposeInPlace", function(assert)
{
    assert.bufferEqual(this.mat.transposeInPlace().buffer, [1, 0, 0, 1]);

    this.mat.setFromArray(this.randomVal).transposeInPlace();

    assert.equal(this.mat.buffer[0], this.randomVal[0]);
    assert.equal(this.mat.buffer[1], this.randomVal[2]);
    assert.equal(this.mat.buffer[2], this.randomVal[1]);
    assert.equal(this.mat.buffer[3], this.randomVal[3]);
});

QUnit.test("transformVec2", function(assert)
{
    var v0 = new Vec2().setFromValues(1.3, -5.4),
        v1 = new Vec2();

    this.mat.setFromArray([
        1.2, 0.5, //Col0
        -0.5, 2.7 //Col1
    ]);

    assert.bufferEqualish(this.mat.transformVec2(v1, v0).buffer, [4.26, -13.93]);
});

QUnit.test("transformVec2InPlace", function(assert)
{
    var v2 = new Vec2().setFromValues(1.3, -5.4);

    this.mat.setFromArray([
        1.2, 0.5, //Col0
        -0.5, 2.7 //Col1
    ]);

    assert.bufferEqualish(this.mat.transformVec2InPlace(v2).buffer, [4.26, -13.93]);
});
