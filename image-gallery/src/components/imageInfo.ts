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

            if(info.type == "image") {
                let id = info.id;
                let src = info.images.standard_resolution.url;
                let likes = info.likes.count;
                let text = info.caption.text;
                let tags = info.tags;
                let caption = this.extractCaption(text,50)

                this.images.push({
                    img_src:src,
                    img_likes:likes,
                    img_caption:caption,
                    img_text:text,
                    img_tags:tags,
                    img_id:id,
                })
            }
        }
        return this.images
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
}

export interface imgStructure {
    img_src:string;
    img_likes:number;
    img_caption:string;
    img_text:string;
    img_tags:string[];
    img_id:string;
}