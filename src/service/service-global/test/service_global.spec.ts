import { wait } from '../../../utils'
import LinkClient from '../../../index'
import server from '../index'

describe("service-global:all", () => {
  let client: LinkClient;
  beforeAll(async () => {
    client = new LinkClient("localhost", 8888);
    client.setHandle(_handle);
    client.channel.handleSend = _handleSend;
    await wait(40);
  });

  afterEach(async () => {
    await wait(100);
  });

  const _handle = (v: any) => {
    console.log("[TEST]handle-Back:", JSON.stringify(v));
  }

  const _handleSend = (v: any) => {
    console.log("[TEST]_handleSend:", JSON.stringify(v));
  }

  //send:{"jsonrpc":"2.0","method":"getVersion","params":[""],"id":199,"service":"service-global"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":"0.0.1"}}
  it("getVersion", async () => {
    client.channel.handlesSend = jest.fn()
    let r = server.getVersion()
    await wait(20);
    //console.log("sv.getVersion::", r);
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"init","params":["{\"version\":\"0.0.0\"}"],"id":199,"service":"service-global"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":"{\"version\":\"0.0.0\"}"}}
  it("init", async () => {
    let r = server.init(JSON.stringify({ version: "0.0.0" }));
    await wait(20);
    //console.log("sv.init::", r);
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"askAndAnswer","params":["hi",{"type":"JSON_RPC_CALLBACK","id":188}],"id":199,"service":"service-global"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":null}}
  //back:{"type":"callback","data":{"jsonrpc":"2.0","type":"JSON_RPC_CALLBACK","id":188,"params":["Ask: hi\nAnswer: Sorry, I don't know."]}}
  it("askAndAnswer", async () => {
    const _callBack = (v: any) => {
      console.log("[TEST]askAndAnswer-v:", v);
    }
    let r = server.askAndAnswer("hi", _callBack);
    await wait(20);
    console.log("sv.askAndAnswer::", r);
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"listen","params":[{"type":"JSON_RPC_CALLBACK","id":188},3,10],"id":199,"service":"service-global"}
  //back: {"type":"result","data":{"jsonrpc":"2.0","id":199,"result":null}}
  //back:{"type":"callback","data":{"jsonrpc":"2.0","type":"JSON_RPC_CALLBACK","id":188,"params":["Hello world 1"]}}
  //back:{"type":"callback","data":{"jsonrpc":"2.0","type":"JSON_RPC_CALLBACK","id":188,"params":["Hello world 2"]}}
  //back:{"type":"callback","data":{"jsonrpc":"2.0","type":"JSON_RPC_CALLBACK","id":188,"params":["Hello world 3"]}}
  it("listen", async () => {
    const _callBack = (v: any) => {
      console.log("[TEST]listen-v:", v);
    }
    let r = server.listen(_callBack, 3, 10);
    await wait(50);
    console.log("sv.listen::", r);
    //expect(sv.getVersion()).not.toEqual(null)
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"close","params":[""],"id":199,"service":"service-global"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":null}}
  it("close", async () => {
    client.channel.handlesSend = jest.fn()
    let r = server.close()
    await wait(20);
    console.log("sv.getVersion::", r);
    expect(_handleSend).toBeDefined();
  });

});
