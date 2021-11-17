import api from './api.js'
import pagination from './pagination.js'
import msg from './messages.js'

const app = {
    modules: {
        pg: pagination,
        msg: msg
    },
    namespaced: true,
    state: () => ({
        list: null,
        create: {
            app_name: '',
            redirect_url: '',
            logout_url: '',
            restriction: [],
        },
        current: null
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
               api.call.post('/v1/apps', state.create)
                    .then(() => {
                        commit('currentMsg', state.msg.app.success.created, {root: true}),
                        resolve()
                    })
                    .catch(error => {
                        commit('currentMsg', state.msg.app.error.created, {root: true}),
                        reject(error)
                    })
            }) 
        },
        updateReq({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.put('/v1/apps', state.current)
                    .then(() => {
                        commit('current', null), 
                        commit('currentMsg', state.msg.app.success.updated, {root: true}),
                        resolve()
                    })
                    .catch(error => {
                        commit('currentMsg', state.msg.app.error.updated, {root: true}),
                        reject(error)
                    })
            }) 
        },
        list({commit}) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/apps')
                    .then((response) => {commit('list', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        } 
    }
    
}
export default app
