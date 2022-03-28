import {wait}from '../../../utils'
import LinkClient from '../../../index'
import server from '../index'

describe("client-global:all",()=>{
  let client :LinkClient;
  beforeAll(async ()=>{
    client = new LinkClient("localhost",8888);
    await wait(40);
  });

  afterAll(async ()=>{
    await wait(50);
  });

  it("getServiceVersion", async () => {
    let sv = client.getExtension("client-global");
    let r = sv.getVersion()
    console.log("sv.version::", r );
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(80);
  });

  it("getService:init", async () => {
    //let sv = client.getExtensionService("client-global");
    let r = server.init();
    console.log("sv.version::", r );
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(80);
  });


});
