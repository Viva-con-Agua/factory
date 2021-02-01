import Vue from 'vue'
import VcaUi from 'vca-ui'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router.js'
import store from './store'
import 'vca-ui/dist/vca-ui.css'

Vue.use(VcaUi)
Vue.use(Vuelidate)
Vue.config.productionTip = false
new Vue({
    router,
    store: store,
    render: h => h(App),
}).$mount('#app')
