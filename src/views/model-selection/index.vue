<template>
  <div class="model-selection" @click="toPage">
    <van-nav-bar title="室内施工机器人" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class ModelSelection extends Vue {
  private data: any = {};
  toPage() {
    this.$router.push("/selectionTypes");
  }
}
</script>

<style lang="stylus" scoped></style>
