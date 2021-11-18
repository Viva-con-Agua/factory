<template>
    <div></div>
</template>
<script>
export default {
    name: 'Logout',
    props: {
        code: {
            type: String,
            default: null
        }
    },
    created () {
        this.$store.dispatch("logout")        
        window.location = process.env.VUE_APP_AUTH_URL + "logout?callback=" + encodeURIComponent(window.location.origin)
    }
}
</script>
