import Vue from 'vue'
import Vuex from 'vuex'
import app from './app.js'
import token from './token.js'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        namespaced: true,
        app: app,
        token: token,
    },
    getters: {
        session (getters) {
            return getters.token.session
        }
    }
})
