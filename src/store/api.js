import axios from 'axios'
import store from './index.js'

const access = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
        'Content-Type': 'application/json'
    }
})
access.interceptors.request.use(
    function (config) {
        var payload = parseJwt(localStorage.getItem('access'))
        var now = new Date().getTime()
        console.log(payload)
        if (now / 1000 <= payload.exp) {
            return config
        } else {
            refresh.get("/v1/auth/refresh")
                .then( response => {
                    asyncLocalStorage.setItem('access', response.data.access_token).then(function () {
                        var user = parseJwt(response.data.access_token).user
                        store.commit("session/user", user)
                        return asyncLocalStorage.getItem('access')
                    }).then(function () {
                    });
                    asyncLocalStorage.setItem('refresh', response.data.refresh_token).then(function () {
                        return asyncLocalStorage.getItem('mykey');
                    }).then(function () {
                    });
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(()=> {
                    return config
                })
        }
        //return config
    }, function(error) {
        return Promise.reject(error)   
    })


const refresh = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('refresh'),
        'Content-Type': 'application/json'
    }

})
const base = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

const asyncLocalStorage = {
    setItem: function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    }
};


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}



export default class api {
    constructor () {
    }
    static get access() {
        return access
    }
    static get refresh() {
        return refresh
    }
    static get base (){
        return base
    }
    static get asyncLocalStorage() {
        return asyncLocalStorage
    }
    static parseJwt(token) {
        return parseJwt(token)
    }
}
