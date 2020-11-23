/* eslint-disable */

import { httpFetch } from '../../request'
import { requestMsg } from '../../message'
// import { decodeLyric } from './util'

const parseLyric = str => {
  return {
    lyric: '',
    tlyric : ''
  }
}

export default {
  searchLyric(name, hash, time, tryNum = 0) {
    return { lyric: '', tlyric: '' }
  },
  getLyricDownload(id, accessKey, tryNum = 0) {
    return { lyric: '', tlyric: '' }
  },
  getLyric(songInfo, tryNum = 0) {
    // let url = `http://localhost:3000/getLyric?pieceId=${songInfo.songmid}`
    let url = `https://crex.geekgit.com/getLyric?pieceId=${songInfo.songmid}`
    const requestObj = httpFetch(url, {})
    requestObj.promise = requestObj.promise.then((rsp) => {
      const { statusCode, body } = rsp
        console.log('getLyric => rsp, body', rsp, body)
        return statusCode === 200 ? Promise.resolve({lyric: body.lyric, tlyric: body.tlyric}) : Promise.reject(new Error(requestMsg.fail))
    })
    return requestObj
    //return { lyric: '', tlyric: '' }
  },
}
