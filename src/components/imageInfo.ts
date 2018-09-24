export class ImgInfo {
    images: Array<imgStructure>;

    constructor() {
        this.images = [];
    }

    /**
     * Filters out unecessary information returned by the instagram API
     * @param {any} informations response.data received from GET call to instagram API
     * @return {Array<imgStructure>} Remaining, desired content
     */
    filterInformation(informations:any):Array<imgStructure> {
        for (let key in informations.data){
            let info = informations.data[key];

            if(info.type != "video") {
                let id:string = info.id;
                let src:string = info.images.standard_resolution.url;
                let likes:number = info.likes.count;
                let tags:Array<string> = info.tags;
                let caption:string = this.extractCaption(info.caption.text,100)
                let text:string = this.cleanUpText(info.caption.text)       
                let carousel:Array<imgModalStructure> = this.get_carousel_images(info)
                
                this.images.push({
                    img_src:src,
                    img_likes:likes,
                    img_caption:caption,
                    img_text:text,
                    img_tags:tags,
                    img_id:id,
                    carousel_img: carousel
                })
            }
        }
        return this.images
    }
    /**
     * Gets the carousel images 
     * @param {any} info all objects returned from the instagram API
     */
    get_carousel_images(info:any):Array<imgModalStructure> {
        let carousel_images:Array<imgModalStructure> = []
        if (info.type == "carousel"){
            info.carousel_media.forEach((image:any) => {
                if (image.type != "video")
                carousel_images.push({
                    img_src: image.images.standard_resolution.url
                })
            });
        }
        return carousel_images    
    }

    /**
     * Takes full text and crops to ${length} length for caption preview
     * @param {string} text full text
     * @param {number} length desired length of caption
     * @return {string} cropped text
     */
    extractCaption(text:string, length:number):string {
        let trimmed_text = text.substring(0, length);
        let continued = " ...";
        let return_text = trimmed_text.concat(continued);

        return return_text;
    }
    /**
     * Texts have too much tags (#) linked to it, cluttering with useless information
     * Cuts out all the hash tags clusterd at the bottom
     * @param text Given text with all the hashtags
     * @return {string} cleaned up text
     */
    cleanUpText(text:string):string {
        let cleaned_up_text = ""
        let initial_clean = text.substring(0, text.indexOf('.\n.'))
        if (initial_clean.length <= 200){
            cleaned_up_text = text.split('.\n.\n').join("\n");
        }else {
            cleaned_up_text = initial_clean
        }
        return cleaned_up_text
    }
}

export interface imgStructure {
    img_src:string;
    img_likes:number;
    img_caption:string;
    img_text:string;
    img_tags:string[];
    img_id:string;
    carousel_img:imgModalStructure[];
}

export interface imgModalStructure {
    img_src:string;
}

export interface imgInfoStructure {
    img_text:string;
    img_likes:number;
}