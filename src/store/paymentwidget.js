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
        create({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.post('/v1/donations/form', state.create)
                    .then((response) => {commit('current', response.data.payload), resolve()})
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
