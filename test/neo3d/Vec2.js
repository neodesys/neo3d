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
var Vec2 = require("../../src/neo3d/Vec2");

QUnit.module("Vec2", {
    beforeEach: function()
    {
        this.vec = new Vec2();

        //randomVal is directly wrapped into a Float32Array to prevent further
        //truncating of float values from double-precision to single-precision
        this.randomVal = new Float32Array([
            10.0 * Math.random(),
            10.0 * Math.random()
        ]);
    }
});

QUnit.test("constants", function(assert)
{
    assert.equal(Vec2.NB_COMPONENTS, 2);
    assert.bufferEqual(Vec2.I.buffer, [1, 0]);
    assert.bufferEqual(Vec2.J.buffer, [0, 1]);
});

QUnit.test("createBuffer", function(assert)
{
    var buffer = Vec2.createBuffer(2);
    assert.equal(buffer.length, 2 * Vec2.NB_COMPONENTS);
    assert.bufferEqual(buffer, [0, 0, 0, 0]);
});

QUnit.test("setFromValues", function(assert)
{
    assert.bufferEqual(this.vec.setFromValues(this.randomVal[0], this.randomVal[1]).buffer, this.randomVal);
});

QUnit.test("setFromArray", function(assert)
{
    assert.bufferEqual(this.vec.setFromArray(this.randomVal).buffer, this.randomVal);
});

QUnit.test("setNull", function(assert)
{
    this.vec.setFromArray(this.randomVal);
    assert.bufferEqual(this.vec.setNull().buffer, [0, 0]);
});

QUnit.test("setOne", function(assert)
{
    this.vec.setFromArray(this.randomVal);
    assert.bufferEqual(this.vec.setOne().buffer, [1, 1]);
});

QUnit.test("copy", function(assert)
{
    var v2 = new Vec2().setFromArray(this.randomVal);
    assert.bufferEqual(this.vec.copy(v2).buffer, this.randomVal);
});

QUnit.test("isNull", function(assert)
{
    this.vec.setFromValues(0.0000001, 0.0000002);
    assert.ok(this.vec.isNull());

    this.vec.buffer[1] = 0.1;
    assert.notOk(this.vec.isNull());
});

QUnit.test("equals", function(assert)
{
    var v2 = new Vec2().setFromArray(this.randomVal);
    this.randomVal[1] += 0.9 * math.EPSILON;
    this.vec.setFromArray(this.randomVal);

    assert.ok(this.vec.equals(this.vec));

    assert.notBufferEqual(this.vec.buffer, v2.buffer);
    assert.bufferEqualish(this.vec.buffer, v2.buffer);
    assert.ok(this.vec.equals(v2));

    this.vec.buffer[1] += math.EPSILON;
    assert.bufferEqualish(this.vec.buffer, v2.buffer);
    assert.notOk(this.vec.equals(v2));

    this.vec.buffer[1] += 0.1;
    assert.notBufferEqualish(this.vec.buffer, v2.buffer);
    assert.notOk(this.vec.equals(v2));
});

QUnit.test("add", function(assert)
{
    var v0 = new Vec2().setFromValues(1.2, 1.6),
        v1 = new Vec2().setFromValues(0.6, 5.3);

    assert.bufferEqualish(this.vec.add(v0, v1).buffer, [1.8, 6.9]);
});

QUnit.test("addInPlace", function(assert)
{
    var v2 = new Vec2().setFromValues(0.6, 5.3);
    this.vec.setFromValues(1.2, 1.6);

    assert.bufferEqualish(this.vec.addInPlace(v2).buffer, [1.8, 6.9]);
});

QUnit.test("substract", function(assert)
{
    var v0 = new Vec2().setFromValues(2.6, 3.2),
        v1 = new Vec2().setFromValues(1.4, 2.1);

    assert.bufferEqualish(this.vec.substract(v0, v1).buffer, [1.2, 1.1]);
});

QUnit.test("substractInPlace", function(assert)
{
    var v2 = new Vec2().setFromValues(1.4, 2.1);
    this.vec.setFromValues(2.6, 3.2);

    assert.bufferEqualish(this.vec.substractInPlace(v2).buffer, [1.2, 1.1]);
});

QUnit.test("scale", function(assert)
{
    var v2 = new Vec2().setFromValues(4.5, 1.2);
    assert.bufferEqualish(this.vec.scale(2.1, v2).buffer, [9.45, 2.52]);
});

QUnit.test("scaleInPlace", function(assert)
{
    this.vec.setFromValues(4.5, 1.2);
    assert.bufferEqualish(this.vec.scaleInPlace(2.1).buffer, [9.45, 2.52]);
});

