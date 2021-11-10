<template>
    <div>
        <vca-number
            ref="crm_id"
            :errorMsg="$t('donation_widget.insert.error.crm_id')"
            :placeholder="$t('donation_widget.insert.placeholder.crm_id')"
            :max="Infinity"
            :min="1"
            v-model="current.crm_id"
            :rules="$v.current.crm_id">
        </vca-number>
        <vca-input
            ref="name"
            :errorMsg="$t('donation_widget.insert.error.name')"
            :placeholder="$t('donation_widget.insert.placeholder.name')"
            v-model.trim="current.name"
            :rules="$v.current.name">
        </vca-input>
        <vca-textarea
            ref="description"
            :errorMsg="$t('donation_widget.insert.error.description')"
            :placeholder="$t('donation_widget.insert.placeholder.description')"
            v-model.trim="current.description"
            :rules="$v.current.description">
        </vca-textarea>
        <vca-input
            ref="description"
            :errorMsg="$t('donation_widget.insert.error.name')"
            :placeholder="$t('donation_widget.insert.placeholder.name')"
            v-model.trim="current.description"
            :rules="$v.current.description">
        </vca-input>
        <vca-dropdown ref="type" :multiple="true" v-model="payment_type" :options="payment_types" :title="$t('donation_widget.insert.paymenttype.title')" :placeholder="$t('donation_widget.insert.placeholder.paymenttype')" label=""/>
        <vca-dropdown ref="type" :multiple="true" v-model="subscription_type" :options="subscription_types" :title="$t('donation_widget.insert.type.title')" :placeholder="$t('donation_widget.insert.placeholder.type')" label=""/>

        <vca-number
            ref="pay_day"
            :errorMsg="$t('donation_widget.insert.error.pay_day')"
            :placeholder="$t('donation_widget.insert.placeholder.pay_day')"
            :max="31"
            :min="1"
            v-model="current.pay_day"
            :rules="$v.current.pay_day">
        </vca-number>

        <vca-input
            ref="company_id"
            :errorMsg="$t('donation_widget.insert.error.company_id')"
            :placeholder="$t('donation_widget.insert.placeholder.company_id')"
            v-model.trim="current.company_id"
            :rules="$v.current.company_id">
        </vca-input>
        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.update') }}</button>
        <div class="vca-center">
            <vca-cancel-button :placeholder="$t('actions.close')" @click="resetCurrent" />
        </div>

    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
//import ImageUpload from '@/components/campaign/ImageUpload.vue'
export default {
    name: 'UpdatePaymentwidget',
    components: {
  //      ImageUpload
    },
    data() {
        return {
            payment_types: [
                {"title":"CiviSepa", "label":"CiviCRM Sepa", "subtitle": this.$t('donation_widget.insert.type.payment_type.civisepa') ,"value":"civisepa"},
                {"title":"Stripe Sepa", "label":"Stripe Sepa Debit", "subtitle": this.$t('donation_widget.insert.type.payment_type.sepa') ,"value":"sepa"},
                {"title":"Stripe Creditcard", "label":"Stripe Creditcard", "subtitle": this.$t('donation_widget.insert.payment_type.option.creditcard') ,"value":"creditcard"},
                {"title":"Paypal", "label":"Paypal Payment", "subtitle": this.$t('donation_widget.insert.payment_type.option.paypal') ,"value":"paypal"}
            ],
            subscription_types: [
                {"title":"CiviSepa", "label":"CiviCRM Sepa", "subtitle": this.$t('donation_widget.insert.type.subscription_type.civisepa') ,"value":"civisepa"},
                {"title":"Stripe Sepa", "label":"Stripe Sepa Debit", "subtitle": this.$t('donation_widget.insert.type.subscription_type.sepa') ,"value":"sepa"},
                {"title":"Stripe Creditcard", "label":"Stripe Creditcard", "subtitle": this.$t('donation_widget.insert.subscription_type.option.creditcard') ,"value":"creditcard"},
                {"title":"Paypal", "label":"Paypal Payment", "subtitle": this.$t('donation_widget.insert.subscription_type.option.paypal') ,"value":"paypal"}
            ]

        }
    },
    computed: {
        current: {
            get () {
                return this.$store.state.paymentwidget.current
            },
            set (value) {
                this.$store.commit('paymentwidget/current', value)
            }
        },
        payment_type: {
            get () {
                return this.$store.state.paymentwidget.current.payment_types == null ? [] : this.$store.state.paymentwidget.current.payment_types.filter((row) => {
                        let obj = this.payment_types.find(o => o.value === row.name);
                        row.value = row.name
                        row.title = obj.title
                        row.subtitle = obj.subtitle
                        row.label = obj.label
                        return true;
                    });
            },
            set (value) {
                this.$store.commit('paymentwidget/payment_type', value[0].value)
            }
        },
        subscription_type: {
            get () {
                return this.$store.state.paymentwidget.current.subscription_types == null ? [] : this.$store.state.paymentwidget.current.subscription_types.filter((row) => {
                    let obj = this.subscription_type.find(o => o.value === row.name);
                    row.value = row.name
                    row.title = obj.title
                    row.subtitle = obj.subtitle
                    row.label = obj.label
                    return true;
                });
            },
            set (value) {
                this.$store.commit('paymentwidget/payment_type', value[0].value)
            }
        }
    },
    validations: {
        current: {
            crm_id: { required },
            name: { required },
            title: { required },
            description: { required },
            start_time: { required },
            end_time: { required },
            type: { required }
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid) {
                this.$refs.crm_id.validate()
                this.$refs.name.validate()
                this.$refs.title.validate()
                this.$refs.description.validate()
                this.$refs.start_time.validate()
                this.$refs.end_time.validate()
                this.$refs.type.validate()
            } else {
                this.submit()
            }
        },
        setHeaderImage(e) {
            this.headerImage = e
        },
        setContentImage(e) {
            this.contentImage = e
        },
        resetCurrent() {
            this.$store.commit("paymentwidget/current", null)
        },
        submit() {
            this.$store.dispatch({type: 'paymentwidget/update'})
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
