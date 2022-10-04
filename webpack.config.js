const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd= !isDev

const optimisation=()=>{
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if(isProd){
        config.minimizer  =[
            new OptimizeCssAssets(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const filename= ext=> isDev? `[name].${ext}` : `[name].[hash].${ext}`

const babelOptions=preset=>{
    const opt= {
        presets: ['@babel/preset-env',  {
            "useBuiltIns": "entry",
            "corejs": "3.22"
        }]
    }
    if(preset){
        opt.presets.push(preset)
    }

    return opt
}

const plugins=()=>{
    const base =  [
        new HTMLWebpackPlugin({
            template: '../public/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('.css'),
        })
    ]
    if(isProd){
        base.push(new BundleAnalyzerPlugin())
    }
    return base
}

module.exports={
    context: path.resolve(__dirname,"src"),
    mode:'development',
    devtool: isDev? 'inline-source-map':'inline-source-map',
    entry: ['@babel/polyfill', './index.tsx'],
    output: {
        filename:  filename('.js'),
        path:path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: './dist',
        port: 3001,
        hot: isDev,
    },
    optimization: optimisation(),
    //devtool: isDev? 'source-map': '',
    resolve: {
        extensions: ['.js','.jsx', '.json','.html','.tsx', '.ts', '.css', '.scss', '.sass', '.ico']
    },
    plugins: plugins(),
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
            },
            {
                test:/\.(png|jpg|svg|gif)$/,
                use:['file-loader']
            },
            {test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
                type: 'asset/resource',
                /*
                test:/\.(ttf|woff|woff2|eot)$/,
                loader: ['file-loader']*/
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions()
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options:  babelOptions('@babel/preset-react')
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    }

}