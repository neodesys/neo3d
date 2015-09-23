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

QUnit.module("Mat3", {
	beforeEach: function()
	{
		this.mat = new neo3d.Mat3();

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
			10.0 * Math.random()
		]);
	}
});

QUnit.test("constants", function(assert)
{
	assert.equal(neo3d.Mat3.NB_COMPONENTS, 9);
	assert.bufferEqual(neo3d.Mat3.IDENTITY.buffer, [1, 0, 0, 0, 1, 0, 0, 0, 1]);
});

QUnit.test("createBuffer", function(assert)
{
	var buffer = neo3d.Mat3.createBuffer(2);
	assert.equal(buffer.length, 2 * neo3d.Mat3.NB_COMPONENTS);
	assert.bufferEqual(buffer, [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1]);
});

QUnit.test("setFromArray", function(assert)
{
	assert.bufferEqual(this.mat.setFromArray(this.randomVal).buffer, this.randomVal);
});

QUnit.test("setColumnVec3", function(assert)
{
	var v0 = new neo3d.Vec3().setFromValues(this.randomVal[0], this.randomVal[1], this.randomVal[2]),
		v1 = new neo3d.Vec3().setFromValues(this.randomVal[3], this.randomVal[4], this.randomVal[5]),
		v2 = new neo3d.Vec3().setFromValues(this.randomVal[6], this.randomVal[7], this.randomVal[8]);

	this.mat.setColumnVec3(0, v0);
	this.mat.setColumnVec3(1, v1);
	this.mat.setColumnVec3(2, v2);

	assert.bufferEqual(this.mat.buffer, this.randomVal);
});

QUnit.test("setFromColumnsVec3", function(assert)
{
	var v0 = new neo3d.Vec3().setFromValues(this.randomVal[0], this.randomVal[1], this.randomVal[2]),
		v1 = new neo3d.Vec3().setFromValues(this.randomVal[3], this.randomVal[4], this.randomVal[5]),
		v2 = new neo3d.Vec3().setFromValues(this.randomVal[6], this.randomVal[7], this.randomVal[8]);

	assert.bufferEqual(this.mat.setFromColumnsVec3(v0, v1, v2).buffer, this.randomVal);
});

QUnit.test("setColumnVec2", function(assert)
{
	var v0 = new neo3d.Vec2().setFromValues(this.randomVal[0], this.randomVal[1]),
		v1 = new neo3d.Vec2().setFromValues(this.randomVal[3], this.randomVal[4]),
		v2 = new neo3d.Vec2().setFromValues(this.randomVal[6], this.randomVal[7]);

	this.mat.buffer[2] = 1.1;
	this.mat.buffer[5] = -0.6;
	this.mat.buffer[8] = 4.3;

	this.mat.setColumnVec2(0, v0);
	this.mat.setColumnVec2(1, v1);
	this.mat.setColumnVec2(2, v2);

	this.randomVal[2] = this.randomVal[5] = 0.0;
	this.randomVal[8] = 1.0;

	assert.bufferEqual(this.mat.buffer, this.randomVal);
});

QUnit.test("setFromColumnsVec2", function(assert)
{
	var v0 = new neo3d.Vec2().setFromValues(this.randomVal[0], this.randomVal[1]),
		v1 = new neo3d.Vec2().setFromValues(this.randomVal[3], this.randomVal[4]),
		v2 = new neo3d.Vec2().setFromValues(this.randomVal[6], this.randomVal[7]);

	this.mat.buffer[2] = 1.1;
	this.mat.buffer[5] = -0.6;
	this.mat.buffer[8] = 4.3;

	this.randomVal[2] = this.randomVal[5] = 0.0;
	this.randomVal[8] = 1.0;

	assert.bufferEqual(this.mat.setFromColumnsVec2(v0, v1, v2).buffer, this.randomVal);
});

QUnit.test("setFromQuat", function(assert)
{
	var q = new neo3d.Quat().setFromValues(0.0412898, 0.433543, -0.2890287, 0.8525245);

	assert.equalish(q.norm(), 1.0);
	assert.bufferEqualish(this.mat.setFromQuat(q).buffer, [
		0.4570058, -0.4570062, -0.7630799, //Col0
		0.5286098, 0.8295152, -0.1802115,  //Col1
		0.7153442, -0.3210138, 0.6206712   //Col2
	]);
});

