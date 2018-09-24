import axios from 'axios';
import {ImgInfo,imgStructure} from '../../components/imageInfo'

export default {
    token:<string>"1611740911.1677ed0.74fc99a20d53446c9599d6da14dc24cb",  //under normal circumstances, this token wouldn't be public.
    next_max_id:<string>"",

    /**
     * Gets the images by calling the instagram API: https://www.instagram.com/developer/endpoints/ 
     * returns a promise
     */   
    getInstagramImages():any {
        let returnedImages = new ImgInfo();
        return axios.get('/v1/users/self/media/recent',{
          params:{
            access_token: this.token,
          }
        }).then((response) => {
            let images = returnedImages.filterInformation(response.data);
            this.next_max_id = response.data.pagination.next_max_id;
        
          return images
        }).catch ((error) => {
          console.log(error)
        })
    },
    
    /**
     * Uses pagination property of instagram API to fetch the next page
     * returns a promise
     */ 
    loadMoreInstagramImages(images:imgStructure[]):any{
        let returnedImages = new ImgInfo();
        return axios.get('/v1/users/self/media/recent',{
            params:{
                access_token: this.token,
                max_id: this.next_max_id
            }
        }).then((response) => {
          let received_images = returnedImages.filterInformation(response.data);
          this.next_max_id = response.data.pagination.next_max_id;  
          let return_images = images.concat(received_images);

          return return_images
        }).catch ((error) => {
          console.log(error)
        })      
      },    
}