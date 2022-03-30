import {wait}from '../../../utils'
import LinkClient from '../../../index'
import server from '../index'

describe("xserialport:all",()=>{
  let client: LinkClient;
  beforeAll(async () => {
    client = new LinkClient(false);
    client.init('', 8888);
    client.setHandle(_handle);
    client.channel.handleSend = _handleSend;
    await wait(40);
  });

  afterEach(async () => {
    await wait(100);
  });

  let path ="";

  const _handle = (v: any) => {
    console.log("[TEST]handle-Back:", JSON.stringify(v));
    if (v) return;
  }

  const _handleSend = (v: any) => {
    console.log("[TEST]_handleSend:", JSON.stringify(v));
    if (v) return;
  }

  function handlePort(ty,v:any){
    console.log("[TEST]handle-Port::",ty,v);
    if(ty==1) autoWrite();
    if(v)return;
  }

    //send:{"jsonrpc":"2.0","method":"createPort","params":[{"path":"/dev/tty.usbmodem141401","baudRate":115200,"autoOpen":true},{"type":"JSON_RPC_CALLBACK","id":188}],"id":399,"service":"xserialport"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":399,"result":null}}
  async function createPort(){
    let ls = await server.list();
      const size = ls.length;
    if (size<1){
      return ;
    }
    const option = ls[size-1];
    await wait(100);
    //console.log("option::", option );
    path = option.path;
    server.createPort({ path: path, baudRate: 115200, autoOpen: true },handlePort);
    await wait(20);
  }

  function autoWrite(){
    setInterval(function () {
      server.write(path,[ 97, 98, 99, 100 ]);
    }, 20);
  }

  //send:{"jsonrpc":"2.0","method":"list","params":[""],"id":199,"service":"xserialport"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":[{"path":"/dev/tty.BLTH"},{"path":"/dev/tty.Bluetooth-Incoming-Port"},{"path":"/dev/tty.usbmodem141401","manufacturer":"Arduino Srl            ","serialNumber":"8573531373235150B1C0","locationId":"14140000","vendorId":"2a03","productId":"0043"}]}}
  it("list", async () => {
    let r = server.list();
    await wait(100);
    console.log("sv.list::", r );
    expect(_handleSend).toBeDefined();
  });


  //send:{"jsonrpc":"2.0","method":"getVersion","params":[""],"id":199,"service":"xserialport"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":"0.0.1"}}
  it("getVersion", async () => {
    let r = server.getVersion()
    await wait(20);
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"MessageType","params":[""],"id":399,"service":"xserialport"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":399,"result":{"1":"Open","2":"Close","3":"Disconnect","4":"Error","5":"Data","Open":1,"Close":2,"Disconnect":3,"Error":4,"Data":5}}}
  it("MessageType::", async () => {
    let r = server.MessageType()
    await wait(20);
    console.log("sv.MessageType::", r );
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(40);
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"close","params":["/dev/tty.usbmodem141401"],"id":199,"service":"xserialport"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":null}}
  it("close::", async () => {
    let r = server.close("/dev/tty.usbmodem141401")
    await wait(20);
    console.log("sv.close::", r );
    expect(_handleSend).toBeDefined();
  });

  //send:{"jsonrpc":"2.0","method":"closeAllPorts","params":[""],"id":199,"service":"xserialport"}
  //back:{"type":"result","data":{"jsonrpc":"2.0","id":199,"result":null}}
  it("closeAllPorts::", async () => {
    let r = server.closeAllPorts()
    await wait(20);
    console.log("sv.close::", r );
    expect(_handleSend).toBeDefined();
  });

  it("createPort-write:", async () => {
    await createPort();
    await wait(240);
  });


});
