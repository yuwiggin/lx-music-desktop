/* eslint-disable */

// import '../../polyfill/array.find'
// import jshtmlencode from 'js-htmlencode'
import { httpFetch } from '../../request'
import { formatPlayTime, sizeFormate } from '../../index'
// import { debug } from '../../utils/env'
// import { formatSinger } from './util'

let searchRequest
export default {
  limit: 30,
  total: 0,
  page: 0,
  allPage: 1,
  musicSearch(str, page) {
    if (searchRequest && searchRequest.cancelHttp) searchRequest.cancelHttp()
    let url = `https://crex.geekgit.com/search/keyword=${str}&page=${page}`
    // let url = `http://localhost:3000/search/keyword=${str}&page=${page}`
    searchRequest = httpFetch(url)
    return searchRequest.promise.then(({ body }) => body)
  },
  handleResult(rawData) {
    // console.log(rawData)
    let ids = new Set()
    const list = []
    let array = []
    for(let obj in rawData) {
      array.push(obj)
    }

    array.forEach(item => {
      if (ids.has(item.audio_id)) return
      ids.add(item.audio_id)
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
      list.push({
        singer: JSON.parse(item.singers),
        name: item.title,
        albumName: '',
        albumId: '',
        songmid: item.pieceId,
        source: 'gg',
        interval: '', // formatPlayTime(item.duration),
        _interval: '', // item.duration,
        img: null,
        lrc: null,
        hash: item.publishHash,
        types,
        _types,
        typeUrl: {},
      })
    })
    return list
  },

  search(str, page = 1, { limit } = {}, retryNum = 0) {
    if (++retryNum > 2) return Promise.reject(new Error('try max num'))
    if (limit != null) this.limit = limit

    return this.musicSearch(str, page).then(result => {
      if (!result || result.status !== 200) return this.search(str, page, { limit }, retryNum)
      let list = this.handleResult(result.data)

      if (list == null) return this.search(str, page, { limit }, retryNum)

      this.total = result.data.total
      this.page = page
      this.allPage = Math.ceil(this.total / this.limit)

      return Promise.resolve({
        list,
        allPage: this.allPage,
        limit: this.limit,
        total: this.total,
        source: 'gg',
      })
    })
  },
}
