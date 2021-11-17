import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import user from './user'
import mail from './mail'
import campaign from './campaign'
import navigation from './navigation'
import paymentwidget from './paymentwidget'
import company from './company'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        //namespaced: true,
        app: app,
        user: user,
        company: company,
        mail: mail,
        campaign: campaign,
        navigation: navigation,
        paymentwidget: paymentwidget,
    },
    state: {
        loading: false,
        currentMsg: null
    },
    mutations: {
        currentMsg (state, value) {
            state.currentMsg = value
        },
        loadingFlow(state) {
            state.loading = !state.loading
        }
    },
    getters: {
        session(state) {
            if ( state.user.current !== null ) {
                return true
            } 
            return false
        },
        currentMsg (state) {
            return state.currentMsg
        },
        loadingFlow (state) {
            return state.loading
        }
    },
    actions: {
        async mailView({dispatch}) {
            await dispatch('mail/job/list')
        },
        async payment_widget_page ({dispatch}) {
            await dispatch({type: 'paymentwidget/list'})
        },
        async companyView ({dispatch}) {
            await dispatch({type: 'company/list'})
        },
        logout({commit}) {
            //dispatch('user/signout')
            commit('user/session/logout')  
        }
    }
})
