<template>
    <div>

        <vca-column>
            <vca-row>
                <div class="vca-card short">{{ $t('email.jobs.insert.label.name') }}</div>
                <div>
                    <vca-input :placeholder="$t('email.jobs.insert.placeholder.name')" :title="$t('email.jobs.insert.title.name')" v-model="current.name"/>
                </div>
            </vca-row>
            <vca-row>
                <div class="vca-card short">{{ $t('email.jobs.insert.label.email_id') }}</div>
                <div>
                    <vca-input :placeholder="$t('email.jobs.insert.placeholder.email_id')" :title="$t('email.jobs.insert.title.email_id')" v-model="current.email_id"/>
                </div>
            </vca-row>
            <vca-row>
                <div class="vca-card short">{{ $t('email.jobs.insert.label.case') }}</div>
                <div>
                    <vca-input :placeholder="$t('email.jobs.insert.placeholder.case')" :title="$t('email.jobs.insert.title.case')" v-model="current.case"/>
                </div>
            </vca-row>
            <vca-row>
                <div class="vca-card short">{{ $t('email.jobs.insert.label.scope') }}</div>
                <div>
                    <vca-input :placeholder="$t('email.jobs.insert.placeholder.scope')" :title="$t('email.jobs.insert.title.scope')" v-model="current.scope"/>
                </div>
            </vca-row>

            <vca-card>
                <h3>{{ $t('email.jobs.insert.title.templates') }}</h3>
                <vca-accordion :header=" $t('email.jobs.insert.label.templates', {0: res.case}) " v-for="(res, index) in current.templates" :key="index">
                    <vca-column slot="body">

                        <vca-row>
                            <div class="vca-card short">{{ $t('email.jobs.insert.label.template.case') }}</div>
                            <div>
                                <vca-input :placeholder="$t('email.jobs.insert..placeholder.case')" :title="$t('email.jobs.insert..title.case')" v-model="res.case"/>
                            </div>
                        </vca-row>
                        <vca-row>
                            <div class="vca-card short">{{ $t('email.jobs.insert.label.template.subject') }}</div>
                            <div>
                                <vca-input :placeholder="$t('email.jobs.insert.placeholder.template.subject')" :title="$t('email.jobs.insert.title.template.subject')" v-model="res.subject"/>
                            </div>
                        </vca-row>
                        <vca-row>
                            <div class="vca-card short">{{ $t('email.jobs.insert.label.template.country') }}</div>
                            <div>
                                <vca-input :placeholder="$t('email.jobs.insert.placeholder.template.country')" :title="$t('email.jobs.insert.title.template.country')" v-model="res.country"/>
                            </div>
                        </vca-row>

                        <div>
                            <quill-editor class="vca-quill" v-model="htmlContents[res.country]"/>
                        </div>
                        
                    </vca-column>
                </vca-accordion>

                <vca-accordion :header="$t('email.jobs.insert.label.template.add')">
                    <vca-column slot="body">

                        <vca-row>
                            <div class="vca-card short">{{ $t('email.jobs.insert.label.template.case') }}</div>
                            <div>
                                <vca-input :placeholder="$t('email.jobs.insert.placeholder.template.case')" :title="$t('email.jobs.insert.title.template.case')" v-model="newres.case"/>
                            </div>
                        </vca-row>
                        <vca-row>
                            <div class="vca-card short">{{ $t('email.jobs.insert.label.template.subject') }}</div>
                            <div>
                                <vca-input :placeholder="$t('email.jobs.insert.placeholder.template.subject')" :title="$t('email.jobs.insert.title.template.subject')" v-model="newres.subject"/>
                            </div>
                        </vca-row>
                        <vca-row>
                            <div class="vca-card short">{{ $t('email.jobs.insert.label.template.country') }}</div>
                            <div>
                                <vca-input :placeholder="$t('email.jobs.insert.placeholder.template.country')" :title="$t('email.jobs.insert.title.template.country')" v-model="newres.country"/>
                            </div>
                        </vca-row>
                        <h4>{{ $t('email.jobs.insert.label.template.html') }}</h4>
                        <vca-row>
                            <quill-editor class="vca-quill" v-model="newres.html"/>
                        </vca-row>
                        <vca-row>
                            <div class="vca-button" @click.self.prevent="addTemplate">{{ $t('email.jobs.insert.button.template.add') }}</div>
                        </vca-row>
                        


                    </vca-column>
                </vca-accordion>

            </vca-card>

            <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.update') }}</button>

            <div class="vca-center">
                <vca-cancel-button :placeholder="$t('actions.close')" @click="resetCurrent" />
            </div>
        </vca-column>




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

    </div>
</template>
<script>
export default {
    name: 'JobUpdate',
    data() {
        return {
            htmlContents: {},
            newres: {}
        }
    },
    computed: {
        current: {
            get () {
                return this.$store.state.mail.job.current
            },
            set (value) {
                this.$store.commit('mail/job/current', value)
            }
        }
    },
    created() {
        this.setHtmlContent()
    },
    methods: {
        save() {
            var convertedHtml = {}
            for (const [key, value] of Object.entries(this.htmlContents)) {
                let html = value
                if(!value.includes('<html')) {
                    html = '<!DOCTYPE html><html lang="' + key + '"><head><meta charset="utf-8"></head><body>' + html + '</body></html>'
                }
                convertedHtml[key] = this.toBinary(html)
            }

            this.current.templates = this.current.templates.map(
                (item) => {
                    item.html = convertedHtml[item.country]
                    return item;
                }
            )
            this.$store.dispatch({type: 'mail/job/update'})
                .then(() => {
                    this.$emit('success')
                })
                .catch((error) => {
                    console.log(error)
                })

        },
        addTemplate() {
            let obj = Object.assign(this.newres, {"html": this.toBinary(this.newres.html)})
            this.current.templates.push(obj)
            this.newres = {}
            this.setHtmlContent()
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

    .vca-quill {
        height: 100%;
    }
</style>