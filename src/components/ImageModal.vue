<template> 
 <div class="modal modal-mask">
    <a v-on:click="close_modal()"><i class="fas fa-times-circle"></i></a>    
    <div v-on:click="showPrevImg()" class="arrow-left"><i class="fas fa-angle-left"></i></div>
    <div v-on:click="showNextImg()" class="arrow-right"><i class="fas fa-angle-right"></i></div>      
    <div class="modal-body">       
        <div class="img-container">           
            <figcaption :style="caption_width">
                <div :class="[(activeInfo) ? 'activeInfo' : 'text']">
                    <a v-on:click="activateInfo()">{{expandMessage}}</a>
                    <i class="far fa-heart"></i>
                    <p>{{img_info.img_likes}}</p>
                    <td style="padding-top: 0.7px;"></td>
                    <p>{{img_info.img_text}}</p>
                </div>
            </figcaption>             
            <img class="currentImage_class" :src="currentImage"> 
        </div> 
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
</div>
</template>

<script lang="ts">
import Vue from "vue";
import {imgModalStructure,imgInfoStructure} from './imageInfo'
import { lightbox } from "../store/modal_store";
import { setTimeout } from 'timers';

export default Vue.extend({
  data() {
    return {
        activeImage:<number>0,
        activeInfo:<boolean>false,
        expandMessage:<string>"Show More",
        mainImageWidth:<number>0
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
    },
    caption_width(): any {
        return {
            width: `${this.mainImageWidth}px`
        }
    },
  },
  methods: {
    /**
     * Closes the modal, sets the lightbox img source to be ""
     */
    close_modal():void {
      this.$store.commit('remove_lightbox')
      this.$store.commit('set_lightbox_img', {
        img_src: ""})
    },
    /**
     * Sets main image as the image at index imageIndex
     * @param {number} imageIndex the target index of the image to be displayed
     */
    activateImage(imageIndex:number):void {
        this.activeImage = imageIndex
        setTimeout(() => {
            this.getMainImageWidth()
        }, 10)
    },
    /**
     * toggles the "Show Less" and "Show More" display, in turn toggling the appropriate class for display
     */
    activateInfo():void {
        if(!this.activeInfo){
            this.activeInfo = true
            this.expandMessage = "Show Less"
        } else {
            this.activeInfo = false
            this.expandMessage = "Show More"            
        }
    },
    /**
     * Get width of the main image to set figcaption tag group width, needs to be computed as the width of the image changes
     * The setTimeout function allows the image to be rendered before setting the corresponding width.
     */
    getMainImageWidth():void {
        let targetClass = document.getElementsByClassName('currentImage_class')
        setTimeout(() => {
            if (targetClass.length != 0) {
                let width = targetClass[0].clientWidth
                this.mainImageWidth = width
            }            
        }, 25)
    },
    /**
     * Uses Vuex store to toggle show_next_img
     */
    showNextImg():void {
        this.$store.commit('show_next_img', {
            state: true})
        this.getMainImageWidth()
    },
    /**
     * Uses Vuex store to toggle show_prev_img
     */    
    showPrevImg():void {
        this.$store.commit('show_prev_img', {
            state: true})
        this.getMainImageWidth()    
    }
  },
  mounted() {
        this.getMainImageWidth()
        window.addEventListener('resize',this.getMainImageWidth)    
  }
})
</script>

<style scoped>
    .fas {
        font-size: 40px;
        color:#fff;
        opacity: 0.8;
        transition: all .2s ease;
    }
    .fas:hover {
        opacity: 0.3
    }
    .modal .fas {
        position: absolute;
        right: 1vw;
        top: 1vh;
    }
    .arrow-left, .arrow-right {
        position: absolute;
        top: 50vh;
        padding: 1em 0;
    }   
    .arrow-left {
        left: 7vw;
    }
    .arrow-right {
        right: 3vw;
    }    
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        display: table;
        transition: opacity .5s ease;
    }
    .activeInfo a {
        position: absolute;
        top:0;
        right:0;
    }
    .modal-body {
        position: absolute;
        height: auto;
        width: 50vw;      
        top: 55%; 
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .img-container {
        position: relative;
        margin:auto;
        max-height: 60vh;
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
    .img-container img {
        border-radius: 4px;
        max-width: 50vw;
        max-height: 60vh;
    }

    figcaption {
        position: absolute;
        padding: 1em 2em;
        top:-4em;
        left: 50%;
        font-size: 0.9em;
        transform: translate(-50%, 0);
        color: #fff;
        text-align: center;        
    }

    figcaption .text {
        height: 3em;
        overflow: hidden;
        background: rgba(0,0,0,0.8);
        border-radius: 4px;
        margin-bottom: 20px;
        transition: all 1s ease;
    }

    figcaption .activeInfo {
        display: inline-block;
        background: rgba(0,0,0,0.5);
        border-radius: 4px;
        margin-bottom: 20px;
        transition: all 1s ease;
    }

    figcaption p {
        padding: 0em 5em;
        text-align: left;
        white-space:pre-wrap;
    }

    figcaption a {
        position: absolute;
        top:0;
        right:0;        
        padding: 2em 5em;
        text-align: right;
    }

    figcaption i {
        position: absolute;
        top:0.1em;
        left:0;        
        padding: 2em 5em;
        color:#ec7797;
        text-align: left;
    }

    .thumbnails {
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, calc((50vw - 10px) / 3));
        grid-column-gap: 5px;
        grid-row-gap: 5px;
        justify-items: center;
        height: 20vh;
        padding-top: 50px;
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
    
    @media(max-width:990px) {
        .modal-body {
            transform: translate(-50%,0);
            top: 20vh;
            width: 70vw;
        }
        .img-container {
            height: 70vw;
        }

        .img-container img {
            border-radius: 4px;
            max-width: 70vw;
            max-height: 75vw;
        }

        .thumbnails {
            grid-template-columns: repeat(5, calc((70vw - 25px) / 5)); 
            height: 20vh;  
            padding-top: 60px;        
        }

        figcaption {
            top: -4em;
            font-size: 0.8em;
            overflow: auto;
        }

        figcaption i {
            top:0.2em;
            left:0em;                   
        }        

        figcaption p {
            padding: 0em 1em;
        }
    }

    @media (max-width: 700px) {
        figcaption {
            font-size: 0.6em
        }        
    }

    @media (max-width: 500px) {
        .modal-body {
            top:25vh;
        }
        .fas {
            font-size: 30px;
        }
    }

</style>