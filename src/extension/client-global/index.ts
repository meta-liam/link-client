import { wait } from '../../utils';
import { getChannel } from '../../channel'

const version = '1.0.1';
let connected = false;

function getVersion(): string {
  return version;
}

function init(config: string = ""): string {
  return `${config || 'ok'}`;
}

const getServiceVersion = async () => {
  if (!connected) await wait(80);
  let r = { "method": "getVersion", "params": [""], "service": "service-global" }
  connected = true;
  return await getChannel().send(r.method, r.params, r.service);
}

export default { init, getVersion, getServiceVersion };
