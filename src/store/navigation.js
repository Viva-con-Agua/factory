const navigation = {
    namespaced: true,
    state: () => ({
        current: "Home",
        tabs: [
            { title: 'navigation.tabs.home', route: { name: "Overview" }, needSession: false},
            { title: 'navigation.tabs.apps', route: { name: "Applications" }, needSession: false},
            { title: 'navigation.tabs.email', route: { name: "EmailPage" }, needSession: false},
            { title: 'navigation.tabs.campaign', route: { name: "Campaign" }, needSession: false},
            { title: 'navigation.tabs.company', route: { name: "Company" }, needSession: false},
            { title: 'navigation.tabs.paymentWidget', route: { name: "PaymentWidget" }, needSession: false},
            { title: 'navigation.tabs.logout', route: { name: "Logout" }, needSession: false},

            //{ title: 'navigation.tabs.signin', route: { name: "Sign" }, needSession: false},
        ]
    }),
    mutations: {
        current(state, value) {
            state.current = value
        }
    },
    getters: {
        current(state) {
            return state.current
        },
        tabs(state) {
            return state.tabs
        }
    },
    actions: {
        current({commit}, data) {
            commit('current', data)
        },
        getNavigation() {
            // get from backend
            // commit to state
        }
    }
}
export default navigation
