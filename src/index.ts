
import { wait } from './utils'
import { getChannel } from './channel'
//const _client_global = require(`./extension/client-global/index`).default;
import client_global from './extension/client-global/index'
class LinkClient {
  channel: any = null;
  public handleServiceMessage: any = null;// 发回client的消息

  constructor(host: string = '', port: number = 0, autoInit: boolean = true) {
    if (autoInit) {
      this.init(host, port);
    }
  }

  init = async (host: string = '', port: number = 0) => {
    this.channel = getChannel(this._handleMessage, host, port)
    await wait(20);
  }

  _handleMessage = (v: any) => {
    console.log("[INFO][client._handleMessage]:::", v);
    if (this.handleServiceMessage) this.handleServiceMessage(v);
  };

  setHandle = (handle: any) => {
    this.handleServiceMessage = handle;
  }

  close = () => {
    this.channel.close();
  }

  refresh = () => {
    this.close();
    this.init();
  }

  getExtensionService = (name: string) => {
    if (name == "client-global") return client_global
    // const sv = require(`./extension/${name}/index`);
    // if (!sv) return null;
    // return sv.default;
    else return null;
  }

  getServiceVersion = async (isWait: boolean = true) => {
    if (isWait) await wait(20)
    let r = { "method": "getVersion", "params": [""], "service": "service-global" }
    return await this.channel.send(r.method, r.params, r.service);
  }

}

export default LinkClient;
module.exports = LinkClient;
