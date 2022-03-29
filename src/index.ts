
import { wait } from './utils'
import { getChannel } from './channel'
//service
import service_global from './service/service-global/index'
//extension
import client_global from './extension/client-global/index'
import discovery from './extension/discovery/index'
class LinkClient {
  channel: any = null;
  public handleServiceMessage: any = null;// 发回client的消息
  connected = false;

  constructor(autoInit: boolean = true) {
    console.log("[INFO][cli.idx.constructor]");
    if (autoInit) {
      this.init();
    }
  }

  init = async (host: string = '', port: number = 0) => {
    console.log("[INFO][cli.idx.init]");
    this.channel = getChannel(this._handleMessage, host, port)
    await wait(50);
    if (this.connected) client_global.init();
    return this.connected;
  }

  _handleMessage = (v: any) => {
    console.log("[INFO][cli._handleMessage]", v);
    if (this.handleServiceMessage) this.handleServiceMessage(v);
    if (v && v.type == "data" && v.data && v.data.params && v.data.params.type == 'websocket.close') {
      this.connected = false;
    } else {
      if (!this.connected) this.connected = true;
    }
  };

  setHandle = (handle: any) => {
    console.log("[INFO][cli.idx.setHandle]");
    this.handleServiceMessage = handle;
  }

  close = () => {
    console.log("[INFO][cli.idx.close]");
    if (this.connected && this.channel) this.channel.close();
    this.connected = false;
    this.handleServiceMessage = null;
  }

  refresh = async () => {
    console.log("[INFO][cli.idx.refresh]");
    this.channel.refresh();
    //this.close();
    // await wait(40);
    //this.init();
    await wait(80);
    return this.connected;
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

}

export default LinkClient;
module.exports = LinkClient;
