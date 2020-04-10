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

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDevServer = process.argv.find(v => v.includes("webpack-dev-server")) ? true : false;

const webpackConfig = module.exports = {
    target: "web",

    entry: {
        neo3d: "./src/neo3d",
        samples: "./src/samples"
    },

    output: {
        filename: "[name]-[contenthash].min.js"
    },

    externals: {
        neo3d: "window.neo3d"
    },

    mode: isDevServer ? "development" : "production",
    devtool: isDevServer ? "eval" : "source-map",

    devServer: {
        contentBase: false,
        overlay: {
            warnings: true,
            errors: true
        }
    },

    module: {
        rules: [
            {
                test: /\.(frag|vert)$/,
                use: ["webpack-glsl-loader", "remove-comments-loader"]
            },
            {
                test: /\.mp3$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "res/[name].[ext]"
                    }
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/samples/index.html",
            inject: "head"
        })
    ],

    performance: {
        hints: false
    }
};

if (!isDevServer)
{
    webpackConfig.plugins.push(
        new webpack.BannerPlugin({
            banner: "Neo3D | Released under the GPLv3 | Copyright(C) 2015, Loïc Le Page",
            entryOnly: true
        }));
}
