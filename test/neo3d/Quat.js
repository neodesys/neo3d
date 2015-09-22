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

QUnit.module("Quat", {
	beforeEach: function()
	{
		this.quat = new neo3d.Quat();

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
	assert.equal(neo3d.Quat.NB_COMPONENTS, 4);
	assert.bufferEqual(neo3d.Quat.IDENTITY.buffer, [0, 0, 0, 1]);
});

QUnit.test("createBuffer", function(assert)
{
	var buffer = neo3d.Quat.createBuffer(2);
	assert.equal(buffer.length, 2 * neo3d.Quat.NB_COMPONENTS);
	assert.bufferEqual(buffer, [0, 0, 0, 1, 0, 0, 0, 1]);
});

QUnit.test("setFromValues", function(assert)
{
	assert.bufferEqual(this.quat.setFromValues(this.randomVal[0], this.randomVal[1], this.randomVal[2], this.randomVal[3]).buffer, this.randomVal);
});

QUnit.test("setFromArray", function(assert)
{
	assert.bufferEqual(this.quat.setFromArray(this.randomVal).buffer, this.randomVal);
});

QUnit.test("setFromAxisAndAngle", function(assert)
{
	var axis = new neo3d.Vec3().setFromValues(0.0000001, 0.0000002, 0.0000003);
	assert.bufferEqual(this.quat.setFromAxisAndAngle(axis, 1.1).buffer, [0, 0, 0, 1]);

	axis.setFromValues(0.2, 2.1, -1.4);
	assert.notEqualish(axis.norm(), 1.0);

	assert.bufferEqualish(this.quat.setFromAxisAndAngle(axis, 1.1).buffer, [0.0412898, 0.433543, -0.2890287, 0.8525245]);
	assert.equalish(this.quat.norm(), 1.0);
});

QUnit.test("setFromRotationTo", function(assert)
{
	var v0 = new neo3d.Vec3().setFromValues(0.0000001, 0.0000002, 0.0000003),
		v1 = new neo3d.Vec3().setFromValues(0.0000001, 0.0000002, 0.0000003);

	assert.bufferEqual(this.quat.setFromRotationTo(v0, v1).buffer, [0, 0, 0, 1]);

	v0.setFromValues(-1.3, 2.4, -0.8);
	assert.notEqualish(v0.norm(), 1.0);
	assert.bufferEqual(this.quat.setFromRotationTo(v0, v1).buffer, [0, 0, 0, 1]);

	v1.scale(1.3, v0);
	assert.bufferEqual(this.quat.setFromRotationTo(v0, v1).buffer, [0, 0, 0, 1]);

	v1.scale(-0.6, v0);
	assert.bufferEqualish(this.quat.setFromRotationTo(v0, v1).buffer, [0.0, 0.3162278, 0.9486833, 0.0]);
	assert.equalish(this.quat.norm(), 1.0);

	v1.setFromValues(2.1, 4.7, 1.9);
	assert.notEqualish(v1.norm(), 1.0);
	assert.bufferEqualish(this.quat.setFromRotationTo(v0, v1).buffer, [0.3129901, 0.029719, -0.4194518, 0.8515951]);
	assert.equalish(this.quat.norm(), 1.0);

	assert.bufferEqualish(this.quat.setFromRotationTo(v1, v0).buffer, [-0.3129901, -0.029719, 0.4194518, 0.8515951]);
});

QUnit.test("setFromRotationMat3", function(assert)
{
	var m3 = new neo3d.Mat3().setFromArray([
		0.4570058, -0.4570062, -0.7630799, //Col0
		0.5286098, 0.8295152, -0.1802115,  //Col1
		0.7153442, -0.3210138, 0.6206712   //Col2
	]);

	assert.bufferEqualish(this.quat.setFromRotationMat3(m3).buffer, [0.0412898, 0.433543, -0.2890287, 0.8525245]);
	assert.equalish(this.quat.norm(), 1.0);
});

QUnit.test("setFromRotationMat4", function(assert)
{
	var m4 = new neo3d.Mat4().setFromArray([
		0.4570058, -0.4570062, -0.7630799, 0.0, //Col0
		0.5286098, 0.8295152, -0.1802115, 0.0,  //Col1
		0.7153442, -0.3210138, 0.6206712, 0.0,  //Col2
		-0.5135491, 2.7135415, 5.2465465, 1.0   //Col3
	]);

	assert.bufferEqualish(this.quat.setFromRotationMat4(m4).buffer, [0.0412898, 0.433543, -0.2890287, 0.8525245]);
	assert.equalish(this.quat.norm(), 1.0);
});

QUnit.test("setIdentity", function(assert)
{
	this.quat.setFromArray(this.randomVal);
	assert.bufferEqual(this.quat.setIdentity().buffer, [0, 0, 0, 1]);
});

QUnit.test("copy", function(assert)
{
	var q = new neo3d.Quat().setFromArray(this.randomVal);
	assert.bufferEqual(this.quat.copy(q).buffer, this.randomVal);
});

QUnit.test("getAxisAndAngle", function(assert)
{
	var axis = new neo3d.Vec3(),
		expectedAxis = new neo3d.Vec3().setFromValues(0.2, 2.1, -1.4).normalizeInPlace();

	this.quat.setFromValues(0.0412898, 0.433543, -0.2890287, 0.8525245);

	assert.equalish(this.quat.getAxisAndAngle(axis), 1.1);
	assert.equalish(axis.norm(), 1.0);
	assert.bufferEqualish(axis.buffer, expectedAxis.buffer);

	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0000004);
	assert.equal(this.quat.getAxisAndAngle(axis), 0.0);
	assert.bufferEqual(axis.buffer, [0, 0, 0]);

	this.quat.buffer[3] = 1.3;
	assert.equal(this.quat.getAxisAndAngle(axis), 0.0);
	assert.bufferEqual(axis.buffer, [1, 0, 0]);

	this.quat.buffer[3] = -0.5;
	assert.equal(this.quat.getAxisAndAngle(axis), neo3d.TWO_PI);
	assert.bufferEqual(axis.buffer, [1, 0, 0]);
});

