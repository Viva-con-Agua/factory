<template>
    <div class="content-text">
        <vca-card>
            <h2>{{ $t('page.company') }}</h2>

            <vca-accordion :header="$t('page.company.insert')">
                <div slot="body">
                    <InsertCompany />
                </div>
            </vca-accordion>
            <vca-accordion :header="$t('page.company.list')">
                <div slot="body">
                    <!--ListCompany />
                    
                    <vca-popup v-if="current!=null" :show="current!=null" :title="$t('event.popup.edit', {0: current.name})" @close="setCurrent()">
                        <UpdateCompany />
                    </vca-popup-->
                </div>
            </vca-accordion>
        </vca-card>
    </div>
</template>
<script>
import InsertCompany from '@/components/company/InsertCompany'
//import ListCompany from '@/components/company/ListCompany'
//import UpdateCompany from '@/components/apps/UpdateCompany'
import { mapGetters } from 'vuex'
export default {
    name: 'CompanyView',
    components: {
        InsertCompany,
        //ListCompany,
        //UpdateCompany,
    },
    computed: {
        ...mapGetters({
            current: 'company/current'
        })
    },
    created () {
        this.$store.dispatch({ type: "companyView"})
    },
    methods: {
        setCurrent() {
            this.$store.commit("company/current", null)
        }
    }
}

</script>

