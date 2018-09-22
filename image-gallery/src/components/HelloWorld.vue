<template>
  <!-- <div class="hello">
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener">typescript</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div> -->
  <div class="wrapper center">
    <div class="box" v-for="(img,index) in images" :key="index">
      <figure class="picture">
        <img :src="img.img_src">
      </figure>
    </div>
    <button v-on:click="loadMoreImages()">Load More</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import {ImgInfo,imgStructure} from './imageInfo';

export default Vue.extend({
  name: 'helloWorld',
  data() {
    return {
      token:<string>"1611740911.1677ed0.74fc99a20d53446c9599d6da14dc24cb",
      images:<Array<imgStructure>>[],
      pagination:{
        next_max_id:<string>"",
        next_url:<string>""
      }
    }
  },
  methods: {
    /**
     * Gets the images by calling the instagram API: https://www.instagram.com/developer/endpoints/ 
     * saves the result in this.images
     */    
    getImages() {
      let returnedImages = new ImgInfo();
      axios.get(`https://api.instagram.com/v1/users/self/media/recent`,{
        params:{
          access_token: this.token,
        }
      }).then((response) => {
        this.images = returnedImages.filterInformation(response.data);
        this.pagination.next_max_id = response.data.pagination.next_max_id;
        this.pagination.next_url = response.data.pagination.next_url;
        console.log(this.pagination)
      }).catch ((error) => {
        console.log(error)
      })
    },

    /**
     * Uses pagination property of instagram API to fetch the next page
     * appends result in this.images
     */ 
    loadMoreImages(){
      let returnedImages = new ImgInfo();
      axios.get(`${this.pagination.next_url}`).then((response) => {
        let received_images = returnedImages.filterInformation(response.data);
        this.pagination.next_max_id = response.data.pagination.next_max_id;
        this.pagination.next_url = response.data.pagination.next_url;

        this.images = this.images.concat(received_images)
      }).catch ((error) => {
        console.log(error)
      })      
    }
  },
  created(){
    this.getImages()
  }
})
</script>

<style scoped>
img {
  max-width: 120%;
  top: 25%;
  left: 10%;
  transform: translate(-10%, -25%);  
}

.wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 25vw 25vw 25vw;
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

.box {
    color: #fff;
    border-radius: 10px;
    width: 25vw;
}

.picture {
    position: relative;
    margin: 0;
    opacity: 1;
    border-radius: 10px;
    width: auto;
    height: 15vw;
    overflow: hidden;
    /* background: black; */
}
</style>
