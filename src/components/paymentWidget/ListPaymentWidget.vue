<template>
    <div class="vca-table">
        <div class="vca-table-header">
            <div class="vca-table-cell"><label>uuid</label></div>
            <div class="vca-table-cell"><label>CRM_ID</label></div>
            <div class="vca-table-cell"><label>Name</label></div>
            <div class="vca-table-cell"><label>RedirectUrl</label></div>
            <div class="vca-table-cell"><label>LogoutUrl</label></div>
            <div class="vca-table-cell table-right"><span>Options</span></div>
        </div>
        <div v-for="element in list" :key="element.id" class="vca-table-row odd" @click="current(element)" title="Bearbeiten">
            <div class="vca-table-cell"><label>{{element.id}}</label></div>
            <div class="vca-table-cell"><label>{{element.crm_id}}</label></div>
            <div class="vca-table-cell"><label>{{element.name }}</label></div>
            <div class="vca-table-cell"><label>{{element.description }}</label></div>
            <div class="vca-table-cell"><label>{{element.invide_token }}</label></div>
            <div class="vca-table-cell"><label>{{ $t('actions.edit') }}</label></div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ListPaymentWidget',
    computed: {
        ...mapGetters({
            list: 'paymentwidget/list'
        })
    },
    methods: {
        current(value) {
            this.$store.commit("paymentwidget/current", value)
        }
    }
}

</script>
