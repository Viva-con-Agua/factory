<template>
    <div class="content-text">
        <vca-card>
            <h2>{{ $t('page.apps') }}</h2>

            <vca-accordion :header="$t('app.title.insert')">
                <div slot="body">
                    <InsertApp/>
                </div>
            </vca-accordion>
            <vca-accordion :header="$t('app.title.list')">
                <div slot="body">
                    <ListApps />
                    
                    <vca-popup v-if="current!=null" :show="current!=null" :title="$t('event.popup.edit', {0: current.name})" @close="setCurrent()">
                        <UpdateApp />
                    </vca-popup>
                </div>
            </vca-accordion>
        </vca-card>
    </div>
</template>
<script>
import InsertApp from '@/components/apps/InsertApp'
import ListApps from '@/components/apps/ListApps'
import UpdateApp from '@/components/apps/UpdateApp'
import { mapGetters } from 'vuex'
export default {
    name: 'Applications',
    components: {
        InsertApp,
        ListApps,
        UpdateApp,
    },
    computed: {
        ...mapGetters({
            current: 'app/current'
        })
    },
    created () {
        this.$store.dispatch({ type: "app/list"})
    },
    methods: {
        setCurrent() {
            this.$store.commit("app/current", null)
        }
    }
}

</script>

