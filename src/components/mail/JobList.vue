<template>
    <div class="vca-table">
        <div class="vca-table-header">
            <div class="vca-table-cell"><label>Name</label></div>
            <div class="vca-table-cell"><label>Case</label></div>
            <div class="vca-table-cell"><label>Scope</label></div>
            <div class="vca-table-cell table-right"><span>Options</span></div>
        </div>
        <div v-for="element in list" :key="element.id" class="vca-table-row odd" title="Bearbeiten">
            <div class="vca-table-cell"><label>{{element.name }}</label></div>
            <div class="vca-table-cell"><label>{{element.case }}</label></div>
            <div class="vca-table-cell"><label>{{element.scope }}</label></div>
            <div class="vca-table-cell table-right"><button @click="current(element)">Edit</button></div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ListApps',
    computed: {
        ...mapGetters({
            list: 'mail/job/list'
        })
    },
    methods: {
        current(value) {
            this.$store.commit("mail/job/current", value)
        }
    }
}

</script>
