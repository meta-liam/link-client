
import { wait } from './utils'
import { getChannel } from './channel'

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
    const sv = require(`./extension/${name}/index`);
    if (!sv) return null;
    return sv.default;
  }

  getServiceVersion = async (isWait: boolean = true) => {
    if (isWait) await wait(20)
    let r = { "method": "getVersion", "params": [""], "service": "service-global" }
    return await this.channel.send(r.method, r.params, r.service);
  }

}

export default LinkClient;
module.exports = LinkClient;
