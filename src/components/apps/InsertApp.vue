<template>
    <div>
        <vca-input
            ref="app_name"
            :errorMsg="$t('app.insert.error.name')"
            :placeholder="$t('app.insert.placeholder.name')"
            v-model.trim="create.app_name"
            :rules="$v.create.app_name">
        </vca-input>
        <vca-input
            ref="redirect_url"
            :errorMsg="$t('app.insert.error.redirect_url')"
            :placeholder="$t('app.insert.placeholder.redirect_url')"
            v-model.trim="create.redirect_url"
            :rules="$v.create.redirect_url">
        </vca-input>
        <vca-input
            ref="logout_url"
            :errorMsg="$t('app.insert.error.logout_url')"
            :placeholder="$t('app.insert.placeholder.logout_url')"
            v-model.trim="create.logout_url"
            :rules="$v.create.logout_url">
        </vca-input>

        <div class="vca-row">
            <div>{{ $t('app.insert.placeholder.permissions.title') }}</div>
            <div class="vca-column">

                <vca-checkbox
                    id="admin"
                    value="admin"
                    v-model="create.restriction">
                    {{ $t('app.insert.placeholder.permissions.admin') }}
                </vca-checkbox>
                <vca-checkbox
                    id="employee"
                    value="employee"
                    v-model="create.restriction">
                    {{ $t('app.insert.placeholder.permissions.employee') }}
                </vca-checkbox>
                <vca-checkbox
                    id="member"
                    value="member"
                    v-model="create.restriction">
                    {{ $t('app.insert.placeholder.permissions.member') }}
                </vca-checkbox>
                
            </div>
              
            
        </div>

        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.create') }}</button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'InsertApp',
    computed: {
        create: {
            get () {
                console.log("change")
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