QUnit.test("setFromMat4RotScale", function(assert)
{
	var m4 = new neo3d.Mat4().setFromArray([
		0.4570058, -0.4570062, -0.7630799, 0.0, //Col0
		0.5286098, 0.8295152, -0.1802115, 0.0,  //Col1
		0.7153442, -0.3210138, 0.6206712, 0.0,  //Col2
		1.4, 2.5, 3.1, 1.0                      //Col3
	]);

	assert.bufferEqual(this.mat.setFromMat4RotScale(m4).buffer, [
		0.4570058, -0.4570062, -0.7630799, //Col0
		0.5286098, 0.8295152, -0.1802115,  //Col1
		0.7153442, -0.3210138, 0.6206712   //Col2
	]);
});

QUnit.test("setFromRSTransfo3D", function(assert)
{
	var s = new neo3d.Vec3().setFromValues(1.2, 2.3, 0.7),
		q = new neo3d.Quat().setFromValues(0.0412898, 0.433543, -0.2890287, 0.8525245);

	assert.equalish(q.norm(), 1.0);
	assert.bufferEqualish(this.mat.setFromRSTransfo3D(q, s).buffer, [
		0.548407, -0.5484074, -0.9156959, //Col0
		1.2158025, 1.907885, -0.4144864,  //Col1
		0.5007409, -0.2247097, 0.4344698  //Col2
	]);
});

QUnit.test("setRotation2D", function(assert)
{
	var p = new neo3d.Vec2().setFromValues(1.4, 2.5);
	this.mat.setColumnVec2(2, p);

	assert.bufferEqualish(this.mat.setRotation2D(1.0471975).buffer, [
		0.5, 0.8660254, 0.0,  //Col0
		-0.8660254, 0.5, 0.0, //Col1
		1.4, 2.5, 1.0         //Col2
	]);
});

QUnit.test("setRotScale2DFromMat2", function(assert)
{
	var p = new neo3d.Vec2().setFromValues(1.4, 2.5),
		m2 = new neo3d.Mat2().setFromArray([
			0.5, 0.8660254, //Col0
			-0.8660254, 0.5 //Col1
		]);

	this.mat.setColumnVec2(2, p);

	assert.bufferEqual(this.mat.setRotScale2DFromMat2(m2).buffer, [
		0.5, 0.8660254, 0.0,  //Col0
		-0.8660254, 0.5, 0.0, //Col1
		1.4, 2.5, 1.0         //Col2
	]);
});

QUnit.test("setFromTRSTransfo2D", function(assert)
{
	var p = new neo3d.Vec2().setFromValues(1.4, 2.5),
		s = new neo3d.Vec2().setFromValues(1.2, 2.3);

	assert.bufferEqualish(this.mat.setFromTRSTransfo2D(p, 1.0471975, s).buffer, [
		0.6, 1.0392305, 0.0,   //Col0
		-1.9918584, 1.15, 0.0, //Col1
		1.4, 2.5, 1.0          //Col2
	]);
});

QUnit.test("setIdentity", function(assert)
{
	this.mat.setFromArray(this.randomVal);
	assert.bufferEqual(this.mat.setIdentity().buffer, [1, 0, 0, 0, 1, 0, 0, 0, 1]);
});

QUnit.test("copy", function(assert)
{
	var m3 = new neo3d.Mat3().setFromArray(this.randomVal);
	assert.bufferEqual(this.mat.copy(m3).buffer, this.randomVal);
});

QUnit.test("getRSTransfo3D", function(assert)
{
	var s = new neo3d.Vec3(),
		q = new neo3d.Quat();

	this.mat.setFromArray([
		0.548407, -0.5484074, -0.9156959, //Col0
		1.2158025, 1.907885, -0.4144864,  //Col1
		0.5007409, -0.2247097, 0.4344698  //Col2
	]);

	this.mat.getRSTransfo3D(q, s);

	assert.equalish(q.norm(), 1.0);
	assert.bufferEqualish(q.buffer, [0.0412898, 0.433543, -0.2890287, 0.8525245]);
	assert.bufferEqualish(s.buffer, [1.2, 2.3, 0.7]);
});

QUnit.test("normalizeRSTransfo3D", function(assert)
{
	var m3 = new neo3d.Mat3().setFromArray([
		0.548408, -0.548407, -0.915696, //Col0
		1.215802, 1.90788, -0.414485,   //Col1
		0.50075, -0.22472, 0.434461     //Col2
	]);

	var buffer = [
		0.548407, -0.5484074, -0.9156959, //Col0
		1.2158025, 1.907885, -0.4144864,  //Col1
		0.5007409, -0.2247097, 0.4344698  //Col2
	];

	assert.notBufferEqualish(m3.buffer, buffer);
	assert.bufferEqualish(this.mat.normalizeRSTransfo3D(m3).buffer, buffer);
});

