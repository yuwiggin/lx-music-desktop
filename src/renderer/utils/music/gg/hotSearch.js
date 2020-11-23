/* eslint-disable */

import { httpFetch } from '../../request'

export default {
  _requestObj: null,
  async getList(retryNum = 0) {
    if (this._requestObj) this._requestObj.cancelHttp()
    return { source: 'gg', list: [] }
  },
  filterList(rawList) {
    const list = []
    rawList.forEach(item => {
      item.keywords.map(k => list.push(k.keyword))
    })
    return list
  },
}
