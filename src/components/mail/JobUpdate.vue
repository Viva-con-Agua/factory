<template>
    <vca-card>
        <h3>{{ $t('job.title') }} {{ current.name }} ({{current.id}})</h3>
        <div class="vca-column">
            <div class="vca-row inline-row">
                <vca-input :placeholder="$t('job.form.name')" :title="$t('job.form.name')" v-model="current.name"/>
                <vca-input :placeholder="$t('job.form.scope')" :title="$t('job.form.scope')" v-model="current.scope"/>
                <vca-input :placeholder="$t('job.form.case')" :title="$t('job.form.case')" v-model="current.case"/>
                <vca-input :placeholder="$t('job.form.email_id')" :title="$t('job.form.email_id')" v-model="current.email_id"/>
            </div>
            <p>{{ $t('job.templates') }}</p>
            <div class="vca-row">
                <vca-dropdown label="" :title="$t('job.form.template.title')" :placeholder="$t('job.form.template.title')" />
            </div>
            <vca-accordion :header="res.case" v-for="(res, index) in current.templates" :key="index">
                <div class="vca-column" slot="body">

                    <div class="vca-row inline-row">
                        <vca-input :placeholder="$t('job.form.template.case')" :title="$t('job.form.template.case')" v-model="res.case"/>
                        <vca-input :placeholder="$t('job.form.template.subject')" :title="$t('job.form.template.subject')" v-model="res.subject"/>
                        <vca-input :placeholder="$t('job.form.template.country')" :title="$t('job.form.template.country')" v-model="res.country"/>
                    </div>
                    <div>
                        <quill-editor v-model="htmlContents[res.country]"/>
                    </div>
                    
                </div>
            </vca-accordion>
            <div class="vca-right">
                <vca-cancel-button :title="$t('job.form.cancel')" @click="resetCurrent" class="">{{ $t('job.form.cancel') }}</vca-cancel-button>
                <vca-bordered-button :title="$t('job.form.save')" @submit="save" :placeholder="$t('job.form.save')"/>
            </div>
        </div>




    <!--table class="vca-table">
        <tr v-for="(res, index) in current.templates" :key="index">
            <td colspan="2">
                <table class="text-left vca-table">
                    <tr class="vca-table-row">
                        <td>Case: <vca-input v-model="res.case"/></td>
                        <td>Subject: <vca-input v-model="res.subject"/></td>
                        <td>Country: <vca-input v-model="res.country"/></td>
                    </tr>
                    <tr>
                        <td colspan="3">HTML:
                                    <quill-editor v-model="htmlContents[res.country]"/>
                            <vca-tabs>
                                <vca-tab title="Quill">
                                </vca-tab>
                                <vca-tab title="EmailEditor">
                                    <EmailEditor 
                                        ref="emailEditor" 
                                        :min-height="minHeight" />
                                </vca-tab>
                                <vca-tab title="Mosaico localhost">
                                    <iframe src="http://localhost:9006" width="100%" height="500px"></iframe>
                                </vca-tab>
                            </vca-tabs>
                          </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table-->

    </vca-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'JobUpdate',
    data() {
        return {
            minHeight: '1000px',
            htmlContents: {}
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
        save() {
            for (const [key, value] of Object.entries(this.htmlContents)) {
                let html = value
                if(!value.includes('<html')) {
                    console.log(key)
                    html = '<!DOCTYPE html><html lang="' + key + '"><head><meta charset="utf-8"></head><body>' + html + '</body></html>'
                    console.log(html)
                }
                console.log(this.toBinary(html))
            }


        },
        resetCurrent() {
            this.$store.commit("mail/job/current", null)
        },
        setHtmlContent() {
            this.current.templates.forEach((template) => {
                var converted = this.fromBinary(template.html)
                this.htmlContents[template.country] = converted
            })
        }
    }
}

</script>
<style lang="scss">
    .inline-row .vca-input {
        margin: 0 5px;
    }
</style>