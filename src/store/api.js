import axios from 'axios'
import router from '../router'
//import store from './index.js'

var call = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})
call.interceptors.response.use((response) => {
    return response;
    }, (error) => {
        if (error.response.status !== 401 && error.response.data.message !== 'missing or malformed jwt') {
            return new Promise((resolve, reject) => {
                reject(error)
            });
        }
        if (error.config.url == '/v1/auth/refresh' ) {
            return new Promise((resolve, reject) => {
                reject(error);
                router.push('/logout')
            });
        }
        return new Promise((resolve, reject) => 
            call.get('/v1/auth/refresh')
                .then((response) => {
                    if (response.status === 200) {
                        const config = error.config;
                        axios.request(config).then(response => {
                            resolve(response);
                        }).catch((error) => {
                            reject(error)
                            router.push('/logout')
                        })
                    }
                }).catch((error) => {
                    reject(error)
                    router.push('/logout')
                })
        )
    })

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function storeJWT(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getJWT(key) {
    return JSON.parse(localStorage.getItem(key))
}



export default class api {
    constructor () {
    }
    static get call() {
        return call
    }
    static parseJwt(token) {
        return parseJwt(token)
    }
    static storeJWT(key, value) {
        return storeJWT(key, value)
    }
    static getJWT(key) {
        return getJWT(key)
    }
}


/*import store from './'
import axios from 'axios'
import parseJwt from './parseJwt.js'
var api = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: true,
})

api.interceptors.request.use(
    function (config) {
        var token = JSON.parse(localStorage.getItem('access'))
        if (token !== null) {
            var payload = parseJwt(token)
            var now = new Date().getTime()
            if (now / 1000 - 60 <= payload.exp) {
                return config
            } else {
                var headers = {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('refresh')),
                    'Content-Type': 'application/json'
                }
                axios.get(process.env.VUE_APP_BACKEND_URL + "/v1/auth/refresh", {headers: headers})
                    .then( response => {
                        localStorage.setItem('access', JSON.stringify(response.data.access_token))
                        var user = parseJwt(response.data.access_token).user
                        store.commit("session/user", user)
                        localStorage.setItem('refresh', JSON.stringify(response.data.refresh_token))
                        return config
                    })
                    .catch(error => {
                        console.log(error)
                        return config
                    })
                    .finally(()=> {
                        return config
                    })
            }
        }else {
            return config
        }
        //return config
    }, function(error) {
        return Promise.reject(error)   
    }
)
export default api*/
