<template>
  <div id="app">
    <img-modal v-if="displayLightbox"></img-modal>
    <Home/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './components/Home.vue';
import Footer from './components/Footer.vue';
import ImgModal from './components/ImageModal.vue';

export default Vue.extend({
  components: {
    Home, ImgModal, Footer
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
