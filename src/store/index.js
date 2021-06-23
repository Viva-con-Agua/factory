import Vue from 'vue'
import Vuex from 'vuex'
import app from './app.js'
import session from './session.js'
import mail from './mail.js'
import campaign from './campaign.js'
import navigation from './navigation.js'
import paymentwidget from './paymentwidget.js'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        //namespaced: true,
        app: app,
        session: session,
        mail: mail,
        campaign: campaign,
        navigation: navigation,
        paymentwidget: paymentwidget,
    },
    actions:{
        async payment_widget_page ({dispatch}) {
            await dispatch({type: 'paymentwidget/list'})
        },
        
    }
})