QUnit.test("isNull", function(assert)
{
	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0000004);
	assert.ok(this.quat.isNull());

	this.quat.buffer[1] = 0.1;
	assert.notOk(this.quat.isNull());
});

QUnit.test("isIdentity", function(assert)
{
	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, 1.0000004);
	assert.ok(this.quat.isIdentity());

	this.quat.buffer[1] = 0.1;
	assert.notOk(this.quat.isIdentity());
});

QUnit.test("equals", function(assert)
{
	var q = new neo3d.Quat().setFromArray(this.randomVal);
	this.randomVal[1] += 0.9 * neo3d.EPSILON;
	this.quat.setFromArray(this.randomVal);

	assert.ok(this.quat.equals(this.quat));

	assert.notBufferEqual(this.quat.buffer, q.buffer);
	assert.bufferEqualish(this.quat.buffer, q.buffer);
	assert.ok(this.quat.equals(q));

	this.quat.buffer[1] += neo3d.EPSILON;
	assert.bufferEqualish(this.quat.buffer, q.buffer);
	assert.notOk(this.quat.equals(q));

	this.quat.buffer[1] += 0.1;
	assert.notBufferEqualish(this.quat.buffer, q.buffer);
	assert.notOk(this.quat.equals(q));
});

QUnit.test("fastRotationEquals", function(assert)
{
	var q = new neo3d.Quat().setFromArray(this.randomVal).normalizeInPlace();

	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0000004);
	assert.notOk(this.quat.fastRotationEquals(this.quat));
	assert.notOk(this.quat.fastRotationEquals(q));
	assert.notOk(q.fastRotationEquals(this.quat));

	this.quat.negate(q);
	assert.ok(this.quat.fastRotationEquals(this.quat));
	assert.ok(this.quat.fastRotationEquals(q));
	assert.ok(q.fastRotationEquals(this.quat));

	this.quat.scaleInPlace(1.4);
	assert.notOk(this.quat.fastRotationEquals(q));

	q.scaleInPlace(1.4);
	assert.ok(this.quat.fastRotationEquals(q));

	this.quat.buffer[0] += 0.1;
	assert.notOk(this.quat.fastRotationEquals(q));

	this.quat.buffer[0] -= 0.1;
	this.quat.negateInPlace();
	assert.ok(this.quat.fastRotationEquals(q));
});

