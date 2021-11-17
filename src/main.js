import Vue from 'vue'
import Notifications from 'vue-notification'
import VcaUi from 'vca-ui'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router.js'
import store from './store'
import VueI18n from 'vue-i18n'
import VueQuillEditor from 'vue-quill-editor'
import EmailEditor from 'vue-email-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'vca-ui/dist/vca-ui.css'


import de from '@/lang/de_DE.json';

Vue.use(Notifications)
Vue.use(VcaUi)
Vue.use(VueI18n)
Vue.use(Vuelidate)
Vue.use(VueQuillEditor)
Vue.use(EmailEditor)
Vue.config.productionTip = false


//const locale =  navigator.language;
const i18n = new VueI18n({
    locale: navigator.language,
    fallbackLocale: "de",
    messages: {
        'de-DE': de,
        'de': de
    }
});

Vue.mixin({
  methods: {
    notification: function (msg) {
        if (msg !== undefined) {
            this.$notify({
                title: this.$t(msg.title),
                text: this.$t(msg.body),
                type: msg.type,
                duration: 6000
            });
        }
    },
    fromBinary: function(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    },
    toBinary: function(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    }
  },
})


new Vue({
    i18n,
    router,
    store: store,
    render: h => h(App),
}).$mount('#app')
