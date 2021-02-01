<template>
    <div>
        <vca-input
            ref="app_name"
            errorMsg="Bitte app name angeben"
            placeholder="App Name"
            v-model.trim="create.app_name"
            :rules="$v.create.app_name">
        </vca-input>
        <vca-input
            ref="redirect_url"
            errorMsg="Bitte RedirectUrl angeben"
            placeholder="Redirect Url"
            v-model.trim="create.redirect_url"
            :rules="$v.create.redirect_url">
        </vca-input>
        <vca-input
            ref="logout_url"
            errorMsg="Bitte Logout Url angeben"
            placeholder="LogoutUrl"
            v-model.trim="create.logout_url"
            :rules="$v.create.logout_url">
        </vca-input>
        <input type="checkbox" id="admin" value="admin" v-model="create.restriction">
        <label for="admin">Admin</label>
        <input type="checkbox" id="employee" value="employee" v-model="create.restriction">
        <label for="employee">Employee</label>
        <input type="checkbox" id="member" value="member" v-model="create.restriction">
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
    name: 'InsertApp',
    computed: {
        create: {
            get () {
                return this.$store.state.app.create
            },
            set (value) {
                this.$store.commit('app/create', value)
            }
        }
    },
    validations: {
        create: {
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
            this.$store.dispatch({type: 'app/add'})
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
