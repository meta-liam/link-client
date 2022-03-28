# link-client

link-client 用于 浏览器端 和 nodejs 端。

## 安装

```bash
nrm use xxx

npm i link-client --registry=https://registry.npmmirror.com
```

## 使用

暂时只支持单实例子

```javascript
import LinkClient from 'link-client';

// 默认（第1次链接要时间初始化，ios,pc,android时间不定）
const client = new LinkClient();

// //[定制](pc.ws默认：52384 和 localhost)
// const client = new LinkClient("localhost",8888);

//获取版本信息（握手）
const version = client.getServiceVersion().then(v){
  console.log("version:",version);
};
//const version = await client.getServiceVersion(); // return "0.0.1"

//监听服务日志（非必要）
handleMessage = (v: any) => {
  console.log("[TEST]handleMessage:", v);
};
client.setHandle(this.handleMessage);

//异常刷新 （非必要）
client.refresh()

//关闭服务
client.close();

// 服务方法
const sv = client.getExtensionService("client-global");
console.log("sv.version::",sv.getVersion());

```

## 开发与测试

[开发文档](./docs/development.md)
