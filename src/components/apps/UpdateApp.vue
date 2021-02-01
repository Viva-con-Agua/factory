<template>
    <div>
        <vca-input
            ref="app_name"
            errorMsg="Bitte app name angeben"
            placeholder="App Name"
            v-model.trim="current.app_name"
            :rules="$v.current.app_name">
        </vca-input>
        <vca-input
            ref="redirect_url"
            errorMsg="Bitte RedirectUrl angeben"
            placeholder="Redirect Url"
            v-model.trim="current.redirect_url"
            :rules="$v.current.redirect_url">
        </vca-input>
        <vca-input
            ref="logout_url"
            errorMsg="Bitte Logout Url angeben"
            placeholder="LogoutUrl"
            v-model.trim="current.logout_url"
            :rules="$v.current.logout_url">
        </vca-input>
        <input type="checkbox" id="admin" value="admin" v-model="current.restriction">
        <label for="admin">Admin</label>
        <input type="checkbox" id="employee" value="employee" v-model="current.restriction">
        <label for="employee">Employee</label>
        <input type="checkbox" id="member" value="member" v-model="current.restriction">
        <label for="member">Member</label>
        <button 
               class="vca-button-small"
               @click.self.prevent="validate">
            Submit
        </button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'UpdateApp',
    computed: {
        current: {
            get () {
                return this.$store.state.app.current
            },
            set (value) {
                this.$store.commit('app/current', value)
            }
        }
    },
    validations: {
        current: {
            app_name: { required },
            redirect_url: { required },
            logout_url: { required }
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid) {
                this.$refs.app_name.validate()
                this.$refs.redirect_url.validate()
                this.$refs.logout_url.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$store.dispatch({type: 'app/update'})
                .then(() => {
                    this.$emit('success')
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }


}
</script>
