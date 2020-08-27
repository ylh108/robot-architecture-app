<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Content extends Vue {}
</script>

<style lang="stylus" scoped></style>
