/* eslint-disable */
import { httpFetch } from '../../request'
import { requestMsg } from '../../message'

export default {
    getPic(songInfo) {
        let url = `https://crex.geekgit.com/getPic?pieceId=${songInfo.songmid}`
        // let url = `http://localhost:3000/getPic?pieceId=${songInfo.songmid}`
        const requestObj = httpFetch(url, {})
        requestObj.promise = requestObj.promise.then((rsp) => {
            const { statusCode, body } = rsp
            // console.log('getPic => rsp, body', rsp, body)
            return statusCode === 200? Promise.resolve({url: body.url}) : Promise.reject(new Error(requestMsg.fail))
        })
        return requestObj
    }
}
/*
    let promiseObj = new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve('图片获取失败');
        },500)
    })
    let requestObj
    requestObj.promise = promiseObj
    console.log('getPic()', requestObj)
    return requestObj
  },
}
*/