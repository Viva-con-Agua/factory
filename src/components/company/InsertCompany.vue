<template>
    <div>
        <vca-input
            ref="name"
            :errorMsg="$t('company.insert.error.name')"
            :placeholder="$t('company.insert.placeholder.name')"
            v-model.trim="create.name"
            :rules="$v.create.name">
        </vca-input>

        <vca-input
            ref="country"
            :errorMsg="$t('company.insert.error.country')"
            :placeholder="$t('company.insert.placeholder.country')"
            v-model.trim="create.country"
            :rules="$v.create.country">
        </vca-input>

        <vca-input
            ref="stripe_public_key"
            :errorMsg="$t('company.insert.error.stripe_public_key')"
            :placeholder="$t('company.insert.placeholder.stripe_public_key')"
            v-model.trim="create.stripe_public_key"
            :rules="$v.create.stripe_public_key">
        </vca-input>
        <vca-input
            ref="stripe_private_key"
            :errorMsg="$t('company.insert.error.stripe_private_key')"
            :placeholder="$t('company.insert.placeholder.stripe_private_key')"
            v-model.trim="create.stripe_private_key"
            :rules="$v.create.stripe_private_key">
        </vca-input>
        <vca-input
            ref="paypal_client_id"
            :errorMsg="$t('company.insert.error.paypal_client_id')"
            :placeholder="$t('company.insert.placeholder.paypal_client_id')"
            v-model.trim="create.paypal_client_id"
            :rules="$v.create.paypal_client_id">
        </vca-input>
        <vca-input
            ref="paypal_secret"
            :errorMsg="$t('company.insert.error.paypal_secret')"
            :placeholder="$t('company.insert.placeholder.paypal_secret')"
            v-model.trim="create.paypal_secret"
            :rules="$v.create.paypal_secret">
        </vca-input>

        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.create') }}</button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
//import ImageUpload from '@/components/campaign/ImageUpload.vue'
export default {
    name: 'InsertCompany',
    components: {
  //      ImageUpload
    },
    data() {
        return {}
    },
    computed: {
        create: {
            get () {
                return this.$store.state.company.create
            },
            set (value) {
                this.$store.commit('company/create', value)
            }
        }
    },
    validations: {
        create: {
            name: { required },
            country: { required }
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid) {
                this.$refs.name.validate()
                this.$refs.country.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$store.dispatch({type: 'company/add'})
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
