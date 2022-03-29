import LinkChannel from 'link-node';

const _global = (window /* browser */ || global /* node */) as any

// 全局单实例
export const getChannel = (handle: any = null, host: string = '', port: number = 0,mustInit:boolean=false) => {
  if (_global && _global.LINK_CHANNEL && port ==0) {
    if(mustInit) _global.LINK_CHANNEL.init();
    //console.log("Had object 1")
    return _global.LINK_CHANNEL;
  }
  if (_global && _global.LINK_CHANNEL && port > 0 && port == _global.LINK_CHANNEL.Config.PC.port ) {
    if(mustInit) _global.LINK_CHANNEL.init();
    //console.log("Had object 2")
    return _global.LINK_CHANNEL;
  }
  //console.log("object 3")
  _global.LINK_CHANNEL = createChannel(handle,host,port);
  return _global.LINK_CHANNEL;
}

const createChannel =(handle: any = null, host: string = '', port: number = 0) =>{
  let _channel = new LinkChannel(false);
  //console.log("_channel",_channel);
  if (port != 0) _channel.Config.PC.port = port;//8888;
  if (host != '') _channel.Config.PC.host = host;
  if (handle) _channel.setHandle(handle);
  _channel.init();
  return _channel ;
}

export const closeChannel =()=>{
  if (_global && _global.LINK_CHANNEL) {
    _global.LINK_CHANNEL.close();
    _global.LINK_CHANNEL = null;
  }
}

//export default getChannel ;
