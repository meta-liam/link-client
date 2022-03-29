// import LinkClient from 'link-client';
import LinkClient from '../dist/index';


async function start() {
  const client = new LinkClient(false);
  //await client.init("localhost", 8888);//自定义
  await client.init();//默认值

  if (client.connected) {
    console.log("设备初始化成功！");
  }

  // 获取底层硬件API
  if (client.connected) {
    let sv = client.getService("service-global");
    console.log("sv.version::", sv.getVersion());
  }

  // 获取扩展API
  if (client.connected) {
    let sv = client.getExtension("client-global");
    console.log("sv.version::", sv.getVersion());
  }

  // 获取扩展：discovery
  if (client.connected) {
    let sv = client.getExtension("discovery");
    console.log("sv.getNetList::", sv.getNetList());
  }

  //监听服务日志（非必要）
  const handleMessage = (v: any) => {
    console.log("[TEST]handleMessage:", v);
  };
  client.setHandle(this.handleMessage);

  //异常刷新 （非必要）
  client.refresh()

  //关闭服务
  client.close();
}
