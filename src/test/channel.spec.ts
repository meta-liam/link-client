import {getChannel} from '../channel'

describe("Utils:all",()=>{

  it("getChannel:default", () => {
    global.LINK_CHANNEL = null;
    expect(global.LINK_CHANNEL).toEqual(null);
    const client = getChannel(null,"",0);
    expect(global.LINK_CHANNEL).toBeDefined();
    //console.log(global.LINK_CHANNEL)
  });

  it("getChannel:8888", () => {
    global.LINK_CHANNEL = null;
    expect(global.LINK_CHANNEL).toEqual(null);
    const client = getChannel(null,"localhost",8888);
    expect(global.LINK_CHANNEL).toBeDefined();
    expect(global.LINK_CHANNEL.Config.PC.port).toEqual(8888);
    //console.log(global.LINK_CHANNEL)
  });

});
