import api from './api.js'
import pagination from './pagination.js'
import msg from './messages.js'

const paymentwidget = {
    modules: {
        pg: pagination,
        msg: msg
    },
    namespaced: true,
    state: () => ({
        list: null,
        create: {
            crm_id: null,
            name:"",
            description:"",
            min_amount: 500,
            default_amount: 2500,
            company_id: "",
            slider: {
                name: "faucet",
                min: 500,
                max: 25000,
                steps: 500,
            },
            payment_types: [
                { name: 'civisepa', title: 'paymentwidget.paymenttype.sepa', default: true, },
                { name: 'sepa', title: 'paymentwidget.paymenttype.sepa' },
                { name: 'creditcard', title: 'paymentwidget.paymenttype.creditcard' },
                { name: 'paypal', title: 'paymentwidget.paymenttype.paypal' }
            ],
            subscription_types: [
                { name: 'civisepa', title: 'paymentwidget.paymenttype.sepa', default: true, },
                { name: 'sepa', title: 'paymentwidget.paymenttype.sepa' },
                { name: 'creditcard', title: 'paymentwidget.paymenttype.creditcard' },
                { name: 'paypal', title: 'paymentwidget.paymenttype.paypal' }
            ]
        },
        current: null,
        payment_types: [
            { name: 'civisepa', title: 'paymentwidget.paymenttype.civisepa.title', default: true, subtitle: 'paymentwidget.paymenttype.civisepa.subtitle', label: 'paymentwidget.paymenttype.civisepa.label', value: 'civisepa' },
            { name: 'sepa', title: 'paymentwidget.paymenttype.sepa.title', default: true, subtitle: 'paymentwidget.paymenttype.sepa.subtitle', label: 'paymentwidget.paymenttype.sepa.label', value: 'sepa' },
            { name: 'creditcard', title: 'paymentwidget.paymenttype.creditcard.title', default: true, subtitle: 'paymentwidget.paymenttype.creditcard.subtitle', label: 'paymentwidget.paymenttype.creditcard.label', value: 'creditcard' },
            { name: 'paypal', title: 'paymentwidget.paymenttype.paypal.title', default: true, subtitle: 'paymentwidget.paymenttype.paypal.subtitle', label: 'paymentwidget.paymenttype.paypal.label', value: 'paypal' }
        ],
        subscription_types: [
            { name: 'civisepa', title: 'paymentwidget.paymenttype.civisepa.title', default: true, subtitle: 'paymentwidget.paymenttype.civisepa.subtitle', label: 'paymentwidget.paymenttype.civisepa.label', value: 'civisepa' },
            { name: 'sepa', title: 'paymentwidget.paymenttype.sepa.title', default: true, subtitle: 'paymentwidget.paymenttype.sepa.subtitle', label: 'paymentwidget.paymenttype.sepa.label', value: 'sepa' },
            { name: 'creditcard', title: 'paymentwidget.paymenttype.creditcard.title', default: true, subtitle: 'paymentwidget.paymenttype.creditcard.subtitle', label: 'paymentwidget.paymenttype.creditcard.label', value: 'creditcard' },
            { name: 'paypal', title: 'paymentwidget.paymenttype.paypal.title', default: true, subtitle: 'paymentwidget.paymenttype.paypal.subtitle', label: 'paymentwidget.paymenttype.paypal.label', value: 'paypal' }
        ],
        slider_types: [
            { name: 'faucet', title: 'paymentwidget.slider.faucet.title', default: true, subtitle: 'paymentwidget.slider.faucet.subtitle', label: 'paymentwidget.slider.faucet.label', value: 'faucet' },
            { name: 'cups', title: 'paymentwidget.slider.cups.title', default: true, subtitle: 'paymentwidget.slider.cups.subtitle', label: 'paymentwidget.slider.cups.label', value: 'cups' },
            { name: 'wwd', title: 'paymentwidget.slider.wwd.title', default: true, subtitle: 'paymentwidget.slider.wwd.subtitle', label: 'paymentwidget.slider.wwd.label', value: 'wwd' },
            { name: 'mhd', title: 'paymentwidget.slider.mhd.title', default: true, subtitle: 'paymentwidget.slider.mhd.subtitle', label: 'paymentwidget.slider.mhd.label', value: 'mhd' },
            { name: 'easter', title: 'paymentwidget.slider.easter.title', default: true, subtitle: 'paymentwidget.slider.easter.subtitle', label: 'paymentwidget.slider.easter.label', value: 'easter' },
            { name: 'run4water', title: 'paymentwidget.slider.run4water.title', default: true, subtitle: 'paymentwidget.slider.run4water.subtitle', label: 'paymentwidget.slider.run4water.label', value: 'run4water' },
            { name: 'valentine', title: 'paymentwidget.slider.valentine.title', default: true, subtitle: 'paymentwidget.slider.valentine.subtitle', label: 'paymentwidget.slider.valentine.label', value: 'valentine' },
            { name: 'faucetbells', title: 'paymentwidget.slider.faucetbells.title', default: true, subtitle: 'paymentwidget.slider.faucetbells.subtitle', label: 'paymentwidget.slider.faucetbells.label', value: 'faucetbells' },
            { name: 'mulled', title: 'paymentwidget.slider.mulled.title', default: true, subtitle: 'paymentwidget.slider.mulled.subtitle', label: 'paymentwidget.slider.mulled.label', value: 'mulled' },
            { name: 'skull', title: 'paymentwidget.slider.skull.title', default: true, subtitle: 'paymentwidget.slider.skull.subtitle', label: 'paymentwidget.slider.skull.label', value: 'skull' }
        ]
    }),

    mutations: {
        create (state, value) {
            state.create = value
        },
        current (state, value) {
            state.current = value
        },
        list (state, value) {
            state.list = value
        }
    },
    getters:{
        list (state) {
            return state.list
        },
        current (state) {
            return state.current
        },
        payment_types (state) {
            return state.payment_types
        },
        subscription_types (state) {
            return state.subscription_types
        }
    },
    actions: {
        async add ({dispatch}) {
            await dispatch("create")
            await dispatch("list")
        },
        async update ({dispatch}) {
            await dispatch("updateReq")
            await dispatch("list")
        },
        create({state}) {
            return new Promise((resolve, reject) => {
               api.call.post('/v1/donations/form', state.create)
                    .then(() => {
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            }) 
        },
        updateReq({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.put('/v1/donations/form', state.current)
                    .then(() => {
                        commit('current', null), 
                        commit('currentMsg', state.msg.paymentwidget.success.updated, {root: true})
                        resolve()
                    })
                    .catch(error => {
                        commit('currentMsg', state.msg.paymentwidget.error.updated, {root: true})                       
                        reject(error)
                    })
            }) 
        },
        list({commit}) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/donations/form')
                    .then((response) => {commit('list', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        } 
    }
}

export default paymentwidget
