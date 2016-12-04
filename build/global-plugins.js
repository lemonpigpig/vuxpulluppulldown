/**
 * Created by moon on 16/8/31.
 */
var webpack = require('webpack')

//增加全局依赖
var plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        'common': 'src/share-js/common/common.js',
        'webAppSdk': 'src/share-js/common/webAppSdk.js',
        'UploadFile':'src/share-js/common/UploadFile.js',
        'GlobalModel': 'src/share-js/common/global.js',
        'weiXin': 'weixin-js-sdk',
        'fastClick': 'fastclick',
        'AjaxHelper': 'src/share-js/common/AjaxHelper.js',
        'BrowserHelper': 'src/share-js/common/BrowserHelper.js',
        'WxSdkHelper':'src/share-js/common/WxSdkHelper.js'
    })
];

module.exports = {
    plugins: plugins
}
