<template>
    <div>
        <vca-field :label="$t('paymentwidget.insert.label.infos')">
            <vca-number
                ref="crm_id"
                :errorMsg="$t('paymentwidget.insert.error.crm_id')"
                :placeholder="$t('paymentwidget.insert.placeholder.crm_id')"
                :max="Infinity"
                :min="1"
                v-model="create.crm_id"
                :rules="$v.create.crm_id">
            </vca-number>
            <vca-input
                ref="name"
                :errorMsg="$t('paymentwidget.insert.error.name')"
                :placeholder="$t('paymentwidget.insert.placeholder.name')"
                v-model.trim="create.name"
                :rules="$v.create.name">
            </vca-input>
            <vca-textarea
                ref="description"
                :errorMsg="$t('paymentwidget.insert.error.description')"
                :placeholder="$t('paymentwidget.insert.placeholder.description')"
                v-model.trim="create.description"
                :rules="$v.create.description">
            </vca-textarea>
            <vca-input
                ref="company_id"
                :errorMsg="$t('paymentwidget.insert.error.company_id')"
                :placeholder="$t('paymentwidget.insert.placeholder.company_id')"
                v-model.trim="create.company_id"
                :rules="$v.create.company_id">
            </vca-input>
        </vca-field>
        <vca-field :label="$t('paymentwidget.insert.label.payments')">
            <vca-dropdown ref="type" :multiple="true" v-model="payment_type" :options="payment_types" :title="$t('paymentwidget.insert.title.payment_types')" :placeholder="$t('paymentwidget.insert.placeholder.payment_types')" :label="$t('paymentwidget.insert.label.payment_types')"/>
            <vca-dropdown ref="type" :multiple="true" v-model="subscription_type" :options="subscription_types" :title="$t('paymentwidget.insert.title.subscription_types')" :placeholder="$t('paymentwidget.insert.placeholder.subscription_types')" :label="$t('paymentwidget.insert.label.subscription_types')"/>

            <vca-card>
                <vca-money-input class="input-amount" ref="min_amount" v-model="min_amount" :money="min_amount" :rules="$v.create.min_amount" :errorMsg="$t('paymentwidget.insert.errorMsg.min_amount')" :topText="$t('paymentwidget.insert.topText.min_amount')"/>
            </vca-card>
            <vca-card>
                <vca-money-input class="input-amount" ref="default_amount" v-model="default_amount" :money="default_amount" :rules="$v.create.default_amount" :errorMsg="$t('paymentwidget.insert.errorMsg.default_amount')" :topText="$t('paymentwidget.insert.topText.default_amount')"/>
            </vca-card>

            <vca-number
                ref="pay_day"
                :errorMsg="$t('paymentwidget.insert.error.pay_day')"
                :placeholder="$t('paymentwidget.insert.placeholder.pay_day')"
                :max="31"
                :min="1"
                v-model="create.pay_day"
                :rules="$v.create.pay_day">
            </vca-number>
        </vca-field>

        {{ create }}

        <vca-field :label="$t('paymentwidget.insert.label.slider')">
            <vca-dropdown ref="type" v-model="slider_type" :options="slider_types" :title="$t('paymentwidget.insert.title.slider_types')" :placeholder="$t('paymentwidget.insert.placeholder.slider_types')" :label="$t('paymentwidget.insert.label.slider_types')"/>
            
            <vca-card>
                <vca-money-input class="input-amount" ref="slider_min" v-model="slider_min" :money="slider_min" :rules="$v.create.slider_min" :errorMsg="$t('paymentwidget.insert.errorMsg.slider_min')" :topText="$t('paymentwidget.insert.topText.slider_min')"/>
            </vca-card>
            <vca-card>
                <vca-money-input class="input-amount" ref="slider_max" v-model="slider_max" :money="slider_max" :rules="$v.create.slider_max" :errorMsg="$t('paymentwidget.insert.errorMsg.slider_max')" :topText="$t('paymentwidget.insert.topText.slider_max')"/>
            </vca-card>
        </vca-field>
        
        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.create') }}</button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'PaymentWidgetCreate',
    data() {
        return {
        }
    },
    computed: {
        create: {
            get () {
                return this.$store.state.paymentwidget.create
            },
            set (value) {
                this.$store.commit('paymentwidget/create', value)
            },
        },
        min_amount: {
            get () {
                return {'amount': this.$store.state.paymentwidget.create.min_amount, 'currency': 'EUR'}
            },
            set (value) {
                this.create.min_amount = Number.parseInt(value.amount)
                this.$store.commit('paymentwidget/create', this.create)
            }
        },
        default_amount: {
            get () {
                return {'amount': this.$store.state.paymentwidget.create.default_amount, 'currency': 'EUR'}
            },
            set (value) {
                this.create.default_amount = Number.parseInt(value.amount)
                this.$store.commit('paymentwidget/create', this.create)
            }
        },
        slider_min: {
            get () {
                return {'amount': this.$store.state.paymentwidget.create.slider.min, 'currency': 'EUR'}
            },
            set (value) {
                this.create.slider.min = Number.parseInt(value.amount)
                this.$store.commit('paymentwidget/create', this.create)
            }
        },
        slider_max: {
            get () {
                return {'amount': this.$store.state.paymentwidget.create.slider.max, 'currency': 'EUR'}
            },
            set (value) {
                this.create.slider.max = Number.parseInt(value.amount)
                this.$store.commit('paymentwidget/create', this.create)
            }
        },
        payment_types: {
            get () {
                return this.$store.state.paymentwidget.create.payment_types == null ? [] : this.$store.state.paymentwidget.create.payment_types.filter((row) => {
                        row.value = row.name
                        row.title = this.$t(row.title)
                        row.subtitle = this.$t(row.subtitle)
                        row.label = this.$t(row.label)
                        return true;
                    });
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
                        row.title = this.$t(obj.title)
                        row.subtitle = this.$t(obj.subtitle)
                        row.label = this.$t(obj.label)
                        return true;
                    });
            },
            set (value) {
                let newCreate = this.create
                newCreate.payment_types = value
                this.$store.commit('paymentwidget/create', newCreate)
            }
        },
        subscription_types: {
            get () {
                return this.$store.state.paymentwidget.create.subscription_types == null ? [] : this.$store.state.paymentwidget.create.subscription_types.filter((row) => {
                        row.value = row.name
                        row.title = this.$t(row.title)
                        row.subtitle = this.$t(row.subtitle)
                        row.label = this.$t(row.label)
                        return true;
                    });
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
        },
        slider_types: {
            get () {
                return this.$store.state.paymentwidget.slider_types == null ? [] : this.$store.state.paymentwidget.slider_types.filter((row) => {
                        row.value = row.name
                        row.title = this.$t(row.title)
                        row.subtitle = this.$t(row.subtitle)
                        row.label = this.$t(row.label)
                        return true;
                    });
            }
        },
        slider_type: {
            get () {
                return this.$store.state.paymentwidget.create.slider.name == null ? [] : this.$store.state.paymentwidget.slider_types.filter((row) => {
                    if (this.$store.state.paymentwidget.create.slider.name == row.value) {
                        return true;
                    }
                });
            },
            set (value) {
                let newCreate = this.create
                newCreate.slider.name = value[0].value
                this.$store.commit('paymentwidget/create', newCreate)
            }
        }
    },
    validations: {
        create: {
            crm_id: { required },
            name: { required },
            description: { required },
            min_amount: { required },
            default_amount: { required },
            company_id: { required }
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid) {
                this.$refs.crm_id.validate()
                this.$refs.name.validate()
                this.$refs.description.validate()
                this.$refs.min_amount.validate()
                this.$refs.default_amount.validate()
                this.$refs.company_id.validate()
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