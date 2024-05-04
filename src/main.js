import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import PrimeVue from 'primevue/config';
import VueAwesomePaginate from "vue-awesome-paginate";
import Button from "primevue/button";
import ButtonGroup from "primevue/buttongroup";
import Chips from 'primevue/chips';

import "vue-awesome-paginate/dist/style.css";

// Import PrimeVue CSS theme
import 'primevue/resources/themes/aura-light-green/theme.css';

import 'primeicons/primeicons.css'


// Create the Vue app instance and mount it to the DOM
createApp(App)
  .use(router)
  .use(store)
  .use(VueAwesomePaginate)
  .use(PrimeVue)
  .component('Button', Button) // Register the Button component globally
  .component('ButtonGroup', ButtonGroup) // Register the Button component globally
  .component('Chips', Chips) // Register the Button component globally
  .mount("#app");
