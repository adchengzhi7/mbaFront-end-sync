import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file


createApp(App).use(router).mount('#app')
