const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./libs/parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: "[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.pug'
        })
    ]
};

var config;

switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            { devtool: 'source-map' },
            parts.setupLoaders(PATHS.app),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.minify()
        );
        break;
    default:
        config = merge(
            common,
            { devtool: 'eval-source-map' },
            parts.setupLoaders(PATHS.app),
            parts.devServer({
                host: process.env.HOST,
                port: process.env.port
            })
        );
        break;
}

module.exports = validate(config);