QUnit.test("normalizeRSTransfo3DInPlace", function(assert)
{
	this.mat.setFromArray([
		0.548408, -0.548407, -0.915696, //Col0
		1.215802, 1.90788, -0.414485,   //Col1
		0.50075, -0.22472, 0.434461     //Col2
	]);

	var buffer = [
		0.548407, -0.5484074, -0.9156959, //Col0
		1.2158025, 1.907885, -0.4144864,  //Col1
		0.5007409, -0.2247097, 0.4344698  //Col2
	];

	assert.notBufferEqualish(this.mat.buffer, buffer);
	assert.bufferEqualish(this.mat.normalizeRSTransfo3DInPlace().buffer, buffer);
});

QUnit.test("getTRSTransfo2D", function(assert)
{
	var p = new neo3d.Vec2(),
		s = new neo3d.Vec2();

	this.mat.setFromArray([
		0.6, 1.0392305, 0.0,   //Col0
		-1.9918584, 1.15, 0.0, //Col1
		1.4, 2.5, 1.0          //Col2
	]);

	assert.equalish(this.mat.getTRSTransfo2D(p, s), 1.0471975);
	assert.bufferEqual(p.buffer, [1.4, 2.5]);
	assert.bufferEqualish(s.buffer, [1.2, 2.3]);
});

QUnit.test("normalizeTRSTransfo2D", function(assert)
{
	var m3 = new neo3d.Mat3().setFromArray([
		0.6, 1.03924, 0.1,     //Col0
		-1.991859, 1.15, -1.2, //Col1
		1.4, 2.5, 1.5          //Col2
	]);

	var buffer = [
		0.6, 1.0392305, 0.0,   //Col0
		-1.9918584, 1.15, 0.0, //Col1
		1.4, 2.5, 1.0          //Col2
	];

	assert.notBufferEqualish(m3.buffer, buffer);
	assert.bufferEqualish(this.mat.normalizeTRSTransfo2D(m3).buffer, buffer);
});

QUnit.test("normalizeTRSTransfo2DInPlace", function(assert)
{
	this.mat.setFromArray([
		0.6, 1.03924, 0.1,     //Col0
		-1.991859, 1.15, -1.2, //Col1
		1.4, 2.5, 1.5          //Col2
	]);

	var buffer = [
		0.6, 1.0392305, 0.0,   //Col0
		-1.9918584, 1.15, 0.0, //Col1
		1.4, 2.5, 1.0          //Col2
	];

	assert.notBufferEqualish(this.mat.buffer, buffer);
	assert.bufferEqualish(this.mat.normalizeTRSTransfo2DInPlace().buffer, buffer);
});

QUnit.test("isIdentity", function(assert)
{
	this.mat.setFromArray([
		1.0000001, -0.0000002, 0.0000003, //Col0
		0.0000001, 0.9999998, 0.0000003,  //Col1
		0.0000001, 0.0000002, 0.9999999   //Col2
	]);
	assert.ok(this.mat.isIdentity());

	this.mat.buffer[1] = 0.1;
	assert.notOk(this.mat.isIdentity());
});

QUnit.test("equals", function(assert)
{
	var m3 = new neo3d.Mat3().setFromArray(this.randomVal);
	this.randomVal[1] += 0.9 * neo3d.EPSILON;
	this.mat.setFromArray(this.randomVal);

	assert.ok(this.mat.equals(this.mat));

	assert.notBufferEqual(this.mat.buffer, m3.buffer);
	assert.bufferEqualish(this.mat.buffer, m3.buffer);
	assert.ok(this.mat.equals(m3));

	this.mat.buffer[1] += neo3d.EPSILON;
	assert.bufferEqualish(this.mat.buffer, m3.buffer);
	assert.notOk(this.mat.equals(m3));

	this.mat.buffer[1] += 0.1;
	assert.notBufferEqualish(this.mat.buffer, m3.buffer);
	assert.notOk(this.mat.equals(m3));
});

