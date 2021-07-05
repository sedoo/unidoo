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
};