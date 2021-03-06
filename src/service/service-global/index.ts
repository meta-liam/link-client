import { getChannel } from '../../channel'

const getVersion = async ()=> {
  let r = { "method": "getVersion", "params": [""], "service": "service-global" }
  return await getChannel().send(r.method, r.params, r.service);
}

const init = async (config: any = "") => {
  let r = { "method": "init", "params": [config], "service": "service-global" }
  return await getChannel().send(r.method, r.params, r.service);
}

const askAndAnswer = async (ask: string, answerCallback: (value: string) => void) => {
  let r = { "method": "askAndAnswer", "params": [ask, answerCallback], "service": "service-global" }
  return await getChannel().send(r.method, r.params, r.service);
}

const listen = async (onData: (data: string) => void, num: number = 5, ms: number = 500)=> {
  let r = { "method": "listen", "params": [onData,num,ms], "service": "service-global" }
  return await getChannel().send(r.method, r.params, r.service);
}

const close = async (): Promise<string> => {
  let r = { "method": "close", "params": [""], "service": "service-global" }
  return await getChannel().send(r.method, r.params, r.service);
}

export default { init, getVersion, askAndAnswer,listen ,close};
