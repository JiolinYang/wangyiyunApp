<template>
    <div class="FooterMusic">
      <!-- 点击事件是进入歌曲详情页 在store中updateDetailShow默认为false -->
      <div class="footerLeft" @click="updateDetailShow">
        <!-- 通过下标找歌曲 =playList[0]   找到对应的图片和名字 -->
        <img :src="playList[playListIndex].al.picUrl" alt="" />
        <div>
          <p>{{ playList[playListIndex].name }}</p>
          <span>横滑切换上下首哦</span>
        </div>
      </div>
      <div class="footerRight">
        <!-- 用v-if v-else实现点击暂停和播放的切换 -->
        <svg
          class="icon liebiao"
          aria-hidden="true"
          @click="play"
          v-if="isbtnShow"
        >
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting1"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-piliangcaozuo"></use>
        </svg>
      </div>
      <!-- 传入歌曲 -->
      <audio
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
      ></audio>
      <!-- 歌曲弹出层 -->
      <van-popup
        v-model:show="detailShow"
        position="right"
        :style="{ height: '100%', width: '100%' }"
      >
      <!-- 歌曲自闭合  父传子 prop   传入到MusicDetail中
        //传入歌曲列表 是否播放 以及播放按钮外面播放点进去里面也要播放
      传入歌曲总时长
      -->
        <MusicDetail
        
          :musicList="playList[playListIndex]"
          :play="play"
          :isbtnShow="isbtnShow"
          :addDuration="addDuration"
        />
      </van-popup>
    </div>
  </template>
  <script>
  import { mapMutations, mapState } from "vuex";
  import MusicDetail from "@/components/item/MusicDetail.vue"
  export default {
    data() {
      return {
        interVal: 0,//定时器
      };
    },
    computed: {
        //解构State里的
      ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
    },
    mounted() {
        console.log(this.$refs);
        //页面进行渲染时也要获取到歌词,this.playList[this.playListIndex].id为获取歌单对应的歌曲
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
        //在没有进入歌词页面时 歌词也需要跟着对应的时间走
        this.updateTime()
    },
    updated() {
      //当歌曲更改时就需要获取歌词  
      this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
      //添加总时长
      this.addDuration()
    },
    methods: {
      ...mapMutations([
        "updateIsbtnShow",
        "updateDetailShow",
        "updateCurrentTime",
        "updateDuration"
      ]),
      play: function () {
        // 判断音乐是否播放
        if (this.$refs.audio.paused) {
          this.$refs.audio.play();
          this.updateIsbtnShow(false);
          this.updateTime(); //播放就调用函数进行传值
        } else {
          this.$refs.audio.pause();
          this.updateIsbtnShow(true);
          clearInterval(this.interVal); //暂停清除定时器
        }
      },
      
      // FooterMusic里也需要这个值 当歌曲被播放时 滚动条就需要滚动 添加总时长
      addDuration:function(){
        this.updateDuration(this.$refs.audio.duration)
      },
      //根据对应的时间显示对应的歌词 所以时刻都要触发updateCurrentTime的函数
      // 所以需要定时器
      updateTime: function () {
        this.interVal = setInterval(() => {
          //将currentTime 传入到updateCurrentTime
          this.updateCurrentTime(this.$refs.audio.currentTime);
        }, 1000);
      },
     
    },
    watch: {
      playListIndex: function () {
        //监听如果下标发生了改变，就自动播放音乐
        //拿到的是dom里面的数据
        this.$refs.audio.autoplay = true;
        if (this.$refs.audio.paused) {
          //如果是暂停状态，改变图标
          this.updateIsbtnShow(false);
        }
      },
      //监听播放列表
      playList: function () {
        if (this.isbtnShow){
                            
          this.$refs.audio.autoplay = true;
          this.updateIsbtnShow(false);
        }
      },
    },
    components: {
      MusicDetail
    },
  };
  </script>
  <style lang="less" scoped>
  .FooterMusic {
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    .footerLeft {
      width: 60%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
    }
    .footerRight {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }
  </style>