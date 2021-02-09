import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import router from './router'

// createApp(App).use(VueAxios, axios).mount('#app')
createApp(App).use(router).mount('#app')