QUnit.test("rotationEquals", function(assert)
{
	var q = new neo3d.Quat().setFromArray(this.randomVal);

	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0000004);
	assert.notOk(this.quat.rotationEquals(this.quat));
	assert.notOk(this.quat.rotationEquals(q));
	assert.notOk(q.rotationEquals(this.quat));

	this.quat.negate(q);
	assert.ok(this.quat.rotationEquals(this.quat));
	assert.ok(this.quat.rotationEquals(q));
	assert.ok(q.rotationEquals(this.quat));

	this.quat.scaleInPlace(1.4);
	assert.ok(this.quat.rotationEquals(q));
	assert.ok(q.rotationEquals(this.quat));

	this.quat.buffer[0] += 0.1;
	assert.notOk(this.quat.rotationEquals(q));

	this.quat.buffer[0] -= 0.1;
	this.quat.negateInPlace();
	assert.ok(this.quat.rotationEquals(q));
});

QUnit.test("scale", function(assert)
{
	var q = new neo3d.Quat().setFromValues(4.5, 1.2, 6.7, 0.6);
	assert.bufferEqualish(this.quat.scale(2.1, q).buffer, [9.45, 2.52, 14.07, 1.26]);
});

QUnit.test("scaleInPlace", function(assert)
{
	this.quat.setFromValues(4.5, 1.2, 6.7, 0.6);
	assert.bufferEqualish(this.quat.scaleInPlace(2.1).buffer, [9.45, 2.52, 14.07, 1.26]);
});

QUnit.test("negate", function(assert)
{
	var q0 = new neo3d.Quat().setFromArray(this.randomVal),
		q1 = new neo3d.Quat().negate(q0);

	this.randomVal[0] = -this.randomVal[0];
	this.randomVal[1] = -this.randomVal[1];
	this.randomVal[2] = -this.randomVal[2];
	this.randomVal[3] = -this.randomVal[3];

	assert.bufferEqual(q1.buffer, this.randomVal);
	assert.bufferEqual(this.quat.negate(q1).buffer, q0.buffer);
});

QUnit.test("negateInPlace", function(assert)
{
	this.quat.setFromArray(this.randomVal);

	this.randomVal[0] = -this.randomVal[0];
	this.randomVal[1] = -this.randomVal[1];
	this.randomVal[2] = -this.randomVal[2];
	this.randomVal[3] = -this.randomVal[3];

	assert.bufferEqual(this.quat.negateInPlace().buffer, this.randomVal);
});

QUnit.test("conjugate", function(assert)
{
	var q0 = new neo3d.Quat().setFromArray(this.randomVal),
		q1 = new neo3d.Quat().conjugate(q0);

	this.randomVal[0] = -this.randomVal[0];
	this.randomVal[1] = -this.randomVal[1];
	this.randomVal[2] = -this.randomVal[2];

	assert.bufferEqual(q1.buffer, this.randomVal);
	assert.bufferEqual(this.quat.conjugate(q1).buffer, q0.buffer);
});

QUnit.test("conjugateInPlace", function(assert)
{
	this.quat.setFromArray(this.randomVal);

	this.randomVal[0] = -this.randomVal[0];
	this.randomVal[1] = -this.randomVal[1];
	this.randomVal[2] = -this.randomVal[2];

	assert.bufferEqual(this.quat.conjugateInPlace().buffer, this.randomVal);
});

QUnit.test("multiply", function(assert)
{
	var q0 = new neo3d.Quat().setFromValues(1.2, -2.2, 3.4, -1.6),
		q1 = new neo3d.Quat().setFromValues(-3.4, 1.7, -2.9, 0.8);

	assert.bufferEqualish(this.quat.multiply(q0, q1).buffer, [7.0, -12.56, 1.92, 16.4]);
	assert.bufferEqualish(this.quat.multiply(q1, q0).buffer, [5.8, 3.6, 12.8, 16.4]);
});

QUnit.test("multiplyInPlace", function(assert)
{
	var q = new neo3d.Quat().setFromValues(-3.4, 1.7, -2.9, 0.8);
	this.quat.setFromValues(1.2, -2.2, 3.4, -1.6);

	assert.bufferEqualish(this.quat.multiplyInPlace(q).buffer, [7.0, -12.56, 1.92, 16.4]);
});

QUnit.test("invert", function(assert)
{
	var q = new neo3d.Quat().setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0000004);
	assert.bufferEqual(this.quat.invert(q).buffer, [0, 0, 0, Number.POSITIVE_INFINITY]);

	q.buffer[3] = -0.0000001;
	assert.bufferEqual(this.quat.invert(q).buffer, [0, 0, 0, Number.NEGATIVE_INFINITY]);

	q.setFromValues(1.8, -2.4, -0.6, 1.7);
	assert.notEqualish(q.norm(), 1.0);
	assert.bufferEqualish(this.quat.invert(q).buffer, [-0.1469388, 0.1959184, 0.0489796, 0.1387755]);
	assert.bufferEqualish(this.quat.invert(this.quat).buffer, q.buffer);

	q.normalizeInPlace();
	assert.bufferEqualish(this.quat.invert(q).buffer, q.conjugateInPlace().buffer);
	assert.equalish(this.quat.norm(), 1.0);
});

