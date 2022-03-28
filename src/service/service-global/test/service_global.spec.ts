import { wait } from '../../../utils'
import LinkClient from '../../../index'
import server from '../index'

describe("service-global:all", () => {
  let client: LinkClient;
  beforeAll(async () => {
    client = new LinkClient("localhost", 8888);
    //client.setHandle(_handle);
    await wait(40);
  });

  afterAll(async () => {
    await wait(50);
  });

  // const _handle = (v:any) => {
  //   console.log("[TEST]handle-v:", JSON.stringify(v));
  // }

  it("getVersion", async () => {
    let r = server.getVersion()
    await wait(20);
    console.log("sv.getVersion::", r);
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(40);
  });

  it("init", async () => {
    let r = server.init("hi")
    await wait(20);
    console.log("sv.init::", r);
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(40);
  });

  it("askAndAnswer", async () => {
    const _callBack = (v:any) => {
      console.log("[TEST]askAndAnswer-v:", v);
    }
    await wait(40);
    let r =  server.askAndAnswer("hi", _callBack);
    await wait(20);
    console.log("sv.askAndAnswer::", r);
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(80);
  });

  it("listen", async () => {
    const _callBack = (v:any) => {
      console.log("[TEST]listen-v:", v);
    }
    await wait(40);
    let r =  server.listen( _callBack,3,10);
    await wait(120);
    console.log("sv.listen::", r);
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(80);
  });


});
