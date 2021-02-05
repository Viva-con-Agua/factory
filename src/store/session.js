import api from './api.js'
//import createPersistedState from "vuex-persistedstate";
const session = {
    namespaced: true,
    state: () => ({
        user: null,
        error: ""
    }),
    mutations: {
        user (state, value) {
            state.user = value
        },
        error (state, value) {
            state.error = value
        },
        logout () {
            localStorage.clear()
        }
    },
    getters: {
        user(state) {
            return state.user
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
                api.base.get('/v1/auth/login/token?code=' + code.code)
                    .then(response => {
                    api.asyncLocalStorage.setItem('access', response.data.access_token).then(function () {
                        var token = response.data.access_token
                        var user = api.parseJwt(token).user
                        commit("user", user)
                        console.log(user)
                        return api.asyncLocalStorage.getItem('access')
                    }).then(function () {
                        console.log('Value has been set to:');
                    });
                    api.asyncLocalStorage.setItem('refresh', response.data.refresh_token).then(function () {
                        return api.asyncLocalStorage.getItem('refresh');
                    }).then(function () {
                        console.log('Value has been set to:');
                    });
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
export default session

