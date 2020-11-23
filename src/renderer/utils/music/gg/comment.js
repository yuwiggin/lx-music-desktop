/* eslint-disable */

import { httpFetch } from '../../request'
import { dateFormat2 } from '../../'

export default {
  _requestObj: null,
  _requestObj2: null,
  async getComment({ hash }, page = 1, limit = 20) {
    if (this._requestObj) this._requestObj.cancelHttp()
    return { source: 'gg', comments:  [], total: 0, page, limit, maxPage:  1 }
  },
  async getHotComment({ hash, songmid }, page = 1, limit = 100) {
    // console.log(songmid)
    if (this._requestObj2) this._requestObj2.cancelHttp()
    return { source: 'gg', comments: [] }
  },
  async getReplyComment({ songmid }, replyId, page = 1, limit = 100) {
    if (this._requestObj2) this._requestObj2.cancelHttp()
    return { source: 'gg', comments: [] }
  },
  filterComment(rawList) {
    return rawList.map(item => {
      let data = {
        id: item.id,
        text: item.content.split('\n'),
        time: item.addtime,
        timeStr: dateFormat2(new Date(item.addtime).getTime()),
        userName: item.user_name,
        avatar: item.user_pic,
        userId: item.user_id,
        likedCount: item.like.likenum,
        replyNum: item.reply_num,
        reply: [],
      }

      return item.pcontent ? {
        id: item.id,
        text: item.pcontent.split('\n'),
        time: null,
        userName: item.puser,
        avatar: null,
        userId: item.puser_id,
        likedCount: null,
        replyNum: null,
        reply: [data],
      } : data
    })
  },
}
