import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

function loadView(view) {
    return () => import(`@/views/${view}.vue`)
}

const routes = [
    {
        path: '/applications',
        name: 'Applications',
        component: loadView('Applications'),
        meta: {requiresAuth: true}

    },
    {
        path: '/campaign',
        name: 'Campaign',
        component: loadView('CampaignPage'),
        meta: {requiresAuth: true}

    },
    {
        path: '/company',
        name: 'Company',
        component: loadView('CompanyView'),
        meta: {requiresAuth: true}

    },
    {
        path: '/payment-widget',
        name: 'PaymentWidget',
        component: loadView('PaymentWidgetPage'),
        meta: {requiresAuth: true}

    },
    {
        path: '/emails',
        name: 'EmailPage',
        component: loadView('EmailPage'),
        meta: {requiresAuth: true}

    },
    {
        path: '/overview',
        name: 'Overview',
        component: loadView('Overview'),
        meta: {requiresAuth: true}

    },
    {
        path: '/login',
        name: 'Login',
        component: loadView('Login'),
        meta: { requiresAuth: false, title: "Login"},
        props: route => ({code: route.query.code, callback: route.query.callback})
    },
    {
        path: '/logout',
        name: 'Logout',
        component: loadView('Logout'),
    },
    {
        path: '/sign',
        name: 'Sign',
        component: loadView('Sign'),
        meta: { requiresAuth: false, title: "Login" },
        props: true
    },
    {
        path: '/redirect', name: 'Redirect', component: loadView('Redirect')
    },
    {
        path:'/', name:'Root', redirect: { name: 'Overview'}
    },

]

var router = new Router({
    routes,
    scrollBehavior(to) {
        if (to.hash) {
          return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    },
})
router.beforeEach(( to, from, next ) => {
    store.dispatch('user/session/loadSession')
        .then(()=> {
            next()
        })
        .catch (() => {
            if (!to.meta.requiresAuth) {
                next()
            }else{
                next()
                //window.location = process.env.VUE_APP_AUTH_URL + "login?scope=" + process.env.VUE_APP_SCOPE + "&language=" + localStorage.language + "&callback=" + btoa(to.fullPath)
            }
        })
})
export default router
