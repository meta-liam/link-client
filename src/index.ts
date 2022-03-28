
import { wait } from './utils'
import { getChannel } from './channel'
//const _client_global = require(`./extension/client-global/index`).default;
import client_global from './extension/client-global/index'
import service_global from './service/service-global/index'
import discovery from './extension/discovery/index'
class LinkClient {
  channel: any = null;
  public handleServiceMessage: any = null;// 发回client的消息

  constructor(host: string = '', port: number = 0, autoInit: boolean = true) {
    console.log("[INFO][cli.idx.constructor]");
    if (autoInit) {
      this.init(host, port);
    }
  }

  init = async (host: string = '', port: number = 0) => {
    console.log("[INFO][cli.idx.init]");
    this.channel = getChannel(this._handleMessage, host, port)
    await wait(20);
  }

  _handleMessage = (v: any) => {
    //console.log("[INFO][cli._handleMessage]", v);
    if (this.handleServiceMessage) this.handleServiceMessage(v);
  };

  setHandle = (handle: any) => {
    console.log("[INFO][cli.idx.setHandle]");
    this.handleServiceMessage = handle;
  }

  close = () => {
    console.log("[INFO][cli.idx.close]");
    this.channel.close();
  }

  refresh = () => {
    console.log("[INFO][cli.idx.refresh]");
    this.close();
    this.init();
  }

  getService = (name: string) => {
    if (name == "service-global") return service_global;
    // const sv = require(`./extension/${name}/index`);
    // if (sv) return sv.default;
    else return null;
  }

  getExtension = (name: string) => {
    if (name == "client-global") return client_global;
    else if (name == "discovery") return discovery;
    // const sv = require(`./extension/${name}/index`);
    // if (sv) return sv.default;
    else return null;
  }

  getServiceVersion = async () => {
    return await service_global.getVersion();
  }

}

export default LinkClient;
module.exports = LinkClient;
