import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export const lightbox = {
  state: {
    display_lightbox:<boolean>false,
    img_src:<string>""
  },
  mutations: {
    show_lightbox: (state:any) => {
      state.display_lightbox = true
    },
    remove_lightbox: (state:any) => {
      state.display_lightbox = false
    },
    set_lightbox_img: (state:any,src:any) => {
      state.img_src = src.img_src
    }
  }
}

export default new Vuex.Store({
    modules: {
        lightbox: lightbox
      }
})