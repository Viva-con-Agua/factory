<template>
    <div>
        <vca-number
            ref="crm_id"
            :errorMsg="$t('donation_widget.insert.error.crm_id')"
            :placeholder="$t('donation_widget.insert.placeholder.crm_id')"
            :max="Infinity"
            :min="1"
            v-model="crm_id"
            :rules="$v.create.crm_id">
        </vca-number>
        <vca-input
            ref="name"
            :errorMsg="$t('donation_widget.insert.error.name')"
            :placeholder="$t('donation_widget.insert.placeholder.name')"
            v-model.trim="create.name"
            :rules="$v.create.name">
        </vca-input>
        <vca-input
            ref="description"
            :errorMsg="$t('donation_widget.insert.error.name')"
            :placeholder="$t('donation_widget.insert.placeholder.name')"
            v-model.trim="create.description"
            :rules="$v.create.description">
        </vca-input>
        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.create') }}</button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'PaymentWidgetCreate',
    computed: {
        create: {
            get () {
                return this.$store.state.paymentwidget.create
            },
            set (value) {
                this.$store.commit('paymentwidget/create', value)
            }
        },
        crm_id: {
            get () {
                return this.$store.state.paymentwidget.create.crm_id.toString()  
            },
            set (value) {
                this.$store.commit('paymentwidget/crm_id', value)
            }
        },
    },
    validations: {
        create: {
            crm_id: { required },
            name: { required },
            description: { required },
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid) {
                this.$refs.crm_id.validate()
                this.$refs.name.validate()
                this.$refs.description.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$store.dispatch({type: 'paymentwidget/add'})
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
