const navigation = {
    namespaced: true,
    state: () => ({
        current: "Home",
        tabs: [
            { title: 'navigation.tabs.home', route: { name: "Overview" }},
            { title: 'navigation.tabs.apps', route: { name: "Applications" }, needSession: true},
            { title: 'navigation.tabs.email', route: { name: "EmailPage" }, needSession: true},
            { title: 'navigation.tabs.campaign', route: { name: "Campaign" }, needSession: true},
            { title: 'navigation.tabs.company', route: { name: "Company" }, needSession: true},
            { title: 'navigation.tabs.paymentwidget', route: { name: "PaymentWidget" }, needSession: true},
            { title: 'navigation.tabs.signin', route: { name: "Sign" }, needSession: false},
            { title: 'navigation.tabs.logout', route: { name: "Logout" }, needSession: true}
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
