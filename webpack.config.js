const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},
	resolve: {
		extensions: [".tsx", ".js"]
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.tsx$/,
				loader: "awesome-typescript-loader"
			},
			{
				test: /\.js$/,
				loader: "source-map-loader",
				enforce: "pre"
			},
			{
				test: /\.scss$/,
				loader: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin({ template: "./index.html" }),
		new MiniCssExtractPlugin({ filename: "style.css" })
	]
};
