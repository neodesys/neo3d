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

"use strict";

var AudioContext = window.AudioContext || window.webkitAudioContext;
var _audioCtx = null;
if (typeof (AudioContext) === "function")
{
    _audioCtx = new AudioContext();
}

var AudioSource = module.exports = function(url)
{
    this._audioSample = null;
    this._analyser = null;
    this._fftSize = 2048;
    this._timeData = new Uint8Array(this._fftSize);
    this._freqData = new Uint8Array(this._fftSize >> 1);

    if (url && (typeof (url) === "string"))
    {
        this._audioSample = new Audio(url);
        this._audioSample.loop = true;

        if (_audioCtx)
        {
            var that = this;
            this._audioSample.addEventListener("canplay", function()
            {
                if (!that._analyser)
                {
                    that._analyser = _audioCtx.createAnalyser();
                    that._analyser.fftSize = that._fftSize;
                    that._analyser.smoothingTimeConstant = 0.5;

                    var source = _audioCtx.createMediaElementSource(that._audioSample);
                    source.connect(that._analyser);
                    that._analyser.connect(_audioCtx.destination);
                }
            }, { once: true });
        }
    }
};

AudioSource.prototype.play = function()
{
    if (this._audioSample)
    {
        this._audioSample.play();
    }
};

AudioSource.prototype.pause = function()
{
    if (this._audioSample)
    {
        this._audioSample.pause();
    }
};

AudioSource.prototype.setFFTSize = function(fftSize)
{
    if ((typeof (fftSize) === "number") && isFinite(fftSize))
    {
        //FFT size must be 2^i with 5 <= i <= 15 or an IndexSizeError is thrown
        var size = 1 << 15;
        while ((size > 32) && (size > fftSize))
        {
            size >>= 1;
        }

        if (size !== this._fftSize)
        {
            this._fftSize = size;
            this._timeData = new Uint8Array(this._fftSize);
            this._freqData = new Uint8Array(this._fftSize >> 1);

            if (this._analyser)
            {
                this._analyser.fftSize = this._fftSize;
            }
        }
    }
};

AudioSource.prototype.fetchTimeData = function()
{
    if (this._analyser)
    {
        this._analyser.getByteTimeDomainData(this._timeData);
    }

    return this._timeData;
};

AudioSource.prototype.fetchFreqData = function()
{
    if (this._analyser)
    {
        this._analyser.getByteFrequencyData(this._freqData);
    }

    return this._freqData;
};
