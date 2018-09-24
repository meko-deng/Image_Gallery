<template>
    <footer>
        <div class="footerSection">
            <a v-on:click="topFunction()">BACK TO TOP</a>
        </div>
        <div class='credits'> 
            <div class="message"><i class="fa fa-code"></i> with <i class="fa fa-heart"></i> by Meko D.</div>
        </div>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({   
    computed: {
		back_to_top():boolean{
			return this.$store.state.main.back_to_top
		},            
    },
    methods: {
        /**
         * Retrun to top of page
         */
        topFunction():void {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera            
        }
    }
})
</script>

<style lang="css" scoped>
.footerSection {
    text-align: center;
    margin-bottom: 30px;
}
a {
    font-family: Montserrat, sans-serif;
    color: #bbbbbb; 
    font-size: 90%;
    font-weight: 400;
}
a:hover {
    color: #707070; 
}
.credits {
    font-family: Montserrat, sans-serif;
    text-align: right;
    font-size: 50%;
    color: #bbbbbb; 
    margin-bottom: 5px;
}
.message {
   font-size: 170%; 
   color: #5b5b5b; 
   text-align: center;
}
.fa-heart {
    color:#da4d6c
}
</style>