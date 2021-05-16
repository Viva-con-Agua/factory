<template>
    <vca-card class="content-text">
        <h2>{{ $t('page.campaign') }}</h2>
        <InsertCampaign v-if="flow=='insert'"/>
        <UpdateCampaign v-if="flow=='edit'"/>
        <ListCampaign @edit="flow='edit'"/>
    </vca-card>
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
    data() {
        return {
            flow: 'insert'
        }
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

