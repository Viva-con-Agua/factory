import axios from 'axios'

const access = axios.create({
    baseURL: 'http://localhost:1323',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
        'Content-Type': 'application/json'
    }
})
const refresh = axios.create({
    baseURL: 'http://localhost:1323',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('refresh'),
        'Content-Type': 'application/json'
    }

})
const base = axios.create({
    baseURL: 'http://localhost:1323',
    headers: {
        'Content-Type': 'application/json'
    }
})




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
}
