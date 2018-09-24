# My <Instagram> Gallery
A Submission to Broadsign's Frontend Coding Challenge

## Project Structure
* src
    * assets
        * app.css - Contains document styling
    * components - Contains all .vue components
        * Footer.vue - footer component of document
        * Header.vue - header component of document
        * Home.vue - main component of document (main page)
        * imageInfo.ts - class for fetched images, and various image structures
        * ImageModal.vue - modal component of document (used for displaying images)
    * services
        * api
            * Instagram.ts - Centralized API calls
    * store - Vuex store
        * modal_store.ts - Vuex store for information for modal

## Tools used
* VueJS as framework - Single File Components (.vue extension)
* AXIOS library for AJAX calls - Recommended by VueJs (https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)
* Typescript/HTML/CSS
* fontawesome (https://fontawesome.com/icons?d=gallery) for icons
* Instagram API endpoints (https://www.instagram.com/developer/endpoints/users/)
* Netlify (https://www.netlify.com/) for deployment 

Note: Project was initiated using Vue CLI 3 (https://cli.vuejs.org/guide/)

