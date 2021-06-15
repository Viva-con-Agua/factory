<template>
    <div class="content-text">
        <vca-card>
            <h2>{{ $t('page.campaign') }}</h2>
            <InsertCampaign/>
            <ListCampaign />
            <UpdateCampaign v-if="current!=null"/>
        </vca-card>
    </div>
</template>
<script>
import InsertCampaign from '@/components/campaign/InsertCampaign'
import UpdateCampaign from '@/components/campaign/UpdateCampaign'
import ListCampaign from '@/components/campaign/ListCampaign'
import { mapGetters } from 'vuex'
export default {
    name: 'CampaignPage',
    components: {
        InsertCampaign,
        ListCampaign,
        UpdateCampaign
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

