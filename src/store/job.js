import api from './api.js'
import pagination from './pagination.js'

const job = {
    namespaced: true,
    modules: {
        pg: pagination
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
                    .then((response) => {commit('current', response.data.payload), resolve()})
                    .catch(error => {
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

