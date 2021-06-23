<template>
    <vca-card class="content-text">
        <h2>{{ $t('page.campaign') }}</h2>
        <InsertPaymentWidget/>
         <ListPaymentWidget />
        <!--UpdateCampaign v-if="current!=null"/-->
    </vca-card>
</template>
<script>
import InsertPaymentWidget from '@/components/paymentWidget/InsertPaymentWidget'

//import UpdateCampaign from '@/components/campaign/UpdateCampaign'
import ListPaymentWidget from '@/components/paymentWidget/ListPaymentWidget'
import { mapGetters } from 'vuex'
export default {
    name: 'PaymentWidgetPage',
    components: {
        InsertPaymentWidget,
        ListPaymentWidget,
        //UpdateCampaign
    },
    computed: {
        ...mapGetters({
            current: 'campaign/current'
        })
    },
    created () {
        this.$store.dispatch({ type: "payment_widget_page"})
    }
}

</script>

