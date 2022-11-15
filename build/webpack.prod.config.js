const merge = require("webpack-merge");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require("./webpack.common.config.js");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: "",
    entry: {
        index: "./src/index",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist"),
        libraryTarget: "commonjs2",
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                    from: path.resolve(__dirname, '../package.json'),
                },
                {
                    from: path.resolve(__dirname, '../README.md'),
                },
                {
                    from: path.resolve(__dirname, '../zh.md'),
                },
                {
                    from: path.resolve(__dirname, '../types/index.d.ts'),
                },
            ],
        }),
    ],
    externals: {
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react",
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom",
        },
    },
});