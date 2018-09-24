import Vue from 'vue';
import Vuex from 'vuex';
import {imgModalStructure,imgInfoStructure} from '../components/imageInfo'

Vue.use(Vuex)

export const lightbox = {
  state: {
    display_lightbox:<boolean>false,
    img_carousel:<Array<imgModalStructure>>[],
    img_src:<string>"",
    img_info:<imgInfoStructure>{},
    next_img:<boolean>false,
    prev_img:<boolean>false,
  },
  mutations: {
    show_lightbox: (state:any) => {
      state.display_lightbox = true
    },
    remove_lightbox: (state:any) => {
      state.display_lightbox = false
    },
    push_img: (state:any, image:any) => {
      state.img_carousel = image.carousel
    },
    set_lightbox_img: (state:any,src:any) => {
      state.img_src = src.img_src
    },
    set_lightbox_img_info: (state:any, src:any) => {
      state.img_info = src.info
    },
    show_next_img: (state:any, isShow:any) => {
      state.next_img = isShow.state
    },
    show_prev_img: (state:any, isShow:any) => {
      state.prev_img = isShow.state;
    }
  }
}

export default new Vuex.Store({
    modules: {
        lightbox: lightbox
      }
})