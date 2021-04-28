<template>
    <table class="vca-table">
        <tr>
            <td>Id</td>
            <td>{{ current.id }}</td>
        </tr>
        <tr>
            <td>Name</td>
            <td><vca-input v-model="current.name"/></td>
        </tr>
        <tr>
            <td>Scope</td>
            <td><vca-input v-model="current.scope"/></td>
        </tr>
        <tr>
            <td>Case</td>
            <td><vca-input v-model="current.case"/></td>
        </tr>
        <tr>
            <td>E-Mail UUID</td>
            <td><vca-input v-model="current.email_id"/></td>
        </tr>
        <tr v-for="(res, index) in current.templates" :key="index">
            <td colspan="2">
                <table class="text-left vca-table">
                    <tr class="vca-table-row">
                        <td>Case: <vca-input v-model="res.case"/></td>
                        <td>Subject: <vca-input v-model="res.subject"/></td>
                        <td>Country: <vca-input v-model="res.country"/></td>
                    </tr>
                    <tr>
                        <td colspan="3">HTML: <vca-textarea v-model="htmlContents[res.country]"></vca-textarea></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'JobUpdate',
    data() {
        return {
            htmlContents: []
        }
    },
    computed: {
        ...mapGetters({
            current: 'mail/job/current'
        })
    },
    created() {
        this.setHtmlContent()
    },
    methods: {
        setHtmlContent() {
            this.current.templates.forEach((template) => {
                var converted = this.fromBinary(template.html)
                this.htmlContents[template.country] = converted
            })
        },
        getHtml(bin) {
            return atob(bin)
        }
    }
}

</script>
