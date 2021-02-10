//import api from './api.js'
import job from './job.js'

const mail = {
    namespaced: true,
    modules: {
        job: job,
    },
    state: () => ({
        list: null,
        current: null
    }),
}
export default mail

