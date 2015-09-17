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

QUnit.module("Vec3", {
	beforeEach: function()
	{
		this.vec = new neo3d.Vec3();

		//randomVal is directly wrapped into a Float32Array to prevent further
		//truncating of float values from double-precision to single-precision
		this.randomVal = new Float32Array([
			10.0 * Math.random(),
			10.0 * Math.random(),
			10.0 * Math.random()
		]);
	}
});

QUnit.test("constants", function(assert)
{
	assert.equal(neo3d.Vec3.NB_COMPONENTS, 3);
	assert.bufferEqual(neo3d.Vec3.I.buffer, [1, 0, 0]);
	assert.bufferEqual(neo3d.Vec3.J.buffer, [0, 1, 0]);
	assert.bufferEqual(neo3d.Vec3.K.buffer, [0, 0, 1]);
});

QUnit.test("createBuffer", function(assert)
{
	var buffer = neo3d.Vec3.createBuffer(2);
	assert.equal(buffer.length, 2 * neo3d.Vec3.NB_COMPONENTS);
	assert.bufferEqual(buffer, [0, 0, 0, 0, 0, 0]);
});

QUnit.test("setFromValues", function(assert)
{
	assert.bufferEqual(this.vec.setFromValues(this.randomVal[0], this.randomVal[1], this.randomVal[2]).buffer, this.randomVal);
});

QUnit.test("setFromArray", function(assert)
{
	assert.bufferEqual(this.vec.setFromArray(this.randomVal).buffer, this.randomVal);
});

QUnit.test("setFromVec2Pos", function(assert)
{
	var v2 = new neo3d.Vec2().setFromArray(this.randomVal);

	this.randomVal[2] = 1;
	assert.bufferEqual(this.vec.setFromVec2Pos(v2).buffer, this.randomVal);
});

QUnit.test("setFromVec2Dir", function(assert)
{
	var v2 = new neo3d.Vec2().setFromArray(this.randomVal);

	this.randomVal[2] = 0;
	assert.bufferEqual(this.vec.setFromVec2Dir(v2).buffer, this.randomVal);
});

QUnit.test("setNull", function(assert)
{
	this.vec.setFromArray(this.randomVal);
	assert.bufferEqual(this.vec.setNull().buffer, [0, 0, 0]);
});

QUnit.test("setOne", function(assert)
{
	this.vec.setFromArray(this.randomVal);
	assert.bufferEqual(this.vec.setOne().buffer, [1, 1, 1]);
});

QUnit.test("copy", function(assert)
{
	var v3 = new neo3d.Vec3().setFromArray(this.randomVal);
	assert.bufferEqual(this.vec.copy(v3).buffer, this.randomVal);
});

QUnit.test("isNull", function(assert)
{
	assert.ok(this.vec.isNull());
});

QUnit.test("equals", function(assert)
{
	var v3 = new neo3d.Vec3().setFromArray(this.randomVal);
	this.randomVal[1] += 0.9 * neo3d.EPSILON;
	this.vec.setFromArray(this.randomVal);

	assert.notBufferEqual(this.vec.buffer, v3.buffer);
	assert.bufferEqualish(this.vec.buffer, v3.buffer);
	assert.ok(this.vec.equals(v3));
});

QUnit.test("add", function(assert)
{
	var v0 = new neo3d.Vec3().setFromValues(1.2, 1.6, 3.2),
		v1 = new neo3d.Vec3().setFromValues(0.6, 5.3, 1.6);

	assert.bufferEqualish(this.vec.add(v0, v1).buffer, [1.8, 6.9, 4.8]);
});

QUnit.test("addInPlace", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(0.6, 5.3, 1.6);
	this.vec.setFromValues(1.2, 1.6, 3.2);

	assert.bufferEqualish(this.vec.addInPlace(v3).buffer, [1.8, 6.9, 4.8]);
});

QUnit.test("substract", function(assert)
{
	var v0 = new neo3d.Vec3().setFromValues(2.6, 3.2, 0.6),
		v1 = new neo3d.Vec3().setFromValues(1.4, 2.1, 1.4);

	assert.bufferEqualish(this.vec.substract(v0, v1).buffer, [1.2, 1.1, -0.8]);
});

QUnit.test("substractInPlace", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(1.4, 2.1, 1.4);
	this.vec.setFromValues(2.6, 3.2, 0.6);

	assert.bufferEqualish(this.vec.substractInPlace(v3).buffer, [1.2, 1.1, -0.8]);
});

QUnit.test("scale", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(4.5, 1.2, 6.7);
	assert.bufferEqualish(this.vec.scale(2.1, v3).buffer, [9.45, 2.52, 14.07]);
});

