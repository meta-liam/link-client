import {wait}from '../../../utils'
import LinkClient from '../../../index'
import server from '../index'

describe("client-global:all",()=>{
  let client: LinkClient;
  beforeAll(async () => {
    client = new LinkClient("localhost", 8888);
    client.channel.setHandle(_handle,"test");
    client.channel.handleSend = _handleSend;
    await wait(40);
  });

  afterEach(async ()=>{
    await wait(50);
  });

  const _handle = (v: any) => {
    //console.log("[TEST]handle-Back:", JSON.stringify(v));
    if(v)return ;
  }

  const _handleSend = (v: any) => {
    //console.log("[TEST]_handleSend:", JSON.stringify(v));
    if(v)return ;
  }

  it("getVersion", async () => {
    let r = server.getVersion();
    //console.log("sv.version::", r );
    expect(r).toEqual('1.0.1')
  });

  it("init", async () => {
    let r = server.init("")
    //console.log("sv.version::", r );
    await wait(180);
    expect(_handleSend).toBeDefined();
  });

  it("close", async () => {
    let r = server.close()
    //console.log("sv.version::", r );
    expect(_handleSend).toBeDefined();
  });

  // it("_notify", async () => {
  //   let j =  {"jsonrpc":"2.0","method":"init","params":"","client":"client-global"}
  //   await wait(40)
  //   let r = server._notify(j)
  //   console.log("sv.version::", r );
  //   await wait(80);
  //   expect(_handleSend).toBeDefined();
  // });

});
