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

precision highp float;

varying highp vec2 z0;

const int MAX_ITER = 1500;

void main()
{
    vec2 zn = z0;
    float q = 0.0;

    for (int i = 0; i < MAX_ITER; ++i)
    {
        float f = zn.x;
        zn.x = f * f - zn.y * zn.y + z0.x;
        zn.y = 2.0 * f * zn.y + z0.y;

        f = zn.x * zn.x + zn.y * zn.y;
        if (f >= 4.0)
        {
            q = float(i + 1);
            break;
        }
    }

    vec3 color = vec3(0.0);
    if (q > 0.0)
    {
        color = mix(vec3(0.0, 0.0, 0.0), vec3(0.6, 0.9, 1.0), fract(0.008 * q));
    }

    gl_FragColor = vec4(color, 1.0);
}
