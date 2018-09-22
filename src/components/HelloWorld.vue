<template>
  <div class="wrapper center">
    <figure class="box" v-for="(img,index) in images" :key="index">
      <div class="content">
        <img :src="img.img_src">
      </div>
      <figcaption class="additional">
        <a v-on:click="displayImgModal(img)">More Info</a>
        <p>{{img.img_caption}}</p>
      </figcaption>      
    </figure>
    <a v-on:click="loadMoreImages()">Load More</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import {imgStructure} from './imageInfo';
import InstagramApi from '../services/api/Instagram';

export default Vue.extend({
  name: 'helloWorld',
  data() {
    return {
      images:<Array<imgStructure>>[],
    }
  },
  methods: {
    getImages() {
      InstagramApi.getInstagramImages().then((images:imgStructure[])=> {
        this.images = images
      })
    },

    /**
     * Uses pagination property of instagram API to fetch the next page
     * appends result in this.images
     */ 
    loadMoreImages(){
      InstagramApi.loadMoreInstagramImages(this.images).then((images:imgStructure[])=> {
        this.images = images
      })          
    },

    displayImgModal(image:imgStructure){
      this.$store.commit('show_lightbox')
      this.$store.commit('set_lightbox_img', {
        img_src: image.img_src})
      this.$store.commit('push_img', {
        carousel: image.carousel_img
      })
      this.$store.commit('set_lightbox_img_info', {
        info: {
          img_text: image.img_text,
          img_likes: image.img_likes
        }
      })    
    }
  },
  created(){
    this.getImages()
  }
})
</script>

<style scoped>
.wrapper {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 25vw);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: center;
}

.center {
    margin: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
}

.content {
  background-color: white;
  opacity: 1;
  transition: opacity .5s;
}

figure {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    margin: 0;
    width: auto;
    height: 15vw;
    background-color:white;
    transition: background-color .5s;
}

figure img {
  max-width: 120%;
  top: 25%;
  left: 10%;
  transform: translate(-10%, -25%);   
  transition: all .5s; 
}

figure figcaption {
  position: absolute;
  padding: 1em 2em;
  top:calc(50% - 2em);
  color: #fff;
  text-align: center;
}

figure figcaption p {
  display: inline-block;
  background: rgba(0,0,0,0.5);
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 0.8em;
}

figure figcaption a{
  display: inline-block;
  text-transform: uppercase;
  text-decoration: none;
  padding: .5em;
  font-weight: bold;
  color: white;
  border-radius: 4px;
  border: 1px solid white;
}

.additional {
  opacity: 0;
  transform: scale(1.3);
  transition: all .5s;
}

figure:hover .content {
  opacity: 0.7;
  transition: opacity .5s;
}

figure:hover {
  background-color: black;
  transition: background-color .5s;
}

figure:hover .content img {
  max-width: 100%;
  top:0;
  left:0;
  transform: translate(0, -5%) scale(0.9); 
}

figure:hover .additional {
  opacity:1;
  transform: scale(1);
}


</style>
