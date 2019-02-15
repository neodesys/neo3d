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

uniform sampler2D uTimeData;
uniform sampler2D uFreqData;

//Plane coords are relative to a central square between -1.0 and 1.0 with direct orientation
varying highp vec2 planeCoords;

const float PI = 3.1415926535897932384626433832795;

float getLineIntensity(float t)
{
    t = max(t, 0.0) * step(-1.0, -t);
    t = sin(t * PI);
    return t * t;
}

//radialCoords angle (y) must be normalized between 0.0 and 1.0
float getCircleIntensity(vec2 radialCoords, float lineThickness, float circleRadius, float maxOffset)
{
    float offset = texture2D(uTimeData, vec2(radialCoords.y, 0.5)).a;
    offset = circleRadius + maxOffset * (2.0 * offset - 1.0);

    return getLineIntensity(0.5 + (radialCoords.x - offset) / lineThickness);
}

void main()
{
    vec2 radialCoords = vec2(length(planeCoords), 0.5 * (1.0 + atan(planeCoords.y, planeCoords.x) / PI));

    float circle = getCircleIntensity(radialCoords, 0.05, 0.85, 0.2);
    float disc = texture2D(uFreqData, vec2(0.05 + radialCoords.x * 0.4, 0.5)).a;

    gl_FragColor = vec4(0.85, 0.95, 0.5, disc + circle);
}
