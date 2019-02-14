/**
 * Groovy
 *
 * Copyright (C) 2019, Loïc Le Page
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

uniform sampler2D uOscilloData;

//Plane coords are between -1.0 and 1.0 with direct orientation
varying highp vec2 planeCoords;

const float PI = 3.1415926535897932384626433832795;

float getLineIntensity(float t)
{
    t = max(t, 0.0) * step(-1.0, -t);
    t = sin(t * PI);
    return t;
}

vec4 drawCircle(vec3 color, float thickness, float radius, float maxVar)
{
    float l = length(planeCoords);
    float a = 0.5 * (1.0 + atan(planeCoords.y, planeCoords.x) / PI);

    float offset = texture2D(uOscilloData, vec2(a, 0.5)).a;
    offset = radius + maxVar * (2.0 * offset - 1.0);

    float t = getLineIntensity(0.5 + (l - offset) / thickness);
    return vec4(color * t, t);
}

void main()
{
    gl_FragColor = drawCircle(vec3(0.8, 0.8, 0.2), 0.05, 0.85, 0.025);
}
