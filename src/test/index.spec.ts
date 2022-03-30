import LinkClient from '../index'
import { wait } from '../utils'

describe("LinkClient:all", () => {

  beforeEach(() => {
    global.LINK_CHANNEL = null;
  });

  afterAll(async () => {
    await wait(50);
  })

  const _handle = (v: any) => {
    //console.log("[TEST]handle-Back:", JSON.stringify(v));
    if (v) return;
  }

  const _handleSend = (v: any) => {
    //console.log("[TEST]_handleSend:", JSON.stringify(v));
    if (v) return;
  }

  it("init:true", () => {
    const client = new LinkClient(true);
    expect(client.init).toBeDefined();
    expect(global.LINK_CHANNEL).toBeDefined();
  });

  it("init:false", () => {
    const client = new LinkClient(false);
    client.init = jest.fn();
    expect(client.init).not.toBeCalled();
    expect(global.LINK_CHANNEL).toEqual(null);
    //console.log(global.LINK_CHANNEL)
  });

  it("init:_handleMessage", async () => {
    const client = new LinkClient(false);
    let _handleMessage = jest.fn((v) => {
      //console.log("v:::",v);
      if (v) return;
    });
    client.setHandle(_handleMessage);
    let res = client.init("localhost", 8888);
    expect(global.LINK_CHANNEL).toBeDefined();
    await wait(80);
    //console.log("result:",res);
  });

  it("init:setHandle", async () => {
    const client = new LinkClient(true);
    let _handleMessage = jest.fn((v) => {
      //console.log("v:::",v);
      if (v) return;
    });
    client.setHandle(_handleMessage);
    expect(client.handleServiceMessage).toBeDefined();
    await wait(80);
  });

  // it("close:all", async () => {
  //   const client = new LinkClient(false);
  //   client.init("", 8888);
  //   await wait(50);
  //   console.log("client.connected 1:", client.connected);
  //   client.close();
  //   expect(client.connected).toEqual(false);
  //   console.log("client.connected 2:", client.connected);
  //   await wait(150);
  // });

  it("close:A", async () => {
    const client = new LinkClient(false);
    client.close();
    expect(client.connected).toEqual(false);
  });

  it("refresh:all", async () => {
    const client = new LinkClient(false);
    client.init("", 8888);
    await wait(80);
    //console.log("port 1:", client.channel.Config.PC.port, client.connected);
    client.refresh();
    await wait(180);
    //console.log("port 2:", client.channel.Config.PC.port, client.connected);
    expect(client.channel.Config.PC.port).toEqual(8888);
    await wait(80);
  });


  it("getService.service-global:", async () => {
    const client = new LinkClient(false);
    client.init('', 8888);
    let sv = client.getService("service-global");
    //console.log("sv.version::", sv);
    //expect(sv.getVersion()).not.toEqual(null);
    await wait(80);
  });

  it("getExtension.client-global:", async () => {
    const client = new LinkClient(false);
    let sv = client.getExtension("client-global");
    console.log("sv.version::", sv.getVersion());
    expect(sv.getVersion()).not.toEqual(null);
  });

});
