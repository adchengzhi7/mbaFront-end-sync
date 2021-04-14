import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {VueCsvImportPlugin} from "vue-csv-import";
import "./assets/css/index.css";
import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import './assets/css/tailwind.css'

require("@/store/subscribers")
store.dispatch('auth/attempt',localStorage.getItem('token'))    

axios.defaults.baseURL='http://3.133.161.248:3000'
const myapp =createApp(App);
myapp.use(router)
myapp.use(Vuex)
myapp.use(VueAxios, axios)
myapp.use(store)
myapp.provide('$axios', axios); 
myapp.use(VueCsvImportPlugin)
myapp.use(VueSweetalert2)
myapp.mount('#app')
