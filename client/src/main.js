import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import VueAxios from 'vue-axios'
import store from './store/index'
import VueSession from  "vue-session"
import VueScrollReveal from 'vue-scroll-reveal';

createApp(App).use(router, VueAxios, axios, store, VueSession, VueScrollReveal).mount('#app')