QUnit.test("scaleInPlace", function(assert)
{
	this.vec.setFromValues(4.5, 1.2, 6.7);
	assert.bufferEqualish(this.vec.scaleInPlace(2.1).buffer, [9.45, 2.52, 14.07]);
});

QUnit.test("addScaled", function(assert)
{
	var v0 = new neo3d.Vec3().setFromValues(2.6, 3.2, 0.6),
		v1 = new neo3d.Vec3().setFromValues(1.4, 2.1, 1.4);

	assert.bufferEqualish(this.vec.addScaled(v0, 2.1, v1).buffer, [5.54, 7.61, 3.54]);
});

QUnit.test("addScaledInPlace", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(1.4, 2.1, 1.4);
	this.vec.setFromValues(2.6, 3.2, 0.6);

	assert.bufferEqualish(this.vec.addScaledInPlace(2.1, v3).buffer, [5.54, 7.61, 3.54]);
});

QUnit.test("negate", function(assert)
{
	var v0 = new neo3d.Vec3().setFromArray(this.randomVal),
		v1 = new neo3d.Vec3().negate(v0);

	this.randomVal[0] = -this.randomVal[0];
	this.randomVal[1] = -this.randomVal[1];
	this.randomVal[2] = -this.randomVal[2];

	assert.bufferEqual(v1.buffer, this.randomVal);
	assert.bufferEqual(this.vec.negate(v1).buffer, v0.buffer);
});

QUnit.test("negateInPlace", function(assert)
{
	this.vec.setFromArray(this.randomVal);

	this.randomVal[0] = -this.randomVal[0];
	this.randomVal[1] = -this.randomVal[1];
	this.randomVal[2] = -this.randomVal[2];

	assert.bufferEqual(this.vec.negateInPlace().buffer, this.randomVal);
});

QUnit.test("squareDistance", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(1.8, 2.4, 0.7);
	this.vec.setFromValues(0.7, 2.2, 7.1);

	assert.equalish(this.vec.squareDistance(v3), 42.21);
});

QUnit.test("distance", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(1.8, 2.4, 0.7);
	this.vec.setFromValues(0.7, 2.2, 7.1);

	assert.equalish(this.vec.distance(v3), 6.4969223);
});

QUnit.test("squareNorm", function(assert)
{
	this.vec.setFromValues(2.8, 6.1, 5.3);
	assert.equalish(this.vec.squareNorm(), 73.14);
});

QUnit.test("norm", function(assert)
{
	this.vec.setFromValues(2.8, 6.1, 5.3);
	assert.equalish(this.vec.norm(), 8.5521927);
});

QUnit.test("normalize", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(8.6, 4.5, 1.7);
	assert.bufferEqualish(this.vec.normalize(v3).buffer, [0.8727479, 0.4566704, 0.1725199]);
	assert.equalish(this.vec.norm(), 1.0);
});

QUnit.test("normalizeInPlace", function(assert)
{
	this.vec.setFromValues(8.6, 4.5, 1.7);
	assert.bufferEqualish(this.vec.normalizeInPlace().buffer, [0.8727479, 0.4566704, 0.1725199]);
	assert.equalish(this.vec.norm(), 1.0);
});

QUnit.test("dotProduct", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(1.5, 0.6, 1.7);
	this.vec.setFromValues(8.4, 7.3, 2.4);

	assert.equalish(this.vec.dotProduct(v3), 21.06);
});

QUnit.test("crossProduct", function(assert)
{
	var v0 = new neo3d.Vec3().setFromValues(1.4, 2.2, -1.3),
		v1 = new neo3d.Vec3().setFromValues(6.3, -4.7, 2.1);

	assert.bufferEqualish(this.vec.crossProduct(v0, v1).buffer, [-1.49, -11.13, -20.44]);
	assert.bufferEqualish(this.vec.crossProduct(v1, v0).buffer, [1.49, 11.13, 20.44]);
});

QUnit.test("crossProductInPlace", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(6.3, -4.7, 2.1);
	this.vec.setFromValues(1.4, 2.2, -1.3);

	assert.bufferEqualish(this.vec.crossProductInPlace(v3).buffer, [-1.49, -11.13, -20.44]);
});

QUnit.test("shortestAngle", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(6.3, -4.7, 2.1);
	assert.equal(this.vec.shortestAngle(v3), 0);

	this.vec.setFromValues(1.4, 2.2, -1.3);
	assert.equalish(this.vec.shortestAngle(v3), 1.7510538);
});

