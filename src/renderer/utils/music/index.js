import kw from './kw'
import kg from './kg'
import tx from './tx'
import wy from './wy'
import mg from './mg'
import xm from './xm'
import gg from './gg'
import { supportQuality } from './api-source'


const sources = {
  sources: [
    {
      name: '酷我音乐',
      id: 'kw',
    },
    {
      name: '酷狗音乐',
      id: 'kg',
    },
    {
      name: 'QQ音乐',
      id: 'tx',
    },
    {
      name: '网易音乐',
      id: 'wy',
    },
    {
      name: '咪咕音乐',
      id: 'mg',
    },
    {
      name: '虾米音乐',
      id: 'xm',
    },
    {
      name: '杰集音乐',
      id: 'gg',
    },
  ],
  kw,
  kg,
  tx,
  wy,
  mg,
  xm,
  gg,
}
export default {
  ...sources,
  init() {
    for (let source of sources.sources) {
      let sm = sources[source.id]
      // console.log('music.index: source.id', source.id)
      sm && sm.init && sm.init()
    }
  },
  supportQuality,
}
