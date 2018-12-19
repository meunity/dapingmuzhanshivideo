// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var proxy = {};
// var mods = ["**/*.json"];
var mods = ["/sxgs","/sxps","/sxbi","***/*.json"];
var server="http://127.0.0.1:8083";
var serverPs="http://61.175.245.204:1111";
var serverGs="http://60.190.213.242:8086";
var serverBi="http://112.64.170.158:9100"
for (let i = 0; i < mods.length; i++) {
  const mod = mods[i];

  proxy[mod] = {
    target: server,
    changeOrigin: true,
    　pathRewrite: {}
  };
  if(mod=="/sxbi"){
    proxy[mod]["target"]=serverBi;
    proxy[mod]["pathRewrite"]={
      　　　　'^/sxbi': ''
              }
  }
  if(mod=="/sxgs"){
    proxy[mod]["target"]=serverGs;
    proxy[mod]["pathRewrite"]={
      　　　　'^/sxgs': ''
              }
  }
  if(mod=="/sxps"){
    proxy[mod]["target"]=serverPs;
    proxy[mod]["pathRewrite"]={
      　　　　'^/sxps': ''
              }
  }
}





module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../src/templates/webpack/index.html'),
    login: path.resolve(__dirname, '../../src/templates/webpack/login.html'),
    assetsRoot: path.resolve(__dirname, '../../src'),
    assetsSubDirectory: 'static/webpack',
    assetsPublicPath: './',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8086,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: proxy,
    cssSourceMap: false
  }
}
