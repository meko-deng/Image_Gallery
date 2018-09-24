<template>
    <header>
        <h1>My <i class="fab fa-instagram"></i> Gallery</h1>
    </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({   
    data() {
        return{        
        }
    },
    computed: {
		back_to_top():boolean{
			return this.$store.state.main.back_to_top
		},            
    },
    methods: {
        topFunction() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera            
        }
    },    
    created() {
    }
})
</script>

<style lang="css" scoped>
header {
    position: relative;
    top: 0;
}
h1 {
    font-family: Montserrat, sans-serif;
    color: #646464; 
    font-size: 3em;
    font-weight: 500;
}

.fab{
    font-weight: 700;
    animation: changeColor 5s infinite;
}

@media (max-width: 575px) {
    h1 {
        font-size: 2em;
    }
}

@keyframes changeColor {
    0% {
        color: #ffca3a
    }
    20% {
        color: #fa7d23
    }
    40% {
        color:#d52d75
    }
    60% {
        color: #9533be
    }
    80% {
        color: #d52d75
    }
    100% {
        color: #ffca3a
    }

}


</style>