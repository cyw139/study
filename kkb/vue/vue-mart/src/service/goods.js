import axios from "axios"

export default {
  getGoodsInfo(user) {
    return axios.get('/api/goods')
      .then(res => {
        //解构数据，data起了一个别名goodsInfo
        const {code, data:goodsInfo, slider, keys} = res.data
        // 数据处理
        if (code) {
          return {goodsInfo, slider, keys}
        } else {
          return null
        }
      })
  }
}
