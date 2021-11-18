import api from './api.js'
import pagination from './pagination.js'
import msg from './messages.js'

const job = {
    namespaced: true,
    modules: {
        pg: pagination,
        msg: msg
    },
    state: () => ({
        list: null,
        current: null,
        create: {
            name: null,
            case: null,
            scope: null,
            template: [                
                {
                    case: null,
                    country: null,
                    html: null,
                    subject: null
                }
            ],
            email_id: null
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
               api.call.post('/v1/email/jobs', state.create)
                    .then(() => {
                        commit('currentMsg', state.msg.job.success.created, {root: true}),
                        resolve()
                    })
                    .catch(error => {
                        commit('currentMsg', state.msg.job.error.created, {root: true}),
                        reject(error)
                    })
            }) 
        },
        updateReq({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.put('/v1/email/jobs', state.current)
                    .then(() => {
                        commit('current', null), 
                        commit('currentMsg', state.msg.job.success.updated, {root: true}),
                        resolve()
                    })
                    .catch(error => {
                        commit('currentMsg', state.msg.job.error.updated, {root: true}),
                        reject(error)
                    })
            }) 
        },
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

