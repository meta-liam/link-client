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

  it("getChannel:check", () => {
    global.LINK_CHANNEL = null;
    const client = getChannel(null,"localhost",8888);
    expect(global.LINK_CHANNEL).toBeDefined();
    global.LINK_CHANNEL.init = jest.fn();
    const client2 = getChannel(null,"",8888);
    //expect(global.LINK_CHANNEL.init).toBeCalled();
    expect(global.LINK_CHANNEL.Config.PC.port).toEqual(8888);
    const client3 = getChannel(null,"",0);
    //expect(global.LINK_CHANNEL.init).toBeCalled();
    expect(global.LINK_CHANNEL.Config.PC.port).toEqual(8888);
    const client4 = getChannel(null,"",1234);
    //expect(global.LINK_CHANNEL.init).toBeCalled();
    expect(global.LINK_CHANNEL.Config.PC.port).toEqual(1234);
    //console.log(global.LINK_CHANNEL)
  });

});