QUnit.test("multiply", function(assert)
{
	var m0 = new neo3d.Mat3().setFromArray([
			1.2, 0.5, -6.7, //Col0
			-0.5, 2.7, 8.3, //Col1
			7.3, -8.6, 2.4  //Col2
		]),
		m1 = new neo3d.Mat3().setFromArray([
			-4.1, 4.4, 0.8, //Col0
			2.7, 0.2, -0.6, //Col1
			9.1, -4.2, 2.1  //Col2
		]);

	assert.bufferEqualish(this.mat.multiply(m0, m1).buffer, [
		-1.28, 2.95, 65.91,   //Col0
		-1.24, 7.05, -17.87,  //Col1
		28.35, -24.85, -90.79 //Col2
	]);

	assert.bufferEqualish(this.mat.multiply(m1, m0).buffer, [
		-64.54, 33.52, -13.41, //Col0
		84.87, -36.52, 15.41,  //Col1
		-31.31, 20.32, 16.04   //Col2
	]);
});

QUnit.test("multiplyInPlace", function(assert)
{
	var m3 = new neo3d.Mat3().setFromArray([
		-4.1, 4.4, 0.8, //Col0
		2.7, 0.2, -0.6, //Col1
		9.1, -4.2, 2.1  //Col2
	]);

	this.mat.setFromArray([
		1.2, 0.5, -6.7, //Col0
		-0.5, 2.7, 8.3, //Col1
		7.3, -8.6, 2.4  //Col2
	]);

	assert.bufferEqualish(this.mat.multiplyInPlace(m3).buffer, [
		-1.28, 2.95, 65.91,   //Col0
		-1.24, 7.05, -17.87,  //Col1
		28.35, -24.85, -90.79 //Col2
	]);
});

QUnit.test("invert", function(assert)
{
	var m3 = new neo3d.Mat3();
	assert.bufferEqual(this.mat.invert(m3).buffer, [1, 0, 0, 0, 1, 0, 0, 0, 1]);

	//det = +EPSILON
	m3.setFromArray([
		-4.1, 4.4, -8.2, //Col0
		2.7, 0.2, 5.4,   //Col1
		9.1, -4.2, 18.2  //Col2
	]);
	assert.bufferEqual(this.mat.invert(m3).buffer, [
		Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
		Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
		Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY
	]);

	//det = -EPSILON
	m3.setFromArray([
		-4.1, 4.4, 0.8, //Col0
		-8.2, 8.8, 1.6, //Col1
		9.1, -4.2, 2.1  //Col2
	]);
	assert.bufferEqual(this.mat.invert(m3).buffer, [
		Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
		Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
		Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY
	]);

	//det != 0
	m3.setFromArray([
		-4.1, 4.4, 0.8, //Col0
		2.7, 0.2, -0.6, //Col1
		9.1, -4.2, 2.1  //Col2
	]);
	assert.bufferEqualish(this.mat.invert(m3).buffer, [
		0.0412655, 0.2475928, 0.0550206, //Col0
		0.218707, 0.3122421, 0.0058951,  //Col1
		0.258597, -0.4484182, 0.2495579  //Col2
	]);

	assert.ok(this.mat.multiplyInPlace(m3).isIdentity());
});

QUnit.test("invertInPlace", function(assert)
{
	assert.bufferEqual(this.mat.invertInPlace().buffer, [1, 0, 0, 0, 1, 0, 0, 0, 1]);

	//det = +EPSILON
	this.mat.setFromArray([
		-4.1, 4.4, -8.2, //Col0
		2.7, 0.2, 5.4,   //Col1
		9.1, -4.2, 18.2  //Col2
	]);
	assert.bufferEqual(this.mat.invertInPlace().buffer, [
		Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
		Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
		Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY
	]);

	//det = -EPSILON
	this.mat.setFromArray([
		-4.1, 4.4, 0.8, //Col0
		-8.2, 8.8, 1.6, //Col1
		9.1, -4.2, 2.1  //Col2
	]);
	assert.bufferEqual(this.mat.invertInPlace().buffer, [
		Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
		Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
		Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY
	]);

	//det != 0
	this.mat.setFromArray([
		-4.1, 4.4, 0.8, //Col0
		2.7, 0.2, -0.6, //Col1
		9.1, -4.2, 2.1  //Col2
	]);
	assert.bufferEqualish(this.mat.invertInPlace().buffer, [
		0.0412655, 0.2475928, 0.0550206, //Col0
		0.218707, 0.3122421, 0.0058951,  //Col1
		0.258597, -0.4484182, 0.2495579  //Col2
	]);
});

