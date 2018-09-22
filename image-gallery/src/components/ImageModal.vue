<template> 
 <div class="modal modal-mask" style="display: block" v-on:click="close_modal()">
    <div class="modal-body">
      <img :src="lightbox_img_src">
    </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
    };
  },
  components: {
  },
  computed: {
    lightbox_img_src(): any {
      return this.$store.state.lightbox.img_src
    },
    displayLightbox(): boolean {
      return this.$store.state.lightbox.display_lightbox
    }
  },
  methods: {
    close_modal() {
      this.$store.commit('remove_lightbox')
      this.$store.commit('set_lightbox_img', {
        img_src: ""})
    }
  },
  created: function() {
  }
})
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.774);
    display: table;
    transition: opacity 0.3s ease;
  }
  .modal-body {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    height: auto;
  }
  .displayfont {
    font-family: monospace;
  }
  .h3 {
    word-break: break-all;
  }
  img {
    max-height: 80vh;
  }
</style>