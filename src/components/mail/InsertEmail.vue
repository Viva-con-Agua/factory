<template>
    <div>
        <vca-input
            ref="email"
            :errorMsg="$t('email.address.insert.error.email')"
            :placeholder="$t('email.address.insert.placeholder.email')"
            v-model.trim="create.email"
            :rules="$v.create.email">
        </vca-input>
        <vca-input
            ref="password"
            :errorMsg="$t('email.address.insert.error.password')"
            :placeholder="$t('email.address.insert.placeholder.password')"
            v-model.trim="create.password"
            :rules="$v.create.password">
        </vca-input>
        <vca-input
            ref="password1"
            :errorMsg="$t('email.address.insert.error.password1')"
            :placeholder="$t('email.address.insert.placeholder.password1')"
            v-model.trim="create.password1"
            :rules="$v.create.password1">
        </vca-input>
        <vca-input
            ref="host"
            :errorMsg="$t('email.address.insert.error.host')"
            :placeholder="$t('email.address.insert.placeholder.host')"
            v-model.trim="create.host"
            :rules="$v.create.host">
        </vca-input>
        <vca-number
            ref="port"
            :errorMsg="$t('email.address.insert.error.port')"
            :placeholder="$t('email.address.insert.placeholder.port')"
            v-model.trim="create.port"
            :rules="$v.create.port">
        </vca-number>
        <vca-dropdown :placeholder="$t('email.address.insert.placeholder.scope')" />

        <div class="vca-row">
                          
        </div>
        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.create') }}</button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'InsertEmail',
    computed: {
        create: {
            get () {
                return this.$store.state.mail.create
            }
        }
    },
    watch: {
        create: {
            handler(val) {
                this.$store.commit('mail/create', val)
            },     
            deep: true
        }
    },
    validations: {
        create: {
            email: { required },
            password: { required },
            password1: { required },
            host: { required },
            port: { required }
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid) {
                this.$refs.email.validate()
                this.$refs.host.validate()
                this.$refs.port.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$store.dispatch({type: 'mail/add'})
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
