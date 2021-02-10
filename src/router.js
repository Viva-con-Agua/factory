import Vue from 'vue'
import Router from 'vue-router'

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
        meta: { requiresAuth: false, title: "Login" },
        props: route => ({ code: route.query.code })
    },
    {
        path: '/logout',
        name: 'Logout',
        component: loadView('Logout'),
    },

    {
        path: '/redirect', name: 'Redirect', component: loadView('Redirect')
    },
    {
        path:'/', name:'Root', redirect: { name: 'Overview'}
    },

]
var router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem("access") === null) {
      next({
        path: '/redirect',
        //query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})


export default router
