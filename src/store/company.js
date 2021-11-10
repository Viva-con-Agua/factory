import api from './api.js'
import pagination from './pagination.js'

const company = {
    namespaced: true,
    modules: {
        pg: pagination
    },
    state: () => ({
        current: null,
        create: {
            name: "",
            country: "",
            stripe_public_key: "",
            stripe_private_key:"",
            paypal_client_id:"",
            paypal_secret: ""
        },
    }),
    getters: {
        current(state) {
            return state.current
        }
    },
    mutations: {
        current(state, value) {
            state.current = value
        }
    },
    actions: {
        async add ({dispatch}) {
            await dispatch({type: 'create'})
            await dispatch({type: 'list'})
        },
        async update( {dispatch}) {
            await dispatch({type: 'updateReq'})
            await dispatch({type: 'list'})
        },
        create({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.post('/v1/donations/company', state.create)
                    .then((response) => {commit('current', response.data.payload), resolve()})
                    .catch(error => {
                        reject(error)
                    })
            }) 
        },
        updateReq({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.put('/v1/donations/company', state.current)
                    .then((response) => {commit('current', response.data.payload), resolve()})
                    .catch(error => {
                        reject(error)
                    })
            }) 
        },
        list({commit}) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/donations/company')
                    .then((response) => {commit('list', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }

}

export default company
