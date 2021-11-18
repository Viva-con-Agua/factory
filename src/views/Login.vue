<template>
    <div class="content-text text-center">
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
        this.$store.dispatch({type: 'user/session/get', code: this.code})
            .then(() => {
                if (this.callback == null || this.callback == 'null') { 
                    this.$router.push({name: 'Overview'})
                } else {
                    this.$router.push({path: atob(this.callback)})
                }
            })
            .catch(()=> {
                this.$router.push({name: 'Overview'})
            })
    }
}
</script>
