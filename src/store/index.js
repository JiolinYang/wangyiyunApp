import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import {getPhoneLogin} from '@/request/api/home'
export default createStore({
  state: {
    //播放列表 默认值
    playList: [{
      al: {
        id: 154102732,
        name: "携 手 偕 行",
        pic: 109951168017798740,
        picUrl: "https://p1.music.126.net/UyYKsHG6mCwTv-RjUnkAiw==/109951168017798737.jpg",
        pic_str: "109951168017798737"
      },
      id: 1410661569,//默认下标为0
      ar: [{
        name: "小卷"
      }]
    }],
    playListIndex:0,//默认下标为0
    isbtnShow:true,//暂停按钮的显示
    detailShow:false,//歌曲详情页
    lyricList:{},//歌词部分 以对象形式保存
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断是否显示底部组件
  },
  getters: {
  },
  mutations: {
    //切换播放暂停图标
    updateIsbtnShow:function(state,value){
      state.isbtnShow=value
    },
    //将搜索出来的歌曲 push到olayList里
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    //跟新播放列表
    updatePlayList:function(state,value){
      state.playList=value
      console.log(state.playList);
    } ,
    //更改歌曲下标 来控制上一首 下一首
    updatePlayListIndex:function(state,value){
      state.playListIndex = value
    },
      //弹出歌曲详情页 默认为false 当点击后直接取反 
    updateDetailShow:function(state,value){
      state.detailShow=!state.detailShow
    },
    //跟改歌词
    updatelyricList:function(state,value){
      state.lyricList=value
    },
    //改变歌曲时间
    updateCurrentTime:function(state,value){
      state.currentTime=value
    },
    //歌曲的总时长
    updateDuration:function(state,value){
      state.duration=value
    },
  },
  actions: {
    //获取歌词
    getLyric:async function(context,value){
      let res=await getMusicLyric(value)
      console.log(res);
      //提交到 mutation里的updatelyricList  value 为res.data.lrc 歌词
      context.commit("updatelyricList",res.data.lrc)
    },
    //context 里面有commit 和 dispatch等东西 是个ministore
    getLogin:async function(context,value){
      let res = await getPhoneLogin(value);
      return res
    }
  },
  modules: {
  }
})
