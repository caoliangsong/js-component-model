module.exports = function(env = {}){

  const webpack     = require('webpack'),
        path        = require('path'),
        fs          = require('fs'),
        packageConf = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  let name      = packageConf.name,
      version   = packageConf.version,
      library   = name.replace(/^(\w)/, m => m.toUpperCase()),
      proxyPort = 8081,
      plugins   = [
          new webpack.HotModuleReplacementPlugin()
      ],
      loaders   = [];

  if(env.production){
    name += `-${version}.min`;
    //compress js in production environment
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: false,
         }
      })
    );
  }

  if(fs.existsSync('./.babelrc')){
    //use babel
    let babelConf = JSON.parse(fs.readFileSync('.babelrc'));
    loaders.push({
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: babelConf
    });
  }

  return {
    entry: './lib/app.js',
    output: {
      filename: `${name}.js`,
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/static/js/',
      library: `${library}`,
      libraryTarget: 'umd'
    },

    plugins: plugins,

    module: {
      loaders: loaders
    },
    devServer: {
        contentBase: path.join(__dirname, 'examples'),
        hot: true,
        inline: true,
        compress: true,
        port: 9005
    }
  };
}