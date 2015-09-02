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

(function(neo3d)
{
	neo3d.EPSILON = 1e-6;

	neo3d.EPSILON2 = neo3d.EPSILON * neo3d.EPSILON;

	neo3d.PI = Math.PI;

	neo3d.HALF_PI = 0.5 * neo3d.PI;

	neo3d.TWO_PI = 2.0 * neo3d.PI;

	neo3d.RAD2DEG = 180.0 / neo3d.PI;

	neo3d.DEG2RAD = neo3d.PI / 180.0;

	neo3d.abs = Math.abs;

	neo3d.sqrt = Math.sqrt;

	neo3d.cos = Math.cos;

	neo3d.acos = Math.acos;

	neo3d.sin = Math.sin;

	neo3d.atan2 = Math.atan2;

	neo3d.log = Math.log;

	neo3d.exp = Math.exp;

	neo3d.pow = Math.pow;

})(window.neo3d = window.neo3d || {});
