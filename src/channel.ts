import LinkChannel from 'link-node';

const _global = (window /* browser */ || global /* node */) as any

// 全局单实例
export const getChannel = (handle: any = null, host: string = '', port: number = 0) => {
  if (_global && _global.LINK_CHANNEL) {
    return _global.LINK_CHANNEL;
  }
  let _channel = new LinkChannel(false);
  //console.log("_channel",_channel);
  if (port != 0) _channel.Config.PC.port = port;//8888;
  if (host != '') _channel.Config.PC.host = host;
  if (handle) _channel.setHandle(handle);
  _channel.init();
  _global.LINK_CHANNEL = _channel;
  return _global.LINK_CHANNEL;
}

//export default getChannel ;
