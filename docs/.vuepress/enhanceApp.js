import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Unidoo from "../../src/plugin";
import axios from 'axios'
import VueAxios from 'vue-axios'




export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(VueAxios, axios)
  Vue.use(Vuetify);
  Vue.use(Unidoo)
  options.vuetify = new Vuetify({})
};const urlCdnStyle = [
  "https://fonts.googleapis.com/css?family=Material+Icons",
  "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css",
  "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
]
// adding CDN css font url
urlCdnStyle.forEach(CdnStyleUrl => {
 // const styleTag = document.createElement("link");
 // styleTag.href = CdnStyleUrl;
 // styleTag.rel = "stylesheet"
 // document.getElementsByTagName('head')[0].appendChild(styleTag);
})