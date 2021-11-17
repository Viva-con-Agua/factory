import api from './api.js'
import pagination from './pagination.js'
import msg from './messages.js'

const campaign = {
    modules: {
        pg: pagination,
        msg: msg
    },
    namespaced: true, 
    state: () => ({
        list: null,
        create: {
            crm_id: null,
            name: "",
            title: "",
            description:"",
            type: "",
            start_time: 0,
            end_time: 0,
            private: false,
            contentImage: null,
            headerImage: null,
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
               api.call.post('/v1/moves/campaign', state.create)
                    .then(() => {
                        commit('currentMsg', state.msg.event.success.created, {root: true})
                        resolve()})
                    .catch(error => {
                        commit('currentMsg', state.msg.event.success.error, {root: true})
                        reject(error)
                    })
            }) 
        },
        updateReq({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.put('/v1/moves/campaign', state.current)
                    .then(() => {
                        commit('current', null), 
                        commit('currentMsg', state.msg.event.success.updated, {root: true})
                        resolve()
                    })
                    .catch(error => {
                        commit('currentMsg', state.msg.event.error.updated, {root: true})                       
                        reject(error)
                    })
            }) 
        },
        list({commit}) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/moves/campaign')
                    .then((response) => {commit('list', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        } 
    }



}
export default campaign
