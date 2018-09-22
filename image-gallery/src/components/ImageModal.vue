<template> 
 <div class="modal modal-mask">
    <a v-on:click="close_modal()">Press me</a>    
    <div class="modal-body">
        <img :src="currentImage">      
        <div class="thumbnails">
            <figure 
                v-for="(img,index) in lightbox_img_carousel" 
                :key="index"
                :class="(activeImage == index) ? 'active' : ''"
                v-on:click="activateImage(index)">
                <img :src="img.img_src">
            </figure>
            </div>
    </div>
    <figcaption>
        <div :class="[(activeInfo) ? 'activeInfo' : 'text']">
            <a v-on:click="activateInfo()">{{expandMessage}}</a>
            <p>{{img_info.img_likes}}</p>
            <p>{{img_info.img_text}}</p>
        </div>
    </figcaption>    
</div>
</template>

<script lang="ts">
import Vue from "vue";
import {imgModalStructure,imgInfoStructure} from './imageInfo'
import { lightbox } from "../store/modal_store";

export default Vue.extend({
  data() {
    return {
        activeImage:<number>0,
        activeInfo:<boolean>false,
        expandMessage:<string>"Show More"
    };
  },
  components: {
  },
  computed: {
    lightbox_img_src(): string {
      return this.$store.state.lightbox.img_src
    },
    displayLightbox(): boolean {
      return this.$store.state.lightbox.display_lightbox
    },
    lightbox_img_carousel(): imgModalStructure [] {
        return this.$store.state.lightbox.img_carousel
    },
    currentImage():string {
        if (this.lightbox_img_carousel.length != 0) {
            return this.lightbox_img_carousel[this.activeImage].img_src
        } else {
            return this.$store.state.lightbox.img_src
        }
    },
    img_info(): imgInfoStructure {
        return this.$store.state.lightbox.img_info
    }
  },
  methods: {
    close_modal():void {
      this.$store.commit('remove_lightbox')
      this.$store.commit('set_lightbox_img', {
        img_src: ""})
    },
    activateImage(imageIndex:number):void {
        console.log('clicked')
        this.activeImage = imageIndex
    },
    activateInfo():void {
        if(!this.activeInfo){
            this.activeInfo = true
            this.expandMessage = "Show Less"
        } else {
            this.activeInfo = false
            this.expandMessage = "Show More"            
        }
    }
  }
})
</script>

<style scoped>
    .modal a {
        position: absolute;
        right: 1vw;
        top: 0;
    }
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: table;
        transition: opacity .5s ease;
    }
    .modal-body {
        position: absolute;
        height: auto;
        width: 50vw;      
        top: 50%; 
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .active > img {
        opacity: 0.3;
    }
    .displayfont {
        font-family: monospace;
    }
    .h3 {
        word-break: break-all;
    }
    img {
        max-width: 50vw;
        max-height: 70vh;
        border-radius: 4px;
    }

    figcaption {
        position: fixed;
        padding: 1em 2em;
        width: 50vw;
        top:0;
        left: 50%;
        transform: translate(-50%, 0);
        color: #fff;
        text-align: center;        
    }

    figcaption .text {
        height: 3em;
        overflow: hidden;
        background: rgba(0,0,0,0.5);
        border-radius: 4px;
        margin-bottom: 20px;
        font-size: 0.9em;
        transition: all 1s ease;
    }

    figcaption .activeInfo {
        display: inline-block;
        background: rgba(0,0,0,0.5);
        border-radius: 4px;
        margin-bottom: 20px;
        font-size: 0.9em;
        transition: all 1s ease;
    }

    figcaption p {
        padding: 0em 5em;
        text-align: left;
    }

    figcaption a {
        padding: 2em 5em;
        text-align: right;
    }

    .thumbnails {
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, calc((50vw - 10px) / 3));
        grid-column-gap: 5px;
        grid-row-gap: 5px;
        justify-items: center;
        height: calc(20vh)
    }

    figure {
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        max-height: 10vw;
        margin: 0;
        background-color:white;
    }

    figure img {
        max-width:120%;
        top:25%;
        transform: translate(0,-25%)
    }

    figure:hover {
        opacity: 0.8;
    }    

</style>