import { createApp } from 'vue'
import sm_components from '@sm/components'
import unrest from '@unrest/vue'

import router from '@/router'
import store from '@/store'
import App from './App.vue'

import '@sm/icons/build/super-metroid.css'
import '@sm/icons/build/inventory.css'
import '@unrest/tailwind/dist.css'
import '@/css/index.css'

createApp(App)
  .use(sm_components)
  .use(unrest.plugin)
  .use(unrest.ui)
  .use(router)
  .use(store)
  .mount('#app')

document.body.classList.add('theme-dark_mode')
