import LinkClient from '../index'
import {wait} from '../utils'

describe("LinkClient:all", () => {

  beforeEach(() => {
    global.LINK_CHANNEL = null;
  });

  afterAll(async ()=>{
    await wait(50);
  })

  it("init:true", () => {
    global.LINK_CHANNEL =null;
    const client = new LinkClient();
    expect(client.init).toBeDefined();
    expect(global.LINK_CHANNEL).toBeDefined();
  });

  it("init:false", () => {
    global.LINK_CHANNEL = null;
    const client = new LinkClient("",0,false);
    client.init = jest.fn();
    expect(client.init).not.toBeCalled();
    expect(global.LINK_CHANNEL).toEqual(null);
    //console.log(global.LINK_CHANNEL)
  });

  it("getServiceVersion:", async () => {
    const client = new LinkClient("localhost",8888);
    await wait(20);
    client.getServiceVersion().then((v)=>{
      console.log("version:", v);
    });
    await wait(20);
  });

  it("getService:", async () => {
    const client = new LinkClient("",8888,false);
    let sv = client.getExtensionService("client-global");
    console.log("sv.version::",sv.getVersion());
    //expect(sv.getVersion()).not.toEqual(null);
  });

});
