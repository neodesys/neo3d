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

module.exports = function(config) {
	config.set({
		frameworks: ["detectBrowsers", "qunit"],

		detectBrowsers: {
			postDetection: function(availableBrowser)
			{
				var args = process.argv,
					i = args.indexOf("--browsers");

				if (i >= 0)
				{
					args = args[i + 1];
					if (args)
						return args.split(",");
				}

				args = ["ChromeCanary", "FirefoxAurora", "FirefoxNightly"];
				for (var n = args.length - 1; n >= 0; n--)
				{
					i = availableBrowser.indexOf(args[n]);
					if (i >= 0)
						availableBrowser.splice(i, 1);
				}

				if (availableBrowser.length > 1)
				{
					i = availableBrowser.indexOf("PhantomJS");
					if (i >= 0)
						availableBrowser.splice(i, 1);
				}

				return availableBrowser;
			}
		},

		basePath: "..",
		files: [
			"build/neo3d.min.js",
			"build/disfract.min.js",
			"test/common.js",
			"test/**/*.js"
		],

		autoWatch: true
	});
};
