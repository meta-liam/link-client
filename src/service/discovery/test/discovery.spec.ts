import { wait } from '../../../utils'
import LinkClient from '../../../index'
import server from '../index'

describe("discovery:all", () => {
  let client: LinkClient;
  beforeAll(async () => {
    client = new LinkClient(false);
    client.init('', 8888);
    client.setHandle(_handle);
    client.channel.handleSend = _handleSend;
    await wait(40);
  });

  afterEach(async () => {
    await wait(100);
  });

  const _handle = (v: any) => {
    //console.log("[TEST]handle-Back:", JSON.stringify(v));
    if (v) return;
  }

  const _handleSend = (v: any) => {
    //console.log("[TEST]_handleSend:", JSON.stringify(v));
    if (v) return;
  }

  //send: {"jsonrpc":"2.0","method":"version","params":[""],"id":199,"service":"discovery"}
  //back: {"type":"result","data":{"jsonrpc":"2.0","id":199,"result":"1.0.0"}}
  it("getVersion", async () => {
    client.channel.handlesSend = jest.fn()
    let r = server.version()
    await wait(20);
    console.log("sv.getVersion::", r);
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"getNetList","params":[""],"id":199,"service":"discovery"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":{"wlan":["10.10.100.253","10.10.100.203","10.10.100.181"],"eth":["169.254.2.1"],"localNets":["10.10.100.177","0.0.1.1"]}}}
  it("getNetList", async () => {
    client.channel.handlesSend = jest.fn()
    let r = server.getNetList()
    await wait(20);
    console.log("sv.getNetList::", r);
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"startSearchMachineService","params":[""],"id":199,"service":"discovery"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":null}}
  it("startSearchMachineService", async () => {
    client.channel.handlesSend = jest.fn()
    let r = server.startSearchMachineService()
    await wait(20);
    console.log("sv.startSearchMachineService::", r);
    expect(_handleSend).toBeDefined();
  });

  //{"jsonrpc":"2.0","method":"stopSearchMachineService","params":[""],"id":199,"service":"discovery"}
  //back: {"type":"result","data":{"jsonrpc":"2.0","id":199,"result":null}}
  it("stopSearchMachineService", async () => {
    client.channel.handlesSend = jest.fn()
    let r = server.stopSearchMachineService()
    await wait(20);
    console.log("sv.stopSearchMachineService::", r);
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"stopDiscoveryService","params":[""],"id":199,"service":"discovery"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":null}}
  it("stopDiscoveryService", async () => {
    client.channel.handlesSend = jest.fn()
    let r = server.stopDiscoveryService()
    await wait(20);
    console.log("sv.stopDiscoveryService::", r);
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"getMacAddress","params":[""],"id":199,"service":"discovery"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":{"mac":"38:f9:d3:51:d4:23"}}}
  it("getMacAddress", async () => {
    client.channel.handlesSend = jest.fn()
    let r = server.getMacAddress()
    await wait(20);
    console.log("sv.getMacAddress::", r);
    expect(_handleSend).toBeDefined();
  });

});
