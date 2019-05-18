const path = require('path')
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-art', 'react-document-title', 'redux', 'react-redux', 'react-router', 'react-router-dom',
	  'redux-thunk', 'antd', 'numeral', 'moment', 'autoprefixer', 'g2', 'g2-react', 'bizcharts', 
	  'bizcharts-plugin-slider', '@antv/data-set', 'rc-drawer-menu', 'rc-tween-one'],
  },
  /* entry: {
    vendor4: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'antd', 'numeral', 'moment'],
    vendor1: ['react-art', 'react-document-title', 'react-router-dom', 'redux-thunk', 'autoprefixer', 
      'rc-drawer-menu', 'rc-tween-one'],
    vendor2: ['g2', 'g2-react', 'bizcharts', 'bizcharts-plugin-slider', '@antv/data-set'],
  },  */
  output: {
    filename: 'dll/[name].dll.js',
    path: path.resolve(__dirname, 'public'),
    library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'public/[name]-manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',
      context: __dirname
    }),
  ],
}