QUnit.test("invertInPlace", function(assert)
{
	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0000004);
	assert.bufferEqual(this.quat.invertInPlace().buffer, [0, 0, 0, Number.POSITIVE_INFINITY]);

	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, -0.0000004);
	assert.bufferEqual(this.quat.invertInPlace().buffer, [0, 0, 0, Number.NEGATIVE_INFINITY]);

	this.quat.setFromValues(1.8, -2.4, -0.6, 1.7);
	assert.notEqualish(this.quat.norm(), 1.0);
	assert.bufferEqualish(this.quat.invertInPlace().buffer, [-0.1469388, 0.1959184, 0.0489796, 0.1387755]);
	assert.bufferEqualish(this.quat.invertInPlace().buffer, [1.8, -2.4, -0.6, 1.7]);
});

QUnit.test("squareNorm", function(assert)
{
	this.quat.setFromValues(2.8, 6.1, 5.3, 4.9);
	assert.equalish(this.quat.squareNorm(), 97.15);
});

QUnit.test("norm", function(assert)
{
	this.quat.setFromValues(2.8, 6.1, 5.3, 4.9);
	assert.equalish(this.quat.norm(), 9.85647);
});

QUnit.test("normalize", function(assert)
{
	var q = new neo3d.Quat().setFromValues(8.6, 4.5, 1.7, 0.9);
	assert.bufferEqualish(this.quat.normalize(q).buffer, [0.8691304, 0.4547775, 0.1718048, 0.0909555]);
	assert.equalish(this.quat.norm(), 1.0);

	q.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0000004);
	assert.bufferEqual(this.quat.normalize(q).buffer, [0, 0, 0, 0]);
});

QUnit.test("normalizeInPlace", function(assert)
{
	this.quat.setFromValues(8.6, 4.5, 1.7, 0.9);
	assert.bufferEqualish(this.quat.normalizeInPlace().buffer, [0.8691304, 0.4547775, 0.1718048, 0.0909555]);
	assert.equalish(this.quat.norm(), 1.0);

	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0000004);
	assert.bufferEqual(this.quat.normalizeInPlace().buffer, [0, 0, 0, 0]);
});

QUnit.test("dotProduct", function(assert)
{
	var q = new neo3d.Quat().setFromValues(1.5, 0.6, 1.7, 2.2);
	this.quat.setFromValues(8.4, 7.3, 2.4, 1.8);

	assert.equalish(this.quat.dotProduct(q), 25.02);
});

QUnit.test("log", function(assert)
{
	var q = new neo3d.Quat().setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0);
	assert.bufferEqual(this.quat.log(q).buffer, [0, 0, 0, Number.NEGATIVE_INFINITY]);

	q.buffer[3] = 2.3;
	assert.bufferEqualish(this.quat.log(q).buffer, [0, 0, 0, 0.8329091]);

	q.buffer[3] = -2.3;
	assert.bufferEqualish(this.quat.log(q).buffer, [neo3d.PI, 0, 0, 0.8329091]);

	q.setFromValues(0.7, 1.6, 4.7, -1.9);
	assert.bufferEqualish(this.quat.log(q).buffer, [0.2698678, 0.6168407, 1.8119697, 1.6793189]);
});

QUnit.test("logInPlace", function(assert)
{
	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0);
	assert.bufferEqual(this.quat.logInPlace().buffer, [0, 0, 0, Number.NEGATIVE_INFINITY]);

	this.quat.buffer[3] = 2.3;
	assert.bufferEqualish(this.quat.logInPlace().buffer, [0, 0, 0, 0.8329091]);

	this.quat.buffer[3] = -2.3;
	assert.bufferEqualish(this.quat.logInPlace().buffer, [neo3d.PI, 0, 0, 0.8329091]);

	this.quat.setFromValues(0.7, 1.6, 4.7, -1.9);
	assert.bufferEqualish(this.quat.logInPlace().buffer, [0.2698678, 0.6168407, 1.8119697, 1.6793189]);
});

