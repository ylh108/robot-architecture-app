<template>
  <div class="views">
    <div class="views-layout">
      <header class="header">
        <Header />
      </header>
      <section class="container">
        <Container>
          <transition :name="$store.state.transitionName">
            <router-view class="router" />
          </transition>
        </Container>
      </section>
      <footer class="footer">
        <Footer />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Header from "@/layouts/Header.vue";
import Container from "@/layouts/Container.vue";
import Footer from "@/layouts/Footer.vue";
@Component({
  components: {
    Header,
    Container,
    Footer
  }
})
export default class Index extends Vue {}
</script>

<style lang="stylus" scoped>
.views {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    .views-layout {
        position: relative;
        height: 100%;
    }

    .header {
        height: 1.5rem;
        overflow: hidden;
    }

    .container {
        position: relative;
        height: calc(100% - 1.5rem - 0.5rem);
        overflow: hidden;
    }
}
</style>
