<template>
  <div class="wrapper center">
    <figure class="box" v-for="(img,index) in images" :key="index">
      <div class="content">
        <img :src="img.img_src">
      </div>
      <i v-if="img.carousel_img.length !=0" class="fas fa-clone"></i>
      <figcaption class="additional">
        <a v-on:click="displayImgModal(img)">More Info</a>
        <p>{{img.img_caption}}</p>
      </figcaption>      
    </figure>
    <a v-on:click="loadMoreImages()"><i :class="(isLoading)?'fas fa-spinner fa-spin' : 'fas fa-plus'"></i></a>
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
      isLoading:<boolean>false,
    }
  },
  methods: {
    getImages() {
      this.isLoading = true;
      InstagramApi.getInstagramImages().then((images:imgStructure[])=> {
        this.images = images;
        this.isLoading = false;
      })
    },

    /**
     * Uses pagination property of instagram API to fetch the next page
     * appends result in this.images
     */ 
    loadMoreImages(){
      this.isLoading = true;
      InstagramApi.loadMoreInstagramImages(this.images).then((images:imgStructure[])=> {
        this.images = images;
        this.isLoading = false;
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
  mounted(){
    this.getImages()
  }
})
</script>

<style scoped>
.fa-spinner, .fa-plus{
  position: relative;
  top: 32%;
  font-size: 80px;
  opacity: 0.6;
  transition: opacity .5s ease;
}

.fa-plus:hover{
  opacity: 0.9
}
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

figure i {
  position: absolute;
  top: 0.2em;
  right: 0.2em;
  font-size: 50px;
  color:rgba(158, 17, 17, 0.8)
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

@media (max-width: 1350px) {
  .wrapper {
      grid-template-columns: repeat(2, 35vw);
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      justify-items: center;
  } 

  figure {
    height: 20vw;
  }
}
@media (max-width: 800px) {
  .wrapper {
      grid-template-columns: 60vw;
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      justify-items: center;
  } 

  figure {
    height: 40vw;
  }
}

@media (max-width: 880px){
  figure figcaption p {
    font-size: 0.7em;
  }
}

@media (max-width: 500px) {
  figure figcaption p {
    font-size: 0.5em;
  }

  figure figcaption a {
    font-size: 0.9em;
  }
}

@media (max-width: 350px) {
  .wrapper {
      grid-template-columns: 80vw;
      grid-row-gap: 5px;
      justify-items: center;
  } 

  figure figcaption p {
    font-size: 0.5em;
  }

  figure figcaption a {
    font-size: 0.6em;
  }  
}


</style>
