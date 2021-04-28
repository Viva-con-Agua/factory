import api from './api.js'

const job = {
    namespaced: true,
    state: () => ({
        list: null,
        current: null
    }),
    mutations: {
        list(state, value) {
            state.list = value
        },
        current(state, value) {
            state.current = value
        }
    },
    getters: {
        list(state) {
            return state.list
        },
        current(state) {
            return state.current
        }
    },
    actions: {
        list({commit}) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/email/jobs')
                    .then((response) => {commit('list', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        } 
    }



}
export default job

