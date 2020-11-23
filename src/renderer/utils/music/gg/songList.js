/* eslint-disable */
// import { httpFetch } from '../../request'
// import { formatPlayTime, decodeName } from '../../index'
// import { formatSinger } from './util'

export default {
  _requestObj_tags: null,
  _requestObj_hotTags: null,
  _requestObj_list: null,
  _requestObj_listDetail: null,
  limit_list: 36,
  limit_song: 10000,
  successCode: 200,
  sortList: [
    {
      name: '最新',
      id: 'new',
    },
    {
      name: '最热',
      id: 'hot',
    },
  ],

  // http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=2849349915&pn=0&rn=100&encode=utf8&keyset=pl2012&identity=kuwo&pcmp4=1&vipver=MUSIC_9.0.5.0_W1&newver=1
  // 获取标签
  async getTag(tryNum = 0) {
    return this.filterTagInfo([])
  },
  // 获取标签
  async getHotTag(tryNum = 0) {
    return this.filterInfoHotTag([])
  },
  async filterInfoHotTag(rawList) {
    return rawList.map(item => ({
      id: `${item.id}-${item.digest}`,
      name: item.name,
      source: 'gg',
    }))
  },
  async filterTagInfo(rawList) {
    return rawList.map(type => ({
      name: type.name,
      list: type.data.map(item => ({
        parent_id: type.id,
        parent_name: type.name,
        id: `${item.id}-${item.digest}`,
        name: item.name,
        source: 'gg',
      })),
    }))
  },
  // 获取列表数据
  async getList(sortId, tagId, page, tryNum = 0) {
       return {
        list: [],
        total: 10,
        page,
        limit: 10,
        source: 'gg',
      }
  },


  /**
   * 格式化播放数量
   * @param {*} num
   */
  formatPlayCount(num) {
    if (num > 100000000) return parseInt(num / 10000000) / 10 + '亿'
    if (num > 10000) return parseInt(num / 1000) / 10 + '万'
    return num
  },

  filterList(rawData) {
    return rawData.map(() => {
      return {
      play_count: 0,
      id: '',
      author: '',
      name: '',
      img: '',
      grade: '',
      desc: '',
      source: 'gg'
    }
    })
  },

  // 获取歌曲列表内的音乐
  getListDetail(id, page, tryNum = 0) {
      return {
          list: [],
          page,
          limit: body.rn,
          total: body.total,
          source: 'kw',
          info: {
              name:'',
              img: '',
              desc: '',
              author: '',
              play_count: 0,
          }
      }
  },

  filterListDetail(rawData) {
    // console.log(rawData)
    return rawData.map(item => {
      // let infoArr = item.MINFO.split(';')
      let types = []
      let _types = {}

      return {
        singer: '',
        name: '',
        albumName: '',
        albumId: '',
        songmid: '',
        source: 'gg',
        interval: 0,
        img: null,
        lrc: null,
        types,
        _types,
        typeUrl: {},
      }
    })
  },

  async getTags() {
    // return Promise.all([this.getTag(), this.getHotTag()]).then(([tags, hotTag]) => ({ tags, hotTag, source: 'kw' }))
    return { tags: [], source: 'kw' }
  },
}

// getList
// getTags
// getListDetail
