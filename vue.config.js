const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require("path");

module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    css: {
        loaderOptions: {
			less: {
			},
			postcss: {
				plugins: [
					autoprefixer(),
					pxtorem({
						rootValue: 32,
						propList: ['*'],
					})
				]
			}
        }
      },
    // 开发端口号
    devServer: {
        port: 9527,
        // 开启host模式
        disableHostCheck:true,
    }
}