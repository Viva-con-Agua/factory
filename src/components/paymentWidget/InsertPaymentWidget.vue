<template>
    <div>
        <vca-number
            ref="crm_id"
            :errorMsg="$t('donation_widget.insert.error.crm_id')"
            :placeholder="$t('donation_widget.insert.placeholder.crm_id')"
            :max="Infinity"
            :min="1"
            v-model="create.crm_id"
            :rules="$v.create.crm_id">
        </vca-number>
        <vca-input
            ref="name"
            :errorMsg="$t('donation_widget.insert.error.name')"
            :placeholder="$t('donation_widget.insert.placeholder.name')"
            v-model.trim="create.name"
            :rules="$v.create.name">
        </vca-input>
        <vca-textarea
            ref="description"
            :errorMsg="$t('donation_widget.insert.error.description')"
            :placeholder="$t('donation_widget.insert.placeholder.description')"
            v-model.trim="create.description"
            :rules="$v.create.description">
        </vca-textarea>
        <vca-dropdown ref="type" :multiple="true" v-model="payment_type" :options="payment_types" :title="$t('donation_widget.insert.paymenttype.title')" :placeholder="$t('donation_widget.insert.placeholder.paymenttype')" label=""/>
        <vca-dropdown ref="type" :multiple="true" v-model="subscription_type" :options="subscription_types" :title="$t('donation_widget.insert.type.title')" :placeholder="$t('donation_widget.insert.placeholder.type')" label=""/>

        <vca-number
            ref="pay_day"
            :errorMsg="$t('donation_widget.insert.error.pay_day')"
            :placeholder="$t('donation_widget.insert.placeholder.pay_day')"
            :max="31"
            :min="1"
            v-model="create.pay_day"
            :rules="$v.create.pay_day">
        </vca-number>

        <vca-input
            ref="company_id"
            :errorMsg="$t('donation_widget.insert.error.company_id')"
            :placeholder="$t('donation_widget.insert.placeholder.company_id')"
            v-model.trim="create.company_id"
            :rules="$v.create.company_id">
        </vca-input>

        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.create') }}</button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'PaymentWidgetCreate',
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters({
            payment_types: 'paymentwidget/payment_types',
            subscription_types: 'paymentwidget/subscription_types'
        }),
        create: {
            get () {
                return this.$store.state.paymentwidget.create
            },
            set (value) {
                this.$store.commit('paymentwidget/create', value)
            }
        },
        payment_type: {
            get () {
                return this.$store.state.paymentwidget.create.payment_types == null ? [] : this.$store.state.paymentwidget.create.payment_types.filter((row) => {
                        let obj = this.$store.state.paymentwidget.payment_types.find(o => o.value === row.name || o.value === row.value);

                        if (obj == undefined) {
                            console.log(row.name)
                            return false;
                        }
                        row.value = row.name
                        row.title = obj.title
                        row.subtitle = obj.subtitle
                        row.label = obj.label
                        return true;
                    });
            },
            set (value) {
                let newCreate = this.create
                newCreate.payment_types = value
                this.$store.commit('paymentwidget/create', newCreate)
            }
        },
        subscription_type: {
            get () {
                return this.$store.state.paymentwidget.create.subscription_types == null ? [] : this.$store.state.paymentwidget.create.subscription_types.filter((row) => {
                    let obj = this.$store.state.paymentwidget.subscription_types.find(o => o.value === row.name);
                    row.value = row.name
                    row.title = obj.title
                    row.subtitle = obj.subtitle
                    row.label = obj.label
                    return true;
                });
            },
            set (value) {
                let newCreate = this.create
                newCreate.subscription_types = value
                this.$store.commit('paymentwidget/create', newCreate)
            }
        }
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
