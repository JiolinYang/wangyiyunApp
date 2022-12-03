<template>
  <div class="home">
    <TopNav/>
    <SwpierTop/>
    <IconList/>
    <MusicList/>
  </div>
</template>

<script>
import TopNav from '@/components/home/TopNav';
import SwpierTop from '@/components/home/SwpierTop';
import IconList from '@/components/home/IconList';
import MusicList from '@/components/home/MusicList';
export default {
  name: 'Home',
  components: {
    TopNav,SwpierTop,IconList,MusicList
  }
}
</script>
