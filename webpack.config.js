const path = require('path');

let conf = {
	entry: './src/assets/scripts/index.js',
	
	output: {
		path: path.resolve(__dirname, './dist/js'),
		filename: 'main.js',
		publicPath: 'dist/js',
	},
};


module.exports = conf;