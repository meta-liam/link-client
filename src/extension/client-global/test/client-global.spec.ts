import {wait}from '../../../utils'
import LinkClient from '../../../index'

describe("getService:all",()=>{
  let client :LinkClient;
  beforeAll(async ()=>{
    client = new LinkClient("localhost",8888);
    await wait(40);
  });

  afterAll(async ()=>{
    await wait(50);
  });

  it("getService:getServiceVersion", async () => {
    let sv = client.getExtensionService("client-global");
    let r = sv.getServiceVersion()
    console.log("sv.version::", r );
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(80);
  });

});
