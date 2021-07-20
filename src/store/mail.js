import api from './api.js'
import pagination from './pagination.js'
import job from './job.js'

const mail = {
    namespaced: true,
    modules: {
        job: job,
        pg: pagination
    },
    state: () => ({
        list: null,
        current: null,
        create: {
            email: null,
            password: null,
            host: null,
            port: 25,
            scope: []
        }
    }),
    mutations: {
        list(state, value) {
            state.list = value
        },
        current(state, value) {
            state.current = value
        },
        create(state, value) {
            state.create = value
        }
    },
    getters: {
        list(state) {
            return state.list
        },
        current(state) {
            return state.current
        },
        create(state) {
            return state.create
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
               api.call.post('/admin/email/email', state.create)
                    .then((response) => {commit('current', response.data.payload), resolve()})
                    .catch(error => {
                        reject(error)
                    })
            }) 
        },
        list({commit}) {
            return new Promise((resolve, reject) => {
                api.call.get('/admin/email/email')
                    .then((response) => {commit('list', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
}
export default mail

