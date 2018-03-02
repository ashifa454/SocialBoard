const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    context : resolve(__dirname, 'client'),

    entry : ['./index.js'],
    output : {
        filename : 'client.bundle.js',      // output filename
        path : resolve(__dirname, 'build'), // output path
        publicPath : '/'
    },

    module : {
        rules : [
            {
                test : /\.jsx?$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : ['env', 'react']  // ES2015, React를 이용해서 빌드한다.
                    },
                }
            },
            {
                test: /\.css$/,
                exclude : /node_modules/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ],
    },

    devtool : 'inline-source-map'
};