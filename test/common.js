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

(function()
{
	//Unit tests epsilon needs to be more tolerant than neo3d.EPSILON because
	//of values truncating while casting floats from double-precision to
	//single-precision
	var _EPSILON = 1e-5;

	function _verifyBuffers(value, expected)
	{
		if (!(value instanceof Float32Array))
		{
			if ((value !== null) && (value !== undefined))
				value = value.constructor.name;

			QUnit.assert.push(false, value, "Float32Array", "wrong value type");
			return false;
		}

		if (!(expected instanceof Float32Array))
		{
			if ((expected !== null) && (expected !== undefined))
				expected = expected.constructor.name;

			QUnit.assert.push(false, expected, "Float32Array", "wrong expected type");
			return false;
		}

		var size = value.length;
		if (size !== expected.length)
		{
			QUnit.assert.push(false, size, expected.length, "different buffer sizes");
			return false;
		}

		return true;
	}

	function _bufferCompare(value, expected, message, testEqual)
	{
		//Warning: javascript Array numbers have double precision, values may
		//be truncated when wrapped into a Float32Array
		if (expected instanceof Array)
			expected = new Float32Array(expected);

		if (_verifyBuffers(value, expected))
		{
			var n = value.length;
			for (var i = 0; i < n; ++i)
			{
				if (value[i] !== expected[i])
				{
					n = "[" + i + "] => ";
					QUnit.assert.push(!testEqual, n + value[i], n + expected[i], message);
					return;
				}
			}

			n = "[...]";
			QUnit.assert.push(testEqual, n, testEqual ? n : "not" + n, message);
		}
	}

	function _bufferComparish(value, expected, message, testEqual)
	{
		//Warning: javascript Array numbers have double precision, values may
		//be truncated when wrapped into a Float32Array
		if (expected instanceof Array)
			expected = new Float32Array(expected);

		if (_verifyBuffers(value, expected))
		{
			var n = value.length;
			for (var i = 0; i < n; ++i)
			{
				if (Math.abs(value[i] - expected[i]) >= _EPSILON)
				{
					n = "[" + i + "] => ";
					QUnit.assert.push(!testEqual, n + value[i], n + expected[i], message);
					return;
				}
			}

			n = "[...]";
			QUnit.assert.push(testEqual, n, testEqual ? n : "not" + n, message);
		}
	}

	QUnit.assert.bufferEqual = function(value, expected, message)
	{
		_bufferCompare(value, expected, message, true);
	};

	QUnit.assert.notBufferEqual = function(value, expected, message)
	{
		_bufferCompare(value, expected, message, false);
	};

	QUnit.assert.bufferEqualish = function(value, expected, message)
	{
		_bufferComparish(value, expected, message, true);
	};

	QUnit.assert.notBufferEqualish = function(value, expected, message)
	{
		_bufferComparish(value, expected, message, false);
	};

	QUnit.assert.equalish = function(value, expected, message)
	{
		this.push(Math.abs(value - expected) < _EPSILON, value, expected, message);
	};

	QUnit.assert.notEqualish = function(value, expected, message)
	{
		this.push(Math.abs(value - expected) >= _EPSILON, value, expected, message);
	};
})();
