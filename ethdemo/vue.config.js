const { defineConfig } = require('@vue/cli-service')
const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin')

// 引入 unplugin-vue-components
const Components = require('unplugin-vue-components/webpack') 
const { VantResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new NodePolyfillWebpackPlugin(),
      // 这里是 unplugin-vue-components 的正确用法
      Components.default({
        resolvers: [VantResolver()],
      }),
    ],
  },
})

