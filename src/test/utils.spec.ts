import { wait } from '../utils'

describe("Utils:all", () => {

  it("wait:", async () => {
    let result = false;
    let w = wait(2).then(() => {
      result = true;
    })
    await w;
    expect(result).toEqual(true);
  });

});