QUnit.test("addScaled", function(assert)
{
    var v0 = new Vec2().setFromValues(2.6, 3.2),
        v1 = new Vec2().setFromValues(1.4, 2.1);

    assert.bufferEqualish(this.vec.addScaled(v0, 2.1, v1).buffer, [5.54, 7.61]);
});

QUnit.test("addScaledInPlace", function(assert)
{
    var v2 = new Vec2().setFromValues(1.4, 2.1);
    this.vec.setFromValues(2.6, 3.2);

    assert.bufferEqualish(this.vec.addScaledInPlace(2.1, v2).buffer, [5.54, 7.61]);
});

QUnit.test("negate", function(assert)
{
    var v0 = new Vec2().setFromArray(this.randomVal),
        v1 = new Vec2().negate(v0);

    this.randomVal[0] = -this.randomVal[0];
    this.randomVal[1] = -this.randomVal[1];

    assert.bufferEqual(v1.buffer, this.randomVal);
    assert.bufferEqual(this.vec.negate(v1).buffer, v0.buffer);
});

QUnit.test("negateInPlace", function(assert)
{
    this.vec.setFromArray(this.randomVal);

    this.randomVal[0] = -this.randomVal[0];
    this.randomVal[1] = -this.randomVal[1];

    assert.bufferEqual(this.vec.negateInPlace().buffer, this.randomVal);
});

QUnit.test("squareDistance", function(assert)
{
    var v2 = new Vec2().setFromValues(1.8, 2.4);
    this.vec.setFromValues(0.7, 2.2);

    assert.equalish(this.vec.squareDistance(v2), 1.25);
});

QUnit.test("distance", function(assert)
{
    var v2 = new Vec2().setFromValues(1.8, 2.4);
    this.vec.setFromValues(0.7, 2.2);

    assert.equalish(this.vec.distance(v2), 1.118034);
});

QUnit.test("squareNorm", function(assert)
{
    this.vec.setFromValues(2.8, 6.1);
    assert.equalish(this.vec.squareNorm(), 45.05);
});

QUnit.test("norm", function(assert)
{
    this.vec.setFromValues(2.8, 6.1);
    assert.equalish(this.vec.norm(), 6.7119297);
});

QUnit.test("normalize", function(assert)
{
    var v2 = new Vec2().setFromValues(8.6, 4.5);
    assert.bufferEqualish(this.vec.normalize(v2).buffer, [0.8860331, 0.463622]);
    assert.equalish(this.vec.norm(), 1.0);

    v2.setFromValues(0.0000001, 0.0000002);
    assert.bufferEqual(this.vec.normalize(v2).buffer, [0, 0]);
});

QUnit.test("normalizeInPlace", function(assert)
{
    this.vec.setFromValues(8.6, 4.5);
    assert.bufferEqualish(this.vec.normalizeInPlace().buffer, [0.8860331, 0.463622]);
    assert.equalish(this.vec.norm(), 1.0);

    this.vec.setFromValues(0.0000001, 0.0000002);
    assert.bufferEqual(this.vec.normalizeInPlace().buffer, [0, 0]);
});

QUnit.test("dotProduct", function(assert)
{
    var v2 = new Vec2().setFromValues(1.5, 0.6);
    this.vec.setFromValues(8.4, 7.3);

    assert.equalish(this.vec.dotProduct(v2), 16.98);
});

QUnit.test("shortestAngle", function(assert)
{
    var v2 = new Vec2().setFromValues(6.3, -4.7);
    assert.notEqualish(v2.norm(), 1.0);
    this.vec.setFromValues(0.0000001, 0.0000002);

    assert.equal(this.vec.shortestAngle(v2), 0.0);
    assert.equal(v2.shortestAngle(this.vec), 0.0);

    this.vec.setFromValues(1.4, 2.2);
    assert.notEqualish(this.vec.norm(), 1.0);

    assert.equalish(this.vec.shortestAngle(v2), 1.6450237);
    assert.equalish(v2.shortestAngle(this.vec), 1.6450237);

    this.vec.negateInPlace();
    assert.equalish(this.vec.shortestAngle(v2), math.PI - 1.6450237);

    this.vec.setFromValues(0.6, 0.8042553); //perpendicular to v2
    assert.equal(this.vec.shortestAngle(v2), math.HALF_PI);

    this.vec.copy(v2).scaleInPlace(1.3); //colinear to v2, same direction
    assert.equal(this.vec.shortestAngle(v2), 0.0);

    this.vec.negateInPlace(); //colinear to v2, opposite direction
    assert.equal(this.vec.shortestAngle(v2), math.PI);
});

