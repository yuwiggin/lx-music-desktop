/* eslint-disable */

import { httpGet, cancelHttp } from '../../request'
import { formatPlayTime, sizeFormate } from '../../index'

let boardList = [{ id: 'gg__8888', name: '原创新歌榜', bangid: '8888' }]

export default {
  list: [
    {
      id: 'gg8888',
      name: '原创新歌榜',
      bangid: '8888',
    },
  ],
  getUrl(id, p) {
    return `https://crex.geekgit.com/getRanking/page=${p}&rankId=${id}`
    // return `http://localhost:3000/getRanking/rankId=${id}&page=${p}`
  },

  _requestBoardsObj: null,
  _requestObj: null,
  _cancelPromiseCancelFn: null,
  limit: 100,

  getData(url) {
    if (this._requestObj != null) {
      cancelHttp(this._requestObj)
      this._cancelPromiseCancelFn(new Error('取消http请求'))
    }
    return new Promise((resolve, reject) => {
      this._cancelPromiseCancelFn = reject
      this._requestObj = httpGet(url, (err, resp) => {
        // console.log('gg/leaderboard: getData() err, resp', err, resp)
        this._requestObj = null
        this._cancelPromiseCancelFn = null
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(resp)
      })
    })
  },

  filterData(rawData) {
    /* console.log
    let array = []
    for(let obj in rawData) {
      array.push(rawData[obj])
    } */
    // console.log('array.length', rawData.length)
    return rawData.map(item => {
      const types = []
      const _types = {}
      if (item.filesize !== 0) {
        let size = sizeFormate(item.filesize)
        types.push({ type: '128k', size, hash: item.hash })
        _types['128k'] = {
          size,
          hash: item.hash,
        }
      }

      return {
        singer: item.authorNames,
        name: item.title,
        albumName: '',
        albumId: '',
        songmid: item.pieceId,
        source: 'gg',
        interval: '', //formatPlayTime(item.duration / 1000),
        img: null,
        lrc: null,
        hash: item.publishHash,
        types,
        _types,
        typeUrl: {},
      }
    })
  },

  async getBoards(retryNum = 0) {
    this.list = boardList
    return {
      list: boardList,
      source: 'gg',
    }
  },

  getList(bangid, page, retryNum = 0) {
    if (++retryNum > 3) return new Error('try max num')
    // return httpGet(this.getUrl(bangid, page), {}, (err, rsp) => {
    return this.getData(this.getUrl(bangid, page)).then(({ statusCode, body }) => {
        // console.log('gg/leaderboard: getList(statusCode, data)', statusCode, body)
        if (statusCode !== 200) return this.getList(bangid, page, retryNum)
        const list = this.filterData(body.data)
        // console.log('gg/leaderboard:getList: total, limit, page', list.length, this.limit, page, list)
        return {
          total: list.length,
          list,
          limit: this.limit,
          page,
          source: 'mg',
        }
      })
  }
}