QUnit.test("isPerpendicular", function(assert)
{
	assert.ok(neo3d.Vec3.I.isPerpendicular(neo3d.Vec3.J));
	assert.ok(neo3d.Vec3.J.isPerpendicular(neo3d.Vec3.K));
	assert.ok(neo3d.Vec3.K.isPerpendicular(neo3d.Vec3.I));

	var v3 = new neo3d.Vec3().setFromValues(1.5, 2.4, -1.1);
	this.vec.setFromValues(2.3, 5.1, 14.2636364);
	assert.ok(this.vec.isPerpendicular(v3));

	this.vec.buffer[0] = 2.4;
	assert.notOk(this.vec.isPerpendicular(v3));
});

QUnit.test("isColinear", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(1.5, 2.4, -1.1);
	this.vec.setFromValues(3.45, 5.52, -2.53);
	assert.ok(this.vec.isColinear(v3));

	this.vec.buffer[0] = 3.5;
	assert.notOk(this.vec.isColinear(v3));
});

QUnit.test("linear", function(assert)
{
	var p0 = new neo3d.Vec3().setFromValues(0.2, 4.7, 2.2),
		p1 = new neo3d.Vec3().setFromValues(1.7, -2.8, 2.7);

	assert.bufferEqual(this.vec.linear(p0, 0, p1).buffer, p0.buffer);
	assert.bufferEqualish(this.vec.linear(p0, 0.4, p1).buffer, [0.8, 1.7, 2.4]);
	assert.bufferEqual(this.vec.linear(p0, 1, p1).buffer, p1.buffer);
});

QUnit.test("quadratic", function(assert)
{
	var p0 = new neo3d.Vec3().setFromValues(1.3, -0.4, 2.5),
		p1 = new neo3d.Vec3().setFromValues(2.4, 1.2, 4.7),
		p2 = new neo3d.Vec3().setFromValues(3.5, 0.4, 6.9);

	assert.bufferEqual(this.vec.quadratic(p0, p1, -1, p2).buffer, p0.buffer);
	assert.bufferEqual(this.vec.quadratic(p0, p1, 0, p2).buffer, p1.buffer);
	assert.bufferEqualish(this.vec.quadratic(p0, p1, 0.6, p2).buffer, [3.06, 1.008, 6.02]);
	assert.bufferEqual(this.vec.quadratic(p0, p1, 1, p2).buffer, p2.buffer);
});

QUnit.test("hermite", function(assert)
{
	var t0 = new neo3d.Vec3().setFromValues(1.5, -0.5, -2.85),
		p0 = new neo3d.Vec3().setFromValues(2.1, 3.2, 4.1),
		p1 = new neo3d.Vec3().setFromValues(4.2, 1.4, -2.6),
		t1 = new neo3d.Vec3().setFromValues(1.55, -0.45, -3.65);

	assert.bufferEqual(this.vec.hermite(t0, p0, 0, p1, t1).buffer, p0.buffer);
	assert.bufferEqualish(this.vec.hermite(t0, p0, 0.3, p1, t1).buffer, [2.6764498, 2.7660501, 2.4637999]);
	assert.bufferEqual(this.vec.hermite(t0, p0, 1, p1, t1).buffer, p1.buffer);
});

QUnit.test("bezier", function(assert)
{
	var ctrl0 = new neo3d.Vec3().setFromValues(2.6, 3.0333333, 3.15),
		p0 = new neo3d.Vec3().setFromValues(2.1, 3.2, 4.1),
		p1 = new neo3d.Vec3().setFromValues(4.2, 1.4, -2.6),
		ctrl1 = new neo3d.Vec3().setFromValues(3.6833333, 1.55, -1.3833333);

	assert.bufferEqual(this.vec.bezier(ctrl0, p0, 0, p1, ctrl1).buffer, p0.buffer);
	assert.bufferEqualish(this.vec.bezier(ctrl0, p0, 0.3, p1, ctrl1).buffer, [2.6764498, 2.7660501, 2.4637999]);
	assert.bufferEqual(this.vec.bezier(ctrl0, p0, 1, p1, ctrl1).buffer, p1.buffer);
});

QUnit.test("catmullRom", function(assert)
{
	var p0 = new neo3d.Vec3().setFromValues(1.2, 2.4, 3.1),
		p1 = new neo3d.Vec3().setFromValues(2.1, 3.2, 4.1),
		p2 = new neo3d.Vec3().setFromValues(4.2, 1.4, -2.6),
		p3 = new neo3d.Vec3().setFromValues(5.2, 2.3, -3.2);

	assert.bufferEqual(this.vec.catmullRom(p0, p1, 0, p2, p3).buffer, p1.buffer);
	assert.bufferEqualish(this.vec.catmullRom(p0, p1, 0.3, p2, p3).buffer, [2.6764498, 2.7660501, 2.4637999]);
	assert.bufferEqual(this.vec.catmullRom(p0, p1, 1, p2, p3).buffer, p2.buffer);
});
