<template>
  <div>
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item icon="home-o">机器人选型</van-tabbar-item>
      <van-tabbar-item icon="star-o">金典案例</van-tabbar-item>
      <van-tabbar-item icon="friends-o">机器人小百科</van-tabbar-item>
      <van-tabbar-item icon="eye-o">查看已选</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Bottom extends Vue {
  get active() {
    return this.$store.getters["footer/getActive"];
  }
  set active(value: any) {}

  change(index: any) {
    this.$store.commit("footer/SET_ISCHANGE", true);
    this.$store.commit("footer/SET_ACTIVE", index);
    this.toPage(index);
  }
  toPage(index: number) {
    const name = this.$route.name
    if (this.$route.name !== "home" && index < 3) {
      this.$router.push("/");
    } else if(index === 3) {
      this.$router.push("/viewSelected");
    }
  }
}
</script>

<style lang="stylus" scoped></style>
