<template>
<div>
    <vca-card>
        <InsertCampaign/>    
    </vca-card>
    <vca-card>
    <ListCampaign/>
</vca-card>
    </div>
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

