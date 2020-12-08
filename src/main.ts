import { library } from '@fortawesome/fontawesome-svg-core';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue, { NavbarPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

library.add(faFile);

Vue.config.productionTip = false
Vue.use(NavbarPlugin);
Vue.use(BootstrapVue);
Vue.component('font-awesome-icon', FontAwesomeIcon);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
