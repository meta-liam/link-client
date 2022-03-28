
export const wait = async (ms:number) => {
  let _wait = new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
  return await _wait;
}

