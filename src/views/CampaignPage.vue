<template>
    <vca-card>
        <h2>{{ $t('page.campaign') }}</h2>
        <InsertCampaign/>    
        <ListCampaign/>
    </vca-card>
</template>
<script>
import InsertCampaign from '@/components/campaign/InsertCampaign'
import ListCampaign from '@/components/campaign/ListCampaign'
import { mapGetters } from 'vuex'
export default {
    name: 'CampaignPage',
    components: {
        InsertCampaign,
        ListCampaign,
    },
    computed: {
        ...mapGetters({
            current: 'campaign/current'
        })
    },
    created () {
        this.$store.dispatch({ type: "campaign/list"})
    }
}

</script>

