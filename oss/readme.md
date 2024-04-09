文档

- [POST 请求对象](https://help.aliyun.com/zh/oss/developer-reference/postobject#reference-smp-nsw-wdb)


## TODO:

- [ ] 粘贴上传

## 步骤

1. 创建 RAM **用户**
2. 不需要配置权限，只需要创建 AccessKey，然后复制 AccessKey ID 和复制 AccessKey Secret
4. OSS 管理台——bucket列表——权限控制——Bucket授权策略：为刚刚创建的 RAM 用户添加“读写权限”
5. 复制 bucket 域名
6. OSS 管理台——bucket列表——数据安全——跨域设置——创建规则：支持 POST，来源和headers 都为 *
