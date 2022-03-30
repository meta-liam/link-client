import { getChannel } from '../../channel'

const list = async () => {
  let r = { "method": "list", "params": [""], "service": "xserialport" }
  return await getChannel().send(r.method, r.params, r.service);
}

const getVersion = async () => {
  let r = { "method": "getVersion", "params": [""], "service": "xserialport" }
  return await getChannel().send(r.method, r.params, r.service);
}

const MessageType = async () => {
  let r = { "method": "MessageType", "params": [""], "service": "xserialport" }
  return await getChannel().send(r.method, r.params, r.service);
}

const createPort = async (option:any,callback: (type: string,data:any) => void) => {
  let r = { "method": "createPort", "params": [option,callback], "service": "xserialport" }
  return await getChannel().send(r.method, r.params, r.service);
}

const write = async (path: string, arr: Array<number>) => {
  let r = { "method": "write", "params": [path,arr], "service": "xserialport" }
  return await getChannel().send(r.method, r.params, r.service);
}

const close = async (path: string) => {
  let r = { "method": "close", "params": [path], "service": "xserialport" }
  return await getChannel().send(r.method, r.params, r.service);
}

const closeAllPorts = async () => {
  let r = { "method": "closeAllPorts", "params": [""], "service": "xserialport" }
  return await getChannel().send(r.method, r.params, r.service);
}

export default { list,getVersion ,MessageType,createPort,write,close,closeAllPorts};
