import api from './api.js'
import pagination from './pagination.js'

const campaign = {
    modules: {
        pg: pagination
    },
    namespaced: true, 
    state: () => ({
        list: null,
        create: {
            crm_id: 0,
            name: "",
            title: "",
            description:"",
            type:"",
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
        crm_id (state, value) {
            state.create.crm_id = Number.parseInt(value)
        },
        current (state, value) {
            state.current = value
        },
        list (state, value) {
            state.list = value
        },
        start_time (state, value) {
            state.create.start_time = value
        },
        end_time (state, value) {
            state.create.end_time = value
        },
        header_image (state, value) {
            state.create.header_image = value
        },
        content_image (state, value) {
            state.create.content_image = value
        },
        updatetype (state, value) {
            state.current.type = value
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
                    .then((response) => {commit('current', response.data.payload), resolve()})
                    .catch(error => {
                        reject(error)
                    })
            }) 
        },
        updateReq({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.put('/v1/moves/campaign', state.current)
                    .then((response) => {commit('current', response.data.payload), resolve()})
                    .catch(error => {
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