QUnit.test("exp", function(assert)
{
	var q = new neo3d.Quat().setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0);
	assert.bufferEqual(this.quat.exp(q).buffer, [0, 0, 0, 1]);

	q.setFromValues(0.2698678, 0.6168407, 1.8119697, 1.6793189);
	assert.bufferEqualish(this.quat.exp(q).buffer, [0.7, 1.6, 4.7, -1.9]);
});

QUnit.test("expInPlace", function(assert)
{
	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0);
	assert.bufferEqual(this.quat.expInPlace().buffer, [0, 0, 0, 1]);

	this.quat.setFromValues(0.2698678, 0.6168407, 1.8119697, 1.6793189);
	assert.bufferEqualish(this.quat.expInPlace().buffer, [0.7, 1.6, 4.7, -1.9]);
});

QUnit.test("pow", function(assert)
{
	var q = new neo3d.Quat().setFromArray(this.randomVal);
	assert.bufferEqual(this.quat.pow(q, 0.0000001).buffer, [0, 0, 0, 1]);
	assert.bufferEqual(this.quat.pow(q, -0.0000001).buffer, [0, 0, 0, 1]);

	assert.bufferEqual(this.quat.pow(q, 1.0000000000001).buffer, this.randomVal);
	assert.bufferEqual(this.quat.pow(q, 0.9999999999999).buffer, this.randomVal);

	q.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0000004);
	assert.bufferEqual(this.quat.pow(q, 2.3).buffer, [0, 0, 0, 0]);

	q.buffer[3] = 1.4;
	assert.bufferEqualish(this.quat.pow(q, 2.3).buffer, [0, 0, 0, 2.1681757]);

	q.setFromValues(-0.3, 2.4, 4.8, 1.2);
	assert.bufferEqualish(this.quat.pow(q, 0.8).buffer, [-0.1928216, 1.5425731, 3.0851461, 1.8421728]);
});

QUnit.test("powInPlace", function(assert)
{
	this.quat.setFromArray(this.randomVal);
	assert.bufferEqual(this.quat.powInPlace(0.0000001).buffer, [0, 0, 0, 1]);

	this.quat.setFromArray(this.randomVal);
	assert.bufferEqual(this.quat.powInPlace(-0.0000001).buffer, [0, 0, 0, 1]);

	this.quat.setFromArray(this.randomVal);
	assert.bufferEqual(this.quat.powInPlace(1.0000000000001).buffer, this.randomVal);
	assert.bufferEqual(this.quat.powInPlace(0.9999999999999).buffer, this.randomVal);

	this.quat.setFromValues(0.0000001, 0.0000002, 0.0000003, 0.0000004);
	assert.bufferEqual(this.quat.powInPlace(2.3).buffer, [0, 0, 0, 0]);

	this.quat.buffer[3] = 1.4;
	assert.bufferEqualish(this.quat.powInPlace(2.3).buffer, [0, 0, 0, 2.1681757]);

	this.quat.setFromValues(-0.3, 2.4, 4.8, 1.2);
	assert.bufferEqualish(this.quat.powInPlace(0.8).buffer, [-0.1928216, 1.5425731, 3.0851461, 1.8421728]);
});

QUnit.test("transformVec3", function(assert)
{
	var v0 = new neo3d.Vec3().setFromValues(1.3, -5.4, 2.6),
		v1 = new neo3d.Vec3();

	this.quat.setFromValues(0.2503262, -0.897002, 0.3337682, 0.1460236);
	assert.equalish(this.quat.norm(), 1.0);

	assert.bufferEqualish(this.quat.transformVec3(v1, v0).buffer, [1.6231512, -5.7241077, 1.486597]);
});

QUnit.test("transformVec3InPlace", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(1.3, -5.4, 2.6);

	this.quat.setFromValues(0.2503262, -0.897002, 0.3337682, 0.1460236);
	assert.equalish(this.quat.norm(), 1.0);

	assert.bufferEqualish(this.quat.transformVec3InPlace(v3).buffer, [1.6231512, -5.7241077, 1.486597]);
});

QUnit.test("lerp", function(assert)
{
	var q0 = new neo3d.Quat().setFromValues(0.2, 4.7, 2.2, 1.4),
		q1 = new neo3d.Quat().setFromValues(1.7, -2.8, 2.7, -1.6);

	assert.bufferEqual(this.quat.lerp(q0, 0, q1).buffer, q0.buffer);
	assert.bufferEqualish(this.quat.lerp(q0, 0.4, q1).buffer, [0.8, 1.7, 2.4, 0.2]);
	assert.bufferEqual(this.quat.lerp(q0, 1, q1).buffer, q1.buffer);
});

