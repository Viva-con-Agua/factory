<template>
    <div class="content-text">
        <vca-card>
            <h2>{{ $t('page.paymentwidget') }}</h2>

            <vca-accordion :header="$t('paymentwidget.title.insert')">
                <div slot="body">
                    <InsertPaymentWidget/>
                </div>
            </vca-accordion>
            <vca-accordion :header="$t('paymentwidget.title.list')">
                <div slot="body">
                     <ListPaymentWidget />
                    
                    <vca-popup v-if="current!=null" :show="current!=null" :title="$t('paymentwidget.popup.edit', {0: current.name})" @close="setCurrent()">
                        <UpdatePaymentWidget />
                    </vca-popup>
                </div>
            </vca-accordion>
        </vca-card>
    </div>
</template>
<script>
import InsertPaymentWidget from '@/components/paymentWidget/InsertPaymentWidget'

import UpdatePaymentWidget from '@/components/paymentWidget/UpdatePaymentWidget'
import ListPaymentWidget from '@/components/paymentWidget/ListPaymentWidget'
import { mapGetters } from 'vuex'
export default {
    name: 'PaymentWidgetPage',
    components: {
        InsertPaymentWidget,
        ListPaymentWidget,
        UpdatePaymentWidget
    },
    computed: {
        ...mapGetters({
            current: 'paymentwidget/current'
        })
    },
    created () {
        this.$store.dispatch({ type: "payment_widget_page"})
    },
    methods: {
        setCurrent() {
            this.$store.commit("paymentwidget/current", null)
        }
    }
}

</script>
<style lang="scss">
    .input-amount {
        @include media(large) {
            width: 50%;
            .vca-input-label {
                min-width: 50%;
            }
        }
    }
</style>