QUnit.test("transpose", function(assert)
{
	assert.bufferEqual(this.mat.transpose(neo3d.Mat3.IDENTITY).buffer, [1, 0, 0, 0, 1, 0, 0, 0, 1]);

	var m3 = new neo3d.Mat3().setFromArray(this.randomVal);
	this.mat.transpose(m3);

	assert.equal(this.mat.buffer[0], this.randomVal[0]);
	assert.equal(this.mat.buffer[1], this.randomVal[3]);
	assert.equal(this.mat.buffer[2], this.randomVal[6]);
	assert.equal(this.mat.buffer[3], this.randomVal[1]);
	assert.equal(this.mat.buffer[4], this.randomVal[4]);
	assert.equal(this.mat.buffer[5], this.randomVal[7]);
	assert.equal(this.mat.buffer[6], this.randomVal[2]);
	assert.equal(this.mat.buffer[7], this.randomVal[5]);
	assert.equal(this.mat.buffer[8], this.randomVal[8]);
});

QUnit.test("transposeInPlace", function(assert)
{
	assert.bufferEqual(this.mat.transposeInPlace().buffer, [1, 0, 0, 0, 1, 0, 0, 0, 1]);

	this.mat.setFromArray(this.randomVal).transposeInPlace();

	assert.equal(this.mat.buffer[0], this.randomVal[0]);
	assert.equal(this.mat.buffer[1], this.randomVal[3]);
	assert.equal(this.mat.buffer[2], this.randomVal[6]);
	assert.equal(this.mat.buffer[3], this.randomVal[1]);
	assert.equal(this.mat.buffer[4], this.randomVal[4]);
	assert.equal(this.mat.buffer[5], this.randomVal[7]);
	assert.equal(this.mat.buffer[6], this.randomVal[2]);
	assert.equal(this.mat.buffer[7], this.randomVal[5]);
	assert.equal(this.mat.buffer[8], this.randomVal[8]);
});

QUnit.test("transformVec3", function(assert)
{
	var v0 = new neo3d.Vec3().setFromValues(1.3, -5.4, 2.6),
		v1 = new neo3d.Vec3();

	this.mat.setFromArray([
		1.2, 0.5, -6.7, //Col0
		-0.5, 2.7, 8.3, //Col1
		2.4, 1.0, -13.4 //Col2
	]);

	assert.bufferEqualish(this.mat.transformVec3(v1, v0).buffer, [10.5, -11.33, -88.37]);
});

QUnit.test("transformVec3InPlace", function(assert)
{
	var v3 = new neo3d.Vec3().setFromValues(1.3, -5.4, 2.6);

	this.mat.setFromArray([
		1.2, 0.5, -6.7, //Col0
		-0.5, 2.7, 8.3, //Col1
		2.4, 1.0, -13.4 //Col2
	]);

	assert.bufferEqualish(this.mat.transformVec3InPlace(v3).buffer, [10.5, -11.33, -88.37]);
});

QUnit.test("transformVec2Pos", function(assert)
{
	var v0 = new neo3d.Vec2().setFromValues(1.3, -5.4),
		v1 = new neo3d.Vec2();

	this.mat.setFromArray([
		1.2, 0.5, 0.0,  //Col0
		-0.5, 2.7, 0.0, //Col1
		2.4, 1.0, 1.0   //Col2
	]);

	assert.bufferEqualish(this.mat.transformVec2Pos(v1, v0).buffer, [6.66, -12.93]);
});

QUnit.test("transformVec2PosInPlace", function(assert)
{
	var v2 = new neo3d.Vec2().setFromValues(1.3, -5.4);

	this.mat.setFromArray([
		1.2, 0.5, 0.0,  //Col0
		-0.5, 2.7, 0.0, //Col1
		2.4, 1.0, 1.0   //Col2
	]);

	assert.bufferEqualish(this.mat.transformVec2PosInPlace(v2).buffer, [6.66, -12.93]);
});

QUnit.test("transformVec2Dir", function(assert)
{
	var v0 = new neo3d.Vec2().setFromValues(1.3, -5.4),
		v1 = new neo3d.Vec2();

	this.mat.setFromArray([
		1.2, 0.5, 0.0,  //Col0
		-0.5, 2.7, 0.0, //Col1
		2.4, 1.0, 1.0   //Col2
	]);

	assert.bufferEqualish(this.mat.transformVec2Dir(v1, v0).buffer, [4.26, -13.93]);
});

QUnit.test("transformVec2DirInPlace", function(assert)
{
	var v2 = new neo3d.Vec2().setFromValues(1.3, -5.4);

	this.mat.setFromArray([
		1.2, 0.5, 0.0,  //Col0
		-0.5, 2.7, 0.0, //Col1
		2.4, 1.0, 1.0   //Col2
	]);

	assert.bufferEqualish(this.mat.transformVec2DirInPlace(v2).buffer, [4.26, -13.93]);
});
