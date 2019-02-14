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

attribute vec3 aVtxPosition;

uniform vec2 uPos;
uniform vec2 uSize;

varying highp vec2 z0;

void main()
{
    gl_Position = vec4(aVtxPosition, 1.0);
    z0 = uPos + aVtxPosition.xy * uSize * 0.5;
}
