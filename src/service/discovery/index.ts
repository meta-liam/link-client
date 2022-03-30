import { getChannel } from '../../channel'

// const health = async () => {
//   let r = { "method": "health", "params": [""], "service": "discovery" }
//   return await getChannel().send(r.method, r.params, r.service);
// }

const getNetList = async () => {
  let r = { "method": "getNetList", "params": [""], "service": "discovery" }
  return await getChannel().send(r.method, r.params, r.service);
}

const version = async () => {
  let r = { "method": "version", "params": [""], "service": "discovery" }
  return await getChannel().send(r.method, r.params, r.service);
}

const startSearchMachineService = async () => {
  let r = { "method": "startSearchMachineService", "params": [""], "service": "discovery" }
  return await getChannel().send(r.method, r.params, r.service);
}

const stopSearchMachineService = async () => {
  let r = { "method": "stopSearchMachineService", "params": [""], "service": "discovery" }
  return await getChannel().send(r.method, r.params, r.service);
}

const stopDiscoveryService = async () => {
  let r = { "method": "stopDiscoveryService", "params": [""], "service": "discovery" }
  return await getChannel().send(r.method, r.params, r.service);
}

const getMacAddress = async () => {
  let r = { "method": "getMacAddress", "params": [""], "service": "discovery" }
  return await getChannel().send(r.method, r.params, r.service);
}
export default { getNetList, version, startSearchMachineService, stopSearchMachineService, stopDiscoveryService, getMacAddress };
