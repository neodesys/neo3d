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

var neo3d = require("./neo3d");

neo3d.Shader = require("./Shader");
neo3d.math = require("./math");
neo3d.Vec2 = require("./Vec2");
neo3d.Vec3 = require("./Vec3");
neo3d.Vec4 = require("./Vec4");
neo3d.Quat = require("./Quat");
neo3d.Mat2 = require("./Mat2");
neo3d.Mat3 = require("./Mat3");
neo3d.Mat4 = require("./Mat4");
neo3d.Mesh = require("./Mesh");
neo3d.PlaneMesh = require("./PlaneMesh");

window.neo3d = module.exports = neo3d;
