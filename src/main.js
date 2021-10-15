import { createApp } from 'vue'
import router from "./router";
import store from './store'
import vuetify from './plugins/vuetify'
import App from './App.vue' 

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(store)

app.mount('#app')
