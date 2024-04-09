# 测试 cookie

案例说明：

- 01 前后端同源（前端直接部署在后端中）
- 02 前后端不同源（也就是第三方 cookie）注意第三方 cookie 将被废弃。同时，如果用户可以禁止第三方 cookie。配置第三方 cookie 需要以下条件
  - https
  - 响应标头 Access-Control-Allow-Credentials 为 true
  - 响应标头 Access-Control-Allow-Origin 指定具体域，不能是 *
  - cookie 中配置 sameSite='none' 和 secure=true
  - 客户端请求时需要开启 withCredentials （详见 [index.html] 中的代码，提供了 fetch 和 axios 的案例）
- 03 同 02，但使用原生 https 模块实现 https，而不需要借助 nginx

> 同源，要求域名相同，同时端口也相同。 `localhost` 和 `api.localhost` 是不同源的。

[index.html]: 02/index.html
