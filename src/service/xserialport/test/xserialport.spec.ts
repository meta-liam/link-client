import {wait}from '../../../utils'
import LinkClient from '../../../index'
import server from '../index'

describe("xserialport:all",()=>{
  let client :LinkClient;
  beforeAll(async ()=>{
    client = new LinkClient(false);
    client.init('',8888)
    await wait(40);
  });

  afterAll(async ()=>{
    await wait(50);
  });

  it("list", async () => {
    let r = server.list();
    await wait(50);
    console.log("sv.list::", r );
    //expect(r).not.toEqual(null);
    await wait(80);
  });


  it("getVersion", async () => {
    let r = server.getVersion()
    await wait(10);
    console.log("sv.getVersion::", r );
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(40);
  });

  it("MessageType", async () => {
    let r = server.MessageType()
    await wait(20);
    console.log("sv.MessageType::", r );
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(40);
  });

  it("MessageType", async () => {
    let r = server.MessageType()
    await wait(20);
    console.log("sv.MessageType::", r );
    //expect(sv.getVersion()).not.toEqual(null)
    await wait(40);
  });



});
