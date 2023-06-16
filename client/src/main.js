import { createApp } from 'vue'

import router from '@/router'
import App from './App.vue'
import '@unrest/tailwind/dist.css'

createApp(App).use(router).mount('#app')
