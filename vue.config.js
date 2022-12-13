module.exports = {
  devServer:{
    port:3000, //本机端口
    disableHostCheck: true,
    proxy:{
      '/api': {
        target: 'http://120.79.45.67', //目标路径
        ws: true,
        changOrigin: true,  //允许跨域
        pathRewrite: { //重写路径，不需要传递API
          // 现在对 http://localhost:3000/api/users 的请求将会代理到 http://120.79.45.67/users
          '^/api': ''
        }
      }
    }
  }
}
