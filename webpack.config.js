const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
	reolve: {
		fallback: {
			stream: require.resolve("stream-browserify"),
			crypto: require.resolve("crypto-browserify"),
			path: require.resolve("path-browserify"),
			zlib: require.resolve("browserify-zlib"),
			os: require.resolve("os-browserify/browser"),
		},
	},
	plugins: [new NodePolyfillPlugin()],
};
