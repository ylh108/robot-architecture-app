<template>
  <div id="app">
    <transition :name="$store.state.transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="$store.state.transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Index extends Vue {
  mounted() {
    window.onload = function() {
      // 阻止ios双击页面屏幕放大
      document.addEventListener("touchstart", function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      document.addEventListener("gesturestart", function(event) {
        event.preventDefault();
      });
    };
  }
}
</script>
<style lang="stylus">
@import './stylus/index';
@import './stylus/vant';
@import './stylus/slider';

html {
    height: 100%;
    font-size: 625%;
}

body {
    height: 100%;
    margin: 0;
    font-size: 0.14rem;
}

#app {
    font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    height: 100%;
    // display: grid;
}
</style>
