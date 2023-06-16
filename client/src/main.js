import { createApp } from 'vue'
import sm_components from '@sm/components'

import router from '@/router'
import App from './App.vue'

import '@sm/icons/build/super-metroid.css'
import '@sm/icons/build/inventory.css'
import '@unrest/tailwind/dist.css'
import '@/css/index.css'

createApp(App).use(sm_components).use(router).mount('#app')
