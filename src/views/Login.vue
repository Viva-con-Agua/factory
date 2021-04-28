<template>
    <div class="text-center">
        <h1>{{ $t('login.required') }}</h1>
    </div>
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
        this.$store.dispatch({type: 'session/get', code: this.code})
            .then(() => {
                this.$router.push({name: 'Root'})
            })

    }
}
</script>
