// 获取当前目录
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');

module.exports = {

  // js文件入口
  // 加babel 提供低版本的兼容性，但是包就大了
  // entry:['babel-polyfill','./src/main.js'],
  entry: './src/main.js',
  // 生成的js文件出口
  output: {
    // 拼接成绝对路径
    path: path.join(__dirname, './dist/'),
    filename: 'bundle.js',//打包后的js文件名称
  },
  //配置这条，报错的时候提示信息会定位到编译前的各个文件中
  devtool: "inline-source-map",
  //这里开始配置
  plugins: [
    // 该插件的作用就是把 index.html 打包到你的 bundle.js  文件所属目录
    // 也就是说 bundle 到哪里，index.html 就放到哪里
    // 同时这个插件也会自动在index.html 中注入 script引用链接（原先写的src=bundle.js 不需要了）
    // 而且引用的资源名称，也取决于你的bundle叫什么
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),


    // 打包成分分析
    // new BundleAnalyzerPlugin(),
    //然后再package.json里面加这一条
    //"analyz": "NODE_ENV=production npm_config_report=true npm run build"


  ],
  devServer: {
    //配置webpack-dev-server 的 www 目录
    //浏览器真正运行查看的是打包之后的结果
    //让打包结果运行在虚拟目录中（打包在内容中，加快打包速度）
    // ./ 的话，表示直接虚拟打包在根目录下，一般就这么做
    contentBase: './',
    hot: true,
    proxy: {
      '/myBlog': {
        target: 'http://127.0.0.1:3333',
        // pathRewrite: {'^/api': ''},
        // secure:false,
        changeOrigin: true
        // 如果存在跨域，配上changeOrigin: true,
      }
    }
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    // 'vue-quill-editor':'VueQuillEditor',
    'mavon-editor': 'MavonEditor'
  },
  // 添加css支持
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",//动态创建的style节点插入到head中
          "css-loader"	//把css文件转换为javascript模块
          //执行顺序是从后往前
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      // 打包less配置
      {
        test: /\.less$/,
        use: [
          "style-loader",//3，生成的style插入head中
          "css-loader",//2，把css转成JavaScript模块
          "less-loader"//1，先把less转成css
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,//排除，不转换第三方包node_module文件夹中的
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            // 缓存打包内容，加速打包速度
            cacheDirectory: true,
            plugins: ['transform-runtime']
          }
        }
      },
      {
        test: /.vue$/,
        use: [
          "vue-loader"
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }

    ]
  }
}