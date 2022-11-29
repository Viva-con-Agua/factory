<template>
    <div>
        <vca-field :label="$t('paymentwidget.insert.label.url')">
            <vca-share-buttons v-if="current" :share="share"/>
        </vca-field>
        <vca-field :label="$t('paymentwidget.insert.label.infos')">
            <vca-number
                ref="crm_id"
                :errorMsg="$t('paymentwidget.insert.error.crm_id')"
                :placeholder="$t('paymentwidget.insert.placeholder.crm_id')"
                :max="Infinity"
                :min="1"
                v-model="current.crm_id"
                :rules="$v.current.crm_id">
            </vca-number>
            <vca-input
                ref="name"
                :errorMsg="$t('paymentwidget.insert.error.name')"
                :placeholder="$t('paymentwidget.insert.placeholder.name')"
                v-model.trim="current.name"
                :rules="$v.current.name">
            </vca-input>
            <vca-textarea
                ref="description"
                :errorMsg="$t('paymentwidget.insert.error.description')"
                :placeholder="$t('paymentwidget.insert.placeholder.description')"
                v-model.trim="current.description"
                :rules="$v.current.description">
            </vca-textarea>
            <vca-input
                ref="company_id"
                :errorMsg="$t('paymentwidget.insert.error.company_id')"
                :placeholder="$t('paymentwidget.insert.placeholder.company_id')"
                v-model.trim="current.company_id"
                :rules="$v.current.company_id">
            </vca-input>
        </vca-field>
        <vca-field :label="$t('paymentwidget.insert.label.payments')">
            <vca-dropdown ref="type" :multiple="true" v-model="payment_type" :options="payment_types" :title="$t('paymentwidget.insert.title.payment_types')" :placeholder="$t('paymentwidget.insert.placeholder.payment_types')" :label="$t('paymentwidget.insert.label.payment_types')"/>
            <vca-dropdown ref="type" :multiple="true" v-model="subscription_type" :options="subscription_types" :title="$t('paymentwidget.insert.title.subscription_types')" :placeholder="$t('paymentwidget.insert.placeholder.subscription_types')" :label="$t('paymentwidget.insert.label.subscription_types')"/>

            <vca-card>
                <vca-money-input class="input-amount" ref="min_amount" v-model="min_amount" :money="min_amount" :rules="$v.current.min_amount" :errorMsg="$t('paymentwidget.insert.errorMsg.min_amount')" :topText="$t('paymentwidget.insert.topText.min_amount')"/>
            </vca-card>
            <vca-card>
                <vca-money-input class="input-amount" ref="default_amount" v-model="default_amount" :money="default_amount" :rules="$v.current.default_amount" :errorMsg="$t('paymentwidget.insert.errorMsg.default_amount')" :topText="$t('paymentwidget.insert.topText.default_amount')"/>
            </vca-card>

            <vca-number
                ref="pay_day"
                :errorMsg="$t('paymentwidget.insert.error.pay_day')"
                :placeholder="$t('paymentwidget.insert.placeholder.pay_day')"
                :max="31"
                :min="1"
                v-model="current.pay_day"
                :rules="$v.current.pay_day">
            </vca-number>
        </vca-field>

        <vca-field :label="$t('paymentwidget.insert.label.slider')">
            <vca-dropdown ref="type" v-model="slider_type" :options="slider_types" :title="$t('paymentwidget.insert.title.slider_types')" :placeholder="$t('paymentwidget.insert.placeholder.slider_types')" :label="$t('paymentwidget.insert.label.slider_types')"/>
            <vca-card>
                <vca-money-input class="input-amount" ref="slider_min" v-model="slider_min" :money="slider_min" :rules="$v.current.slider_min" :errorMsg="$t('paymentwidget.insert.errorMsg.slider_min')" :topText="$t('paymentwidget.insert.topText.slider_min')"/>
            </vca-card>
            <vca-card>
                <vca-money-input class="input-amount" ref="slider_max" v-model="slider_max" :money="slider_max" :rules="$v.current.slider_max" :errorMsg="$t('paymentwidget.insert.errorMsg.slider_max')" :topText="$t('paymentwidget.insert.topText.slider_max')"/>
            </vca-card>
            <vca-card>
                <vca-money-input class="input-amount" ref="slider_steps" v-model="slider_steps" :money="slider_steps" :rules="$v.current.slider_steps" :errorMsg="$t('paymentwidget.insert.errorMsg.slider_steps')" :topText="$t('paymentwidget.insert.topText.slider_steps')"/>
            </vca-card>
            <vca-card>
                <vca-money-input class="input-amount" ref="top_amount" v-model="top_amount" :money="top_amount" />
            </vca-card>
        </vca-field>

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
        return {}
    },
    computed: {
        share() {
            let idUrl = this.current ? this.current.id : ""
            return {
                url: idUrl,
                text: this.$t('team.invite'),
                media: ["clipboard"]
            }
        },
        current: {
            get () {
                return this.$store.state.paymentwidget.current
            },
            set (value) {
                this.$store.commit('paymentwidget/current', value)
            }
        },
        min_amount: {
            get () {
                return {'amount': this.$store.state.paymentwidget.current.min_amount, 'currency': 'EUR'}
            },
            set (value) {
                this.current.min_amount = Number.parseInt(value.amount)
                this.$store.commit('paymentwidget/current', this.current)
            }
        },
        default_amount: {
            get () {
                return {'amount': this.$store.state.paymentwidget.current.default_amount, 'currency': 'EUR'}
            },
            set (value) {
                this.current.default_amount = Number.parseInt(value.amount)
                this.$store.commit('paymentwidget/current', this.current)
            }
        },
        slider_min: {
            get () {
                return {'amount': this.$store.state.paymentwidget.current.slider.min, 'currency': 'EUR'}
            },
            set (value) {
                this.current.slider.min = Number.parseInt(value.amount)
                this.$store.commit('paymentwidget/current', this.current)
            }
        },
        slider_steps: {
            get () {
                return {'amount': this.$store.state.paymentwidget.current.slider.steps, 'currency': 'EUR'}
            },
            set (value) {
                this.current.slider.steps = Number.parseInt(value.amount)
                this.$store.commit('paymentwidget/current', this.current)
            }
        },
        slider_max: {
            get () {
                return {'amount': this.$store.state.paymentwidget.current.slider.max, 'currency': 'EUR'}
            },
            set (value) {
                this.current.slider.max = Number.parseInt(value.amount)
                this.$store.commit('paymentwidget/current', this.current)
            }
        },
        top_amount: {
            get () {
                return {'amount': this.$store.state.paymentwidget.current.top_amount, 'currency': 'EUR'}
            },
            set (value) {
                this.current.top_amount = Number.parseInt(value.amount)
                this.$store.commit('paymentwidget/current', this.current)
            }
        },
        payment_types: {
            get () {
                return this.$store.state.paymentwidget.current.payment_types == null ? [] : this.$store.state.paymentwidget.current.payment_types.filter((row) => {
                        row.value = row.name
                        row.title = this.$t(row.title)
                        row.subtitle = this.$t(row.subtitle)
                        row.label = this.$t(row.label)
                        return true;
                    });
            }
        },
        subscription_types: {
            get () {
                return this.$store.state.paymentwidget.current.subscription_types == null ? [] : this.$store.state.paymentwidget.current.subscription_types.filter((row) => {
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
                return this.$store.state.paymentwidget.current.payment_types == null ? [] : this.$store.state.paymentwidget.current.payment_types.filter((row) => {
                        let obj = this.$store.state.paymentwidget.payment_types.find(o => o.value === row.name || o.value === row.value);

                        if (obj == undefined) {
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
                let newCurrent = this.current
                newCurrent.payment_types = value
                this.$store.commit('paymentwidget/current', newCurrent)
            }
        },
        subscription_type: {
            get () {
                return this.$store.state.paymentwidget.current.subscription_types == null ? [] : this.$store.state.paymentwidget.current.subscription_types.filter((row) => {
                    let obj = this.$store.state.paymentwidget.subscription_types.find(o => o.value === row.name);
                    row.value = row.name
                    row.title = obj.title
                    row.subtitle = obj.subtitle
                    row.label = obj.label
                    return true;
                });
            },
            set (value) {
                let newCurrent = this.current
                newCurrent.subscription_types = value
                this.$store.commit('paymentwidget/current', newCurrent)
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
                return this.$store.state.paymentwidget.current.slider.name == null ? [] : this.$store.state.paymentwidget.slider_types.filter((row) => {
                    if (this.$store.state.paymentwidget.current.slider.name == row.value) {
                        return true;
                    }
                });
            },
            set (value) {
                let newCurrent = this.current
                newCurrent.slider.name = value[0].value
                this.$store.commit('paymentwidget/current', newCurrent)
            }
        }
    },
    validations: {
        current: {
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
            console.log("HERE")
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
