import { ReactiveLocalStorage } from '@unrest/vue-storage'

const LS_KEY = 'local'

const initial = {
  inventory: {},
  visited: {},
}

export default () => {
  const storage = ReactiveLocalStorage({ LS_KEY, initial })

  return storage
}
