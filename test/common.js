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

QUnit.assert.bufferEqual = function(value, expected, message)
{
	if (!(value instanceof Float32Array))
	{
		if ((value !== null) && (value !== undefined))
			value = value.constructor.name;

		this.push(false, value, "Float32Array", "wrong value type");
	}
	else if (!(expected instanceof Float32Array))
	{
		if ((expected !== null) && (expected !== undefined))
			expected = expected.constructor.name;

		this.push(false, expected, "Float32Array", "wrong expected type");
	}
	else
	{
		var size = value.length;
		if (size !== expected.length)
			this.push(false, size, expected.length, "different buffer sizes");
		else
		{
			var res = true;
			for (var i = 0; i < size; ++i)
			{
				if (value[i] !== expected[i])
				{
					res = "[" + i + "] => ";
					this.push(false, res + value[i], res + expected[i], message);

					res = false;
					break;
				}
			}

			if (res)
			{
				res = "[...]";
				this.push(true, res, res, message);
			}
		}
	}
};
