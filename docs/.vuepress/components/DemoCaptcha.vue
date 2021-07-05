<template>
    <v-app>
        <UnidooCaptcha size="6" v-model="valid"></UnidooCaptcha>
        <div class="my-2">
        Valid: {{valid}}
        </div>
    </v-app>
</template>

<script>
import UnidooCaptcha from "../../../src/components/UnidooCaptcha.vue";
export default {
     data() {
         return { 
             valid: false
          };
     },
    
    components: { UnidooCaptcha },

    methods: {
       
    },
};
</script>

<style scoped>
p {
    color: red;
}
</style>>
</style>