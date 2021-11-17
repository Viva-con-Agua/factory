<template>
    <div class="content-text">
        <vca-card>
            <h2>{{ $t('page.campaign') }}</h2>
            <vca-accordion :header="$t('events.title.insert')">
                <div slot="body">
                    <InsertCampaign/>
                </div>
            </vca-accordion>
            <vca-accordion :header="$t('events.title.list')">
                <div slot="body">
                    <ListCampaign />
                    
                    <vca-popup v-if="current!=null" :show="current!=null" :title="$t('events.popup.edit', {0: current.name})" @close="setCurrent()">
                        <UpdateCampaign />
                    </vca-popup>
                </div>
            </vca-accordion>
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
    },
    methods: {
        setCurrent() {
            this.$store.commit("campaign/current", null)
        }
    }
}

</script>

