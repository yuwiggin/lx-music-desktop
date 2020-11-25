/* eslint-disable */
import {httpFetch, httpGet} from '../../request'
import { requestMsg } from '../../message'
import { headers, timeout } from '../options'

const api_test = {
  getMusicUrl(songInfo, type) {
      // const requestObj = httpFetch(`https://crex.geekgit.com/url/gg/${songInfo.songmid}/${type}`, {
      // const requestObj = httpFetch('https://crex.geekgit.com/ipfs/QmRjFsbGX8zdVcMCCDTay3Rrv2u7c9tQHRsYYpeA9h1vSZ', {
    let url = `https://crex.geekgit.com/getUrl?pieceId=${songInfo.songmid}&type=${type}`
    // let url = `http://localhost:3000/getUrl?pieceId=${songInfo.songmid}&type=${type}`
    const requestObj = httpFetch(url, {})
    requestObj.promise = requestObj.promise.then((rsp) => {
      const { statusCode, body } = rsp
      // console.log('getMusicUrl => rsp, body', rsp, body)
      return statusCode === 200 ? Promise.resolve({ type, url: body.url }) : Promise.reject(new Error(requestMsg.fail))
    })
    return requestObj
  }
    /*
    return obj.then(({ statusCode, body }) => {
        console.log('gg/api_test: getMusicUrl(statusCode, data)', statusCode, body)
        if (statusCode !== 200)
            return new Error(requestMsg.fail)
        return {url: body.url}
      })
    }

      let obj =  httpFetch(url, {}, (err, resp) => {
              if (err || !resp || resp.statusCode !== 200) {
                  console.log(err)
                  reject(new Error(requestMsg.fail))
              }
              resolve(resp.body)
          })


    /*
    requestObj.promise = requestObj.promise.then(({ body }) => {
      return body.code === 0 ? Promise.resolve({ type, url: body.data }) : Promise.reject(new Error(requestMsg.fail))
    })
    return requestObj

     */

}

export default api_test
