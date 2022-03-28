import { wait } from '../../utils';
import { getChannel } from '../../channel'

const version = '1.0.1';
let connected = false;

function getVersion(): string {
  return version;
}

function init(config: string = ""): string {
  getChannel().setHandle(_handle,"client-global");//绑定handle(非必要)
  return `${config || 'ok'}`;
}
const close =()=>{
  getChannel().setHandle(null,"client-global");
}

const _handle =(v:any)=>{
  console.log("[INFO][ext.client-global._handle]:", v);
  if (v && v.type=="data" && v.data.method == "notifyMessage"){
    _notifyMessage(v.data);
  }
}

const getServiceVersion = async () => {
  if (!connected) await wait(80);
  let r = { "method": "getVersion", "params": [""], "service": "service-global" }
  connected = true;
  return await getChannel().send(r.method, r.params, r.service);
}

const _notifyMessage =(v:any)=>{
  console.log("[INFO][client.notifyMessage]:::", v);
  // if (v && v.params&& v.params[0].type=="websocket.open"){
  //   console.log('[INFO][client.ext.global._notifyMessage.websocket.open]');
  // }
}

export default { init, getVersion, getServiceVersion };
