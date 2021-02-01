<template>
    <div></div>
</template>
<script>
export default {
    name: 'Login',
    props: {
        code: {
            type: String,
            default: null
        }
    },
    created () {
        this.$store.dispatch({type: 'token/get', code: this.code})
            .then(() => {
                this.$router.push({name: 'Root'})
            })

    }
}
</script>
