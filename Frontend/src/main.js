import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)


import Avatar from './components/Avatar'
import Button from './components/Button'
import FormGroup from './components/FormGroup'
import SpecialCard01 from './components/SpecialCard01'
import SpecialCard02 from './components/SpecialCard02'
import PostSingle from './components/PostSingle'
app.component('Avatar', Avatar)
app.component('Button', Button)
app.component('FormGroup', FormGroup)
app.component('SpecialCard01', SpecialCard01)
app.component('SpecialCard02', SpecialCard02)
app.component('PostSingle', PostSingle)


store.dispatch('checkSignin')
app.use(store).use(router).mount('#app')
