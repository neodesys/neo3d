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
	assert.expect(0);
	//TODO
});

QUnit.test("conjugateInPlace", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("multiply", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("multiplyInPlace", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("invert", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("invertInPlace", function(assert)
{
	assert.expect(0);
	//TODO
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
	assert.expect(0);
	//TODO
});

QUnit.test("logInPlace", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("exp", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("expInPlace", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("pow", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("powInPlace", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("transformVec3", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("transformVec3InPlace", function(assert)
{
	assert.expect(0);
	//TODO
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
	assert.expect(0);
	//TODO
});

QUnit.test("squad", function(assert)
{
	assert.expect(0);
	//TODO
});

QUnit.test("computeSquadIntermediate", function(assert)
{
	assert.expect(0);
	//TODO
});
