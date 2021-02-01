import api from './api.js'
//import createPersistedState from "vuex-persistedstate";
const token = {
    namespaced: true,
    state: () => ({
        test: "Das ist ein Test",
        error: ""
    }),
    mutations: {
        test (state, value) {
            state.test = value
        },
        error (state, value) {
            state.error = value
        },
        logout () {
            localStorage.clear()
        }
    },
    getters: {
        test(state) {
            return state.test
        },
        session() {
            if (localStorage.getItem("access") === null ) {
                return false
            } else {
                return true
            }
        }

    },
    actions:{

        setItem (key, value) {
            return Promise.resolve().then(function () {
                localStorage.setItem(key, value);
            });
        },
        getItem (key) {
            return Promise.resolve().then(function () {
                return localStorage.getItem(key);
            });
        },

        get({commit}, code) {
            return new Promise((resolve, reject) => {
                api.base.get('/token/code?code=' + code.code)
                    .then(response => {

                        localStorage.setItem('access', response.data.access_token)
                        localStorage.setItem('refresh', response.data.refresh_token)
                        resolve()
                    })
                    .catch(error => {
                        commit('error', error)
                        commit('logout')
                        reject()
                    })
            })

        },
        test({commit}) {
            return new Promise((resolve, reject) => {
                api.access.get('/restricted')
                    .then(response => {
                        commit('test', response.data), 
                            resolve()
                    })
                    .catch(error => {
                        commit('error', error)
                        reject()
                    })
            })
        }
    }
}
export default token

