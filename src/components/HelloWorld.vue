<template>
  <div class="wrapper center">
    <div class="header">
      <Header/>
    </div>
    <figure v-on:click="displayImgModal(img)" class="box" v-for="(img,index) in images" :key="index">
      <div class="content">
        <img :src="img.img_src">
      </div>
      <i v-if="img.carousel_img.length !=0" class="fas fa-clone"></i>
      <figcaption class="additional">
        <a>More Info</a>
        <p>{{img.img_caption}}</p>
      </figcaption>      
    </figure>
    <a v-on:click="loadMoreImages()"><i :class="(isLoading)?'fas fa-spinner fa-spin' : 'fas fa-plus'"></i></a>
    <div v-if="!isLoading" class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import Footer from './Footer.vue';
import Header from './Header.vue';
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
  components: {
    Footer, Header
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
.fa-spinner, .fa-plus {
  position: absolute;
  right: 0;
  bottom: 6rem;
  left: 0;
  padding: 1rem;
  font-size: 80px;
  opacity: 0.5;
  transition: opacity .5s ease;
  text-align: center;
}

.fa-plus:hover{
  opacity: 0.8
}
.wrapper {
    position: relative;
    display: grid;
    padding-bottom: 15rem;
    padding-top: 15vh;
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

.header {
  position: absolute;
  right: 0;
  top: -2em;
  left: 0;
  padding: 1rem;
  text-align: center;
}

.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  text-align: center;
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
  color:rgba(100, 100, 100, 0.8)
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

.additional a {
  transition: all .5s;
}

.additional a:hover{
  transform: scale(1.1)
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
      grid-template-columns: repeat(2, 40vw);
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
  .fa-plus {
    font-size: 50px;
  }
  figure i {
    font-size: 30px;
  }
  figure figcaption p {
    font-size: 0.5em;
  }

  figure figcaption a {
    font-size: 0.9em;
  }
}

@media (max-width: 400px) {
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
