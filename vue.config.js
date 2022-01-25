module.exports = {
    chainWebpack: config => {
        config
          .plugin('html')
          .tap(args => {
            args[0].title= 'MBA特色學習登錄'
            return args
          })
      },
      
    // 開發環境中使用的端口
    devServer: {
        port: 8080
    },
    // 取消生成map文件（map文件可以準確的輸出是哪一行哪一列有錯）
    productionSourceMap: false,
    // 開發環境和部署環境的路徑
    publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
   
    }