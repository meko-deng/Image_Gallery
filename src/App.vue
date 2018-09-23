<template>
  <div id="app">
    <img-modal v-if="displayLightbox"></img-modal>
    <HelloWorld/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Footer from './components/Footer.vue';
import ImgModal from './components/ImageModal.vue';

export default Vue.extend({
  components: {
    HelloWorld, ImgModal, Footer
  },
  computed: {
    /**
     * Checks for the state of lightbox display in Vuex store
     * @return {boolean} state of display
     */
    displayLightbox(): boolean {
      return this.$store.state.lightbox.display_lightbox
    }      
  }
})
</script>

<style>
html { margin-left: calc(100vw - 100%); 
}
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