QUnit.test("isPerpendicular", function(assert)
{
    assert.ok(Vec2.I.isPerpendicular(Vec2.J));
    assert.ok(Vec2.J.isPerpendicular(Vec2.I));

    var v2 = new Vec2().setFromValues(1.5, 2.4);
    assert.notOk(this.vec.isPerpendicular(v2));
    assert.notOk(v2.isPerpendicular(this.vec));

    this.vec.setFromValues(2.3, -1.4375);
    assert.ok(this.vec.isPerpendicular(v2));
    assert.ok(v2.isPerpendicular(this.vec));

    this.vec.buffer[0] = 2.4;
    assert.notOk(this.vec.isPerpendicular(v2));
});

QUnit.test("isColinear", function(assert)
{
    var v2 = new Vec2().setFromValues(1.5, 2.4);
    assert.notOk(this.vec.isColinear(v2));
    assert.notOk(v2.isColinear(this.vec));

    this.vec.setFromValues(3.45, 5.52);
    assert.ok(this.vec.isColinear(v2));
    assert.ok(v2.isColinear(this.vec));

    this.vec.scaleInPlace(-2.3);
    assert.ok(this.vec.isColinear(v2));
    assert.ok(v2.isColinear(this.vec));

    this.vec.buffer[0] = 3.5;
    assert.notOk(this.vec.isColinear(v2));
});

QUnit.test("linear", function(assert)
{
    var p0 = new Vec2().setFromValues(0.2, 4.7),
        p1 = new Vec2().setFromValues(1.7, -2.8);

    assert.bufferEqual(this.vec.linear(p0, 0, p1).buffer, p0.buffer);
    assert.bufferEqualish(this.vec.linear(p0, 0.4, p1).buffer, [0.8, 1.7]);
    assert.bufferEqual(this.vec.linear(p0, 1, p1).buffer, p1.buffer);
});

QUnit.test("quadratic", function(assert)
{
    var p0 = new Vec2().setFromValues(1.3, -0.4),
        p1 = new Vec2().setFromValues(2.4, 1.2),
        p2 = new Vec2().setFromValues(3.5, 0.4);

    assert.bufferEqual(this.vec.quadratic(p0, p1, -1, p2).buffer, p0.buffer);
    assert.bufferEqual(this.vec.quadratic(p0, p1, 0, p2).buffer, p1.buffer);
    assert.bufferEqualish(this.vec.quadratic(p0, p1, 0.6, p2).buffer, [3.06, 1.008]);
    assert.bufferEqual(this.vec.quadratic(p0, p1, 1, p2).buffer, p2.buffer);
});

QUnit.test("hermite", function(assert)
{
    var t0 = new Vec2().setFromValues(1.5, -0.5),
        p0 = new Vec2().setFromValues(2.1, 3.2),
        p1 = new Vec2().setFromValues(4.2, 1.4),
        t1 = new Vec2().setFromValues(1.55, -0.45);

    assert.bufferEqual(this.vec.hermite(t0, p0, 0, p1, t1).buffer, p0.buffer);
    assert.bufferEqualish(this.vec.hermite(t0, p0, 0.3, p1, t1).buffer, [2.6764498, 2.7660501]);
    assert.bufferEqual(this.vec.hermite(t0, p0, 1, p1, t1).buffer, p1.buffer);
});

QUnit.test("bezier", function(assert)
{
    var ctrl0 = new Vec2().setFromValues(2.6, 3.0333333),
        p0 = new Vec2().setFromValues(2.1, 3.2),
        p1 = new Vec2().setFromValues(4.2, 1.4),
        ctrl1 = new Vec2().setFromValues(3.6833333, 1.55);

    assert.bufferEqual(this.vec.bezier(ctrl0, p0, 0, p1, ctrl1).buffer, p0.buffer);
    assert.bufferEqualish(this.vec.bezier(ctrl0, p0, 0.3, p1, ctrl1).buffer, [2.6764498, 2.7660501]);
    assert.bufferEqual(this.vec.bezier(ctrl0, p0, 1, p1, ctrl1).buffer, p1.buffer);
});

QUnit.test("catmullRom", function(assert)
{
    var p0 = new Vec2().setFromValues(1.2, 2.4),
        p1 = new Vec2().setFromValues(2.1, 3.2),
        p2 = new Vec2().setFromValues(4.2, 1.4),
        p3 = new Vec2().setFromValues(5.2, 2.3);

    assert.bufferEqual(this.vec.catmullRom(p0, p1, 0, p2, p3).buffer, p1.buffer);
    assert.bufferEqualish(this.vec.catmullRom(p0, p1, 0.3, p2, p3).buffer, [2.6764498, 2.7660501]);
    assert.bufferEqual(this.vec.catmullRom(p0, p1, 1, p2, p3).buffer, p2.buffer);
});
