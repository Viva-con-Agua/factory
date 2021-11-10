import api from './api.js'
import pagination from './pagination.js'

const paymentwidget = {
    modules: {
        pg: pagination
    },
    namespaced: true,
    state: () => ({
        list: null,
        create: {
            crm_id: 0,
            name:"",
            description:"",
            min_amount: 100,
            payment_types: [
                { name: 'civisepa', title: 'payment.type.sepa', default: true, },
                { name: 'sepa', title: 'payment.type.sepa' },
                { name: 'creditcard', title: 'payment.type.creditcard' },
                { name: 'paypal', title: 'payment.type.paypal' }
            ],
            subscription_types: [
                { name: 'civisepa', title: 'payment.type.sepa', default: true, },
                { name: 'sepa', title: 'payment.type.sepa' },
                { name: 'creditcard', title: 'payment.type.creditcard' },
                { name: 'paypal', title: 'payment.type.paypal' }
            ]
        },
        current: null,
        payment_types: [
            { name: 'civisepa', title: 'payment.type.civisepa.title', default: true, subtitle: 'payment.type.civisepa.subtitle', label: 'payment.type.civisepa.label', value: 'civisepa' },
            { name: 'sepa', title: 'payment.type.sepa.title', default: true, subtitle: 'payment.type.sepa.subtitle', label: 'payment.type.sepa.label', value: 'sepa' },
            { name: 'creditcard', title: 'payment.type.creditcard.title', default: true, subtitle: 'payment.type.creditcard.subtitle', label: 'payment.type.creditcard.label', value: 'creditcard' },
            { name: 'paypal', title: 'payment.type.paypal.title', default: true, subtitle: 'payment.type.paypal.subtitle', label: 'payment.type.paypal.label', value: 'paypal' }
        ],
        subscription_types: [
            { name: 'civisepa', title: 'payment.type.civisepa.title', default: true, subtitle: 'payment.type.civisepa.subtitle', label: 'payment.type.civisepa.label', value: 'civisepa' },
            { name: 'sepa', title: 'payment.type.sepa.title', default: true, subtitle: 'payment.type.sepa.subtitle', label: 'payment.type.sepa.label', value: 'sepa' },
            { name: 'creditcard', title: 'payment.type.creditcard.title', default: true, subtitle: 'payment.type.creditcard.subtitle', label: 'payment.type.creditcard.label', value: 'creditcard' },
            { name: 'paypal', title: 'payment.type.paypal.title', default: true, subtitle: 'payment.type.paypal.subtitle', label: 'payment.type.paypal.label', value: 'paypal' }
        ]
    }),

    mutations: {
        create (state, value) {
            state.create = value
        },
        current (state, value) {
            state.current = value
        },
        crm_id (state, value) {
            state.create.crm_id = Number.parseInt(value)
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
        create({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.post('/v1/donations/form', state.create)
                    .then((response) => {commit('current', response.data.payload), resolve()})
                    .catch(error => {
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
