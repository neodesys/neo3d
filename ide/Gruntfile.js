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
		mainIncludes: [],

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
									return "<script src=\"" + type + ".js\"></script>";
								}
								else
									return "<!-- no source script for " + type + ".js -->";
							}
							else
								return "<!-- no source script for " + type + ".js -->";
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

			main: {
				nonull: true,
				src: "<%= mainIncludes %>",
				dest: "build/main.js"
			}
		},

		clean: {
			build: {
				src: "build"
			}
		}
	});

	grunt.registerTask("build", ["copy:index", "concat:neo3d", "concat:main"]);
	grunt.registerTask("rebuild", ["clean:build", "build"]);
	grunt.registerTask("default", ["rebuild"]);
};
