import Vue from 'vue'
import Vuex from 'vuex'
import app from './app.js'
import session from './session.js'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        namespaced: true,
        app: app,
        session: session,
    },
})
