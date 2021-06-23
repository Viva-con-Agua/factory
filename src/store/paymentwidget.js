import api from './api.js'

const paymentwidget = {
    namespaced: true,
    state: () => ({
        list: null,
        create: {
            crm_id: 0,
            name:"",
            description:"",
        },
        current: null
    }),

    mutations: {
        create (state, value) {
            state.create = value
        },
        crm_id (state, value) {
            state.create.crm_id = Number.parseInt(value)
        },
        list (state, value) {
            state.list = value
        },
    },
    getters:{
        list (state) {
            return state.list
        },
    },
    actions: {
        create({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.post('/v1/donations/campaign', state.create)
                    .then((response) => {commit('current', response.data.payload), resolve()})
                    .catch(error => {
                        reject(error)
                    })
            }) 
        },
        list({commit}) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/donations/campaign')
                    .then((response) => {commit('list', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        } 
    }
}

export default paymentwidget
