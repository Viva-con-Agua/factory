<template>
    <div></div>
</template>
<script>
export default {
    name: 'Redirect',
    created () {
        window.location.href = process.env.VUE_APP_AUTH_URL+'/#/login?scope=factory'
    }
}
</script>
