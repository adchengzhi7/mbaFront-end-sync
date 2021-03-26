import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {VueCsvImportPlugin} from "vue-csv-import";
import "./assets/css/index.css";
import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import './assets/css/tailwind.css'
 
const myapp =createApp(App);
myapp.use(router)
myapp.use(VueCsvImportPlugin)
myapp.use(VueSweetalert2)
myapp.mount('#app')
