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

module.exports = function(grunt) {
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.file.setBase("..");

	grunt.initConfig({
		pkg: grunt.file.readJSON("ide/package.json"),

		neo3dIncludes: [],
		disfractIncludes: [],

		copy: {
			index: {
				nonull: true,
				src: "src/index.html",
				dest: "build/index.html",
				options: {
					process: function(content) {
						return content.replace(/<!--include-([^-]+)-start-->([^]*)<!--include-\1-end-->/gim, function(block, type, scripts) {
							type = type.toLowerCase();
							var incName = type + "Includes";
							var includes = grunt.config(incName);
							if (scripts && includes)
							{
								var bFound = false;
								var reg = /<script[^>]*\s+src\s*=\s*['"]([^'"]+)['"][^>]*>\s*<\/script>/gim;
								var res = null;
								while ((res = reg.exec(scripts)) !== null)
								{
									includes.push("src/" + res[1]);
									bFound = true;
								}

								if (bFound)
								{
									grunt.config(incName, includes);
									return "<script src=\"" + type + ".min.js\"></script>";
								}
								else
									return "<!-- no source script for " + type + ".min.js -->";
							}
							else
								return "<!-- no source script for " + type + ".min.js -->";
						});
					}
				}
			}
		},

		concat: {
			options: {
				stripBanners: true,
				sourceMap: true,
				banner: "/*! <%= pkg.name %> - build <%= grunt.template.today(\"UTC:yyyymmdd-HH:MM:ss\") %> | <%= pkg.author %> | License: <%= pkg.license %> */\n\"use strict\";\n",
				process: function(content) {
					return content.replace(/^\s*['"]use\s+strict['"]\s*;?\s*$/gim, "");
				}
			},

			neo3d: {
				nonull: true,
				src: "<%= neo3dIncludes %>",
				dest: "build/neo3d.js"
			},

			disfract: {
				nonull: true,
				src: "<%= disfractIncludes %>",
				dest: "build/disfract.js"
			}
		},

		clean: {
			unused: {
				src: ["build/neo3d.js", "build/neo3d.js.map", "build/disfract.js", "build/disfract.js.map"]
			},

			build: {
				src: "build"
			}
		},

		jshint: {
			options: {
				reporter: require("jshint-stylish"),
				browser: true,
				devel: true,
				globalstrict: true,
				eqeqeq: true,
				undef: true,
				unused: true,
				globals: {
					neo3d: true,
					ImageData: true,
					QUnit: true
				}
			},

			beforeConcat: ["src/**/*.js", "test/**/*.js"],
			afterConcat: ["build/neo3d.js", "build/disfract.js"],

			configFiles: {
				options: {
					browser: false,
					devel: false,
					node: true
				},

				src: ["ide/Gruntfile.js", "ide/karma.conf.js"]
			}
		},

		uglify: {
			options: {
				sourceMap: true,
				sourceMapIncludeSources: true,
				preserveComments: "some",
				screwIE8: true,
				compress: {
					sequences: true,
					properties: true,
					dead_code: true,
					drop_debugger: true,
					conditionals: true,
					evaluate: true,
					booleans: true,
					loops: true,
					unused: true,
					hoist_funs: true,
					if_return: true,
					join_vars: true,
					cascade: true
				}
			},

			neo3d: {
				options: {
					sourceMapIn: "build/neo3d.js.map"
				},

				nonull: true,
				src: "build/neo3d.js",
				dest: "build/neo3d.min.js"
			},

			disfract: {
				options: {
					sourceMapIn: "build/disfract.js.map"
				},

				nonull: true,
				src: "build/disfract.js",
				dest: "build/disfract.min.js"
			}
		}
	});

	grunt.registerTask("build", [
		"jshint:configFiles",
		"copy:index",
		"jshint:beforeConcat",
		"concat:neo3d",
		"concat:disfract",
		"jshint:afterConcat",
		"uglify:neo3d",
		"uglify:disfract",
		"clean:unused"
	]);

	grunt.registerTask("rebuild", ["clean:build", "build"]);
	grunt.registerTask("default", ["rebuild"]);
};
