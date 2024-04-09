# cookie 相关知识

- 父类 cookie

服务器在 api.hello.localhost
客户端在 www.hello.localhost

当访问 api.hello.localhost 时，服务器会设置响应标头 set-cookie，同时指定 domain=.hello.localhost
此时在 api.hello.localhost 和 www.hello.localhost 的应用程序中都可以看到对应的 cookie。

而当不指定 cookie 的 domain 时，默认会是 api.hello.localhost，此时 cookie 就只在 api.hello.localhost
的应用程序中可见。

- 何时携带 cookie

非 https 链接时，**仅限相同站点的连接**。

所以你在 www.hello.localhost 网站的 devtool-network 中会看到，虽然有响应 cookie，而且不会被阻止，但它并不会保存下来。同样的，发送请求时，也并不会携带。

即使你可以通过直接访问 api.hello.localhost ，将 cookie 存储下来，但发送时也并不会携带 cookie。这就是为什么新手调试时，发现应用程序中明明有 cookie，但就是不携带的问题所在！
