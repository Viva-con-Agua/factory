<template>
    <div class="vca-table">
        <div class="vca-table-header">
            <div class="vca-table-cell"><label>uuid</label></div>
            <div class="vca-table-cell"><label>Name</label></div>
            <div class="vca-table-cell"><label>RedirectUrl</label></div>
            <div class="vca-table-cell"><label>LogoutUrl</label></div>
            <div class="vca-table-cell table-right"><span>Options</span></div>
        </div>
        <div v-for="element in list" :key="element.id" class="vca-table-row odd" title="Bearbeiten">
            <div class="vca-table-cell"><label>{{element.id}}</label></div>
            <div class="vca-table-cell"><label>{{element.app_name }}</label></div>
            <div class="vca-table-cell"><label>{{element.redirect_url }}</label></div>
            <div class="vca-table-cell"><label>{{element.logout_url }}</label></div>
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
            list: 'app/list'
        })
    },
    methods: {
        current(value) {
            this.$store.commit("app/current", value)
        }
    }
}

</script>
