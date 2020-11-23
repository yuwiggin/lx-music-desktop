/* eslint-disable */

import { apis } from '../api-source'

import leaderboard from './leaderboard'
import songList from './songList'
import musicSearch from './musicSearch'
import pic from './pic'
import lyric from './lyric'
import hotSearch from './hotSearch'
import comment from './comment'


const gg = {
  leaderboard,
  songList,
  musicSearch,
  hotSearch,
  comment,
  getMusicUrl(songInfo, type) {
    return apis('gg').getMusicUrl(songInfo, type)
  },
  getLyric(songInfo) {
    return lyric.getLyric(songInfo)
  },
  // getLyric(songInfo) {
  //   return apis('kg').getLyric(songInfo)
  // },
  getPic(songInfo) {
    return pic.getPic(songInfo)
  },
  getMusicDetailPageUrl(songInfo) {
    return `https://www.kugou.com/song/#hash=${songInfo.hash}`
  },
  // getPic(songInfo) {
  //   return apis('kg').getPic(songInfo)
  // },
}

export default gg
