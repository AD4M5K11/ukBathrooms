import { createStore, createLogger } from 'vuex'
import headlines from './modules/headlines'
import sources from './modules/sources'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    headlines,
    sources
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})