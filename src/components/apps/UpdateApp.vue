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
        
        <div class="vca-row">
            <div>{{ $t('app.insert.placeholder.permissions.title') }}</div>
            <div class="vca-column">

                <vca-checkbox
                    id="admin"
                    value="admin"
                    v-model="current.restriction">
                    {{ $t('app.insert.placeholder.permissions.admin') }}
                </vca-checkbox>
                <vca-checkbox
                    id="employee"
                    value="employee"
                    v-model="current.restriction">
                    {{ $t('app.insert.placeholder.permissions.employee') }}
                </vca-checkbox>
                <vca-checkbox
                    id="member"
                    value="member"
                    v-model="current.restriction">
                    {{ $t('app.insert.placeholder.permissions.member') }}
                </vca-checkbox>
                
            </div>
              
            
        </div>

        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.update') }}</button>
        <div class="vca-center">
            <vca-cancel-button :placeholder="$t('actions.close')" @click="resetCurrent" />
        </div>




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
        resetCurrent() {
            this.$store.commit('app/current', null)
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
