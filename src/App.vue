<template>
  <div id="app">
    <notifications position="top center" width="100%"/>
    <Navigation/>
    <router-view id="app-content"/>
    <Footer id="app-footer"/>
  </div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'App',
  components: { Navigation, Footer }
}
</script>