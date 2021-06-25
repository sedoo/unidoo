import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./plugins/unidoo";
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false;

new Vue({
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
const urlCdnStyle = [
    "https://fonts.googleapis.com/css?family=Material+Icons",
    "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css",
    "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
  ]
  // adding CDN css font url
  urlCdnStyle.forEach(CdnStyleUrl => {
    const styleTag = document.createElement("link");
    styleTag.href = CdnStyleUrl;
    styleTag.rel = "stylesheet"
    document.getElementsByTagName('head')[0].appendChild(styleTag);
  })