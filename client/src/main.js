import { createApp } from 'vue'
import sm_components from '@sm/components'

import '@sm/icons/build/super-metroid.css'
import '@sm/icons/build/inventory.css'
import '@unrest/tailwind/dist.css'

import router from '@/router'
import App from './App.vue'

createApp(App).use(sm_components).use(router).mount('#app')
