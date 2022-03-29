import { wait } from '../../utils';
import { getChannel } from '../../channel'
import sv from '../../service/service-global/index'

const version = '1.0.1';
let connected = false;

const getVersion = (): string => {
  return version;
}

const init = (config: string = ""): string => {
  if (!connected) getChannel().setHandle(_handle, "client-global");//绑定handle
  sv.init(JSON.stringify({ version }));//服务端init
  return `${config || 'ok'}`;
}

const close = () => {
  connected = false;
  getChannel().setHandle(null, "client-global");
}

// {"type":"data","data":{"jsonrpc":"2.0","method":"notifyMessage","params":{"type":"websocket.open","open":true},"client":"client-global"}}
const _handle = (v: any) => {
  //console.log("[INFO][cli.ext.global._handle]:", v);
  if (!connected) connected = true;
  //处理 service 主动请求
  if (v && v.type == "data" && v.data.client == "client-global") {
    _notify(v.data);
  }
}

// 处理服务端请求业务
const _notify = (v: any) => {
  console.log("[INFO][cli.ext.global.notify]:", v);
  if (v && v.method === "notifyMessage") {
    console.log('[INFO][client.ext.global._notifyMessage:]', v.params);
  }
  else if (v && v.method === "init") {
    console.log("INIT");
    init(v.params)
  }
}


export default { init, getVersion, close };
