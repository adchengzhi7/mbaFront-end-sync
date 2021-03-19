import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
 
const myapp =createApp(App);
myapp.use(router)
myapp.mount('#app')
