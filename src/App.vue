<template>
  <div id="app">
    <vca-loading v-if="loadingFlow"/>
    <notifications position="top center" width="100%"/>
    <Navigation/>
    <router-view id="app-content"/>
    <Footer id="app-footer"/>
  </div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue'
import Footer from '@/components/layout/Footer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { Navigation, Footer },
    computed: {
        ...mapGetters({
            loadingFlow: 'loadingFlow',
            currentMsg: 'currentMsg'
        })
    },
    watch: {
        currentMsg: function(currentMsg) {
            if (currentMsg !== null) {
                this.notification(currentMsg)
                this.$store.commit('currentMsg', null)
            }
        },
        $route: function() {
            if (this.loadingFlow) {
                this.$store.commit('loadingFlow')
            }
        }
    },
    created () {
        if (this.$i18n) {
            if (localStorage.language === undefined) {
                localStorage.language = this.$i18n.locale.toLowerCase()
            } else {
                this.$i18n.locale = localStorage.language
            }
        }
        if (this.loadingFlow) {
            this.$store.commit('loadingFlow')
        }
        if (this.currentMsg !== null) {
            this.notification(this.currentMsg)
            this.$store.commit('currentMsg', null)
        }
    }
}
</script>