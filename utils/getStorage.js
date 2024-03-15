export async function getStorage(key) {
  let data = null;
  try {
    const res = await wx.getStorage({
      key
    })
    data = res.data;
  } catch (error) {

  }

  return data;
}