QUnit.test("slerp", function(assert)
{
	var q0 = new neo3d.Quat().setFromValues(0.037184, 0.8738233, 0.4090237, 0.2602878),
		q1 = new neo3d.Quat().setFromValues(0.3747367, -0.6172134, 0.5951701, -0.3526934);

	assert.equalish(q0.norm(), 1.0);
	assert.equalish(q1.norm(), 1.0);

	//dot < 0
	assert.bufferEqual(this.quat.slerp(q0, 0, q1).buffer, q0.buffer);
	assert.bufferEqualish(this.quat.slerp(q0, 0.4, q1).buffer, [-0.1585947, 0.9203656, -0.005186, 0.3574185]);
	assert.bufferEqual(this.quat.slerp(q0, 1, q1).buffer, q1.negateInPlace().buffer);

	//dot > 0
	assert.bufferEqual(this.quat.slerp(q0, 0, q1).buffer, q0.buffer);
	assert.bufferEqualish(this.quat.slerp(q0, 0.4, q1).buffer, [-0.1585947, 0.9203656, -0.005186, 0.3574185]);
	assert.bufferEqual(this.quat.slerp(q0, 1, q1).buffer, q1.buffer);

	//Fallback to lerp
	q1.setFromValues(0.0371996, 0.874189, 0.4081707, 0.2603967);
	assert.equalish(q1.norm(), 1.0);
	assert.bufferEqual(this.quat.slerp(q0, 0, q1).buffer, q0.buffer);
	assert.bufferEqualish(this.quat.slerp(q0, 0.4, q1).buffer, [0.0371902, 0.8739695, 0.4086825, 0.2603314]);
	assert.bufferEqual(this.quat.slerp(q0, 1, q1).buffer, q1.buffer);
});

QUnit.test("squad", function(assert)
{
	var s0 = new neo3d.Quat().setFromValues(0.2262019, 0.7313482, 0.6159059, 0.1860711),
		q0 = new neo3d.Quat().setFromValues(0.2148345, 0.6445034, 0.5370861, 0.5),
		q1 = new neo3d.Quat().setFromValues(0.0418189, 0.1254567, 0.2090945, 0.9689124),
		s1 = new neo3d.Quat().setFromValues(0.0062012, -0.0492608, 0.2737469, 0.9605194);

	assert.equalish(s0.norm(), 1.0);
	assert.equalish(q0.norm(), 1.0);
	assert.equalish(q1.norm(), 1.0);
	assert.equalish(s1.norm(), 1.0);

	assert.bufferEqual(this.quat.squad(s0, q0, 0, q1, s1).buffer, q0.buffer);
	assert.bufferEqualish(this.quat.squad(s0, q0, 0.3, q1, s1).buffer, [0.1795436, 0.5455944, 0.5286007, 0.6250378]);
	assert.bufferEqual(this.quat.squad(s0, q0, 1, q1, s1).buffer, q1.buffer);
});

QUnit.test("computeSquadIntermediate", function(assert)
{
	var q0 = new neo3d.Quat().setFromValues(0.2041241, 0.4082483, 0.2041241, 0.8660254),
		q1 = new neo3d.Quat().setFromValues(0.2148345, 0.6445034, 0.5370861, 0.5),
		q2 = new neo3d.Quat().setFromValues(0.0418189, 0.1254567, 0.2090945, 0.9689124),
		q3 = new neo3d.Quat().setFromValues(-0.0311256, 0.1556279, -0.4980091, 0.8525245);

	assert.equalish(q0.norm(), 1.0);
	assert.equalish(q1.norm(), 1.0);
	assert.equalish(q2.norm(), 1.0);
	assert.equalish(q3.norm(), 1.0);

	assert.bufferEqualish(this.quat.computeSquadIntermediate(q0, q1, q2).buffer, [0.2262019, 0.7313482, 0.6159059, 0.1860711]);
	assert.equalish(this.quat.norm(), 1.0);

	assert.bufferEqualish(this.quat.computeSquadIntermediate(q1, q2, q3).buffer, [0.0062012, -0.0492608, 0.2737469, 0.9605194]);
	assert.equalish(this.quat.norm(), 1.0);
});
