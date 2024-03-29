<template>
    <div class="table-container">
        <h3>{{ $t('email.jobs.list.label') }}</h3>
        <p v-html="$t('email.jobs.list.description')"></p>
        <table class="table-desktop">
            <colgroup>
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
                <col width="1%" />
            </colgroup>
            <thead>
                <table-header-pagination :placeholder="$t('email.jobs.list.search')" :store="store" :colspan="colspan" />

                <tr class="vca-table-header">
                    <th class="vca-table-cell sortable" @click="sort('id')"><label>{{ $t('table.header.uuid') }} &varr;</label></th>
                    <th class="vca-table-cell sortable" @click="sort('name')"><label>{{ $t('email.jobs.list.name') }} &varr;</label></th>
                    <th class="vca-table-cell sortable" @click="sort('case')"><label> {{ $t('email.jobs.list.case') }} &varr;</label></th>
                    <th class="vca-table-cell sortable" @click="sort('scope')"><label>{{ $t('email.jobs.list.scope') }} &varr;</label></th>
                    <th class="vca-table-cell sortable" @click="sort('template_count')"><label>{{ $t('email.jobs.list.templates') }} &varr;</label></th>
                    <th class="vca-table-cell"><label>{{ $t('table.header.options') }}</label></th>
                </tr>

            </thead>
            <tbody>
                <table-content-prev :store="store" :colspan="colspan" />
                <table-border :colspan="colspan"/>

                <tr class="vca-table-row editable" @click="setCurrent(res)" :class="{last: (index + 1 == pg.pageSize)}" v-for="(res, index) in getList()" :key="index">
                    <td class="vca-table-cell"><label> {{ res.id }} </label></td>
                    <td class="vca-table-cell"><label> {{ res.name }} </label></td>
                    <td class="vca-table-cell"><label> {{ res.case }} </label></td>
                    <td class="vca-table-cell"><label> {{ res.scope }} </label></td>
                    <td class="vca-table-cell"><label> {{ res.template_count }} <div class="inline-infobox" style="color: black;"><vca-info-box>{{ getTemplates(res) }}</vca-info-box></div></label></td>
                    <td class="vca-table-cell"><label><img class="editable" src="@/assets/icons/edit.png" title="Edit" alt="Edit"/></label></td>
                </tr>
                <tr class="vca-table-row last" v-if="getList().length == 0">
                    <td :colspan="colspan"><p class="text-center">{{ $t('table.page.no_results') }}</p></td>
                </tr>

                <table-border :colspan="colspan"/>
                <table-content-next :store="store" :colspan="colspan" />
                <table-border :colspan="colspan"/>
                <table-bottom-pagination :store="store" :colspan="colspan" />
            </tbody>
        </table>

        <table class="table-mobile">
            <colgroup>
                <col width="100%" />
            </colgroup>
            <thead>
                <table-search :store="store" :placeholder="$t('email.jobs.list.search')" />

                <tr class="vca-table-nav">
                    <td class="text-right vca-table-sort vca-table-nav-cell">
                        <div class="vca-row text-center">
                            <div><img src="~@/assets/icons/sort.png"></div>
                            <div class="sortable" @click="sort('name')"><label>{{ $t('email.jobs.list.name') }}</label></div>
                            <div class="sortable" @click="sort('case')"><label>{{ $t('email.jobs.list.case') }}</label></div>
                            <div class="sortable" @click="sort('scope')"><label>{{ $t('email.jobs.list.scope') }}</label></div>
                        </div>
                    </td>
                </tr>

            </thead>
            <tbody>
                <table-content-prev :store="store" />
                <table-border/>

                <tr class="vca-table-row" :class="{last: (index + 1 == pg.pageSize)}" v-for="(res, index) in getList()" :key="index">
                    <td class="vca-table-cell" >
                    <div class="vca-row">
                        <div class="vca-left vca-table-index">
                            <h3>{{ res.rank }}</h3>
                        </div>
                        <div class="vca-column vca-table-content text-left">
                            <h3>{{ res.name }}</h3>
                            <div>
                                <label> {{ res.case }} </label> <label> {{ res.scope }}</label> 
                            </div>
                        </div>
                    </div>
                    </td>
                </tr>
                <tr class="vca-table-row last" v-if="getList().length == 0">
                    <td><p class="text-center">{{ $t('table.page.no_results') }}</p></td>
                </tr>

                <table-border/>
                <table-content-next :store="store" />
                <table-border/>
                <table-bottom-pagination :store="store" />
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
    name: 'ListApps',
        data() {
        return {
            colspan: 6,
            store: 'mail/job/pg'
        }
    },
    watch: {
        pg: {
            handler(val) {
                this.$store.commit(this.store + '/pagination', val)
            },
            deep: true
        }
    },
    computed: {
        ...mapState({
            pg (state, getters) {
                if (this.store) {
                    return getters[`${this.store}/pagination`]
                }
            }
        }),
        ...mapGetters({
            list: 'mail/job/list',
            current: 'mail/job/current'
        })
    },
    methods: {
        getTemplates(job) {
            return job.templates.map(a => a.country).join(', ')
        },
        setCurrent(value) {
            if (this.current && this.current.id == value.id) {
                this.$store.commit("mail/job/current", null)
            } else {
                this.$store.commit("mail/job/current", value)
            }
            
        },
        getList() {
            // If the list is empty, we have an empty array
            if (!this.list) {
                return []
            }

            // If the current page is out of scope, set it to last page
            if (this.pg.currentPage > this.pg.pageCount) {
                this.$store.commit(this.store + '/prevPage')
            }

            // Create a list for filtering and start filtering
            var filteredList = this.list
            filteredList = filteredList.filter((row, index) => {
                // Add a rank to the current entry
                row.rank = index + 1

                row.template_count = row.templates.length
                // If the filter is empty, everything is fine
                if(!this.pg.filter || this.pg.filter == '') {
                    return true
                }
                // Set cleanFilter when start filtering, so we can reproduce the size of the list, if the filtering is reset
                if (!this.pg.cleanFilter) {
                    this.pg.cleanFilter = true
                }
                // Filter for the current value of row.team_name
                return row.name.toLowerCase().indexOf(this.pg.filter.toLowerCase()) > -1
            });

            // Set the length of the list to the current filtered list
            this.pg.listLength = (filteredList.length == 0) ? 1 : filteredList.length

            if (filteredList.length > 0 && this.pg.listLength < this.pg.pageSize) {
                // If the length is smaller than the current page size, we adjust the pagesize to the length of the filtered list
                this.pg.pageSize = this.pg.listLength
            } else if (this.pg.pageSize <= this.pg.listLength && this.pg.filter == '' && this.pg.cleanFilter) {
                // The cleanfilter is set and the filter is empty, this means we have to reset the list length to the original size we stored previously
                this.pg.cleanFilter = false
                this.pg.pageSize = this.pg.currentPageSize
            }

            // Now we filter the list to the current pageSize and paginate it
            return filteredList.filter((row, index) => {
                    let start = (this.pg.currentPage - 1) * this.pg.pageSize;
                    let end = this.pg.currentPage * this.pg.pageSize;
                    if(index >= start && index < end) return true;
                }
            );
        },
        sort(col) {
            // When sorting, we set the current page to 1
            this.$store.commit(this.store + '/firstPage')

            // If we have an empty list, return an empty array
            if (!this.list) {
                return []
            }

            // Define the sorting direction, if current sort is the same as the column to sort, then switch direction
            if (this.pg.currentSort === col) {
                this.pg.currentSortDir = this.pg.currentSortDir === "asc" ? "desc" : "asc";
            } else {
                this.pg.currentSort = col;
            }

            // Sort the list depending on the column and the direction
            this.list.sort((a,b) => {
                // Set 0 at the end
                if (parseInt(a[this.pg.currentSort]) == 0) return 1;
                if (parseInt(b[this.pg.currentSort]) == 0) return -1;

                // Comapre integer values
                if (a[this.pg.currentSort] === parseInt(a[this.pg.currentSort], 10) ||
                    a[this.pg.currentSort] === parseFloat(a[this.pg.currentSort], 10)
                    ) {
                    return (this.pg.currentSortDir === 'desc') ? a[this.pg.currentSort] - b[this.pg.currentSort] : b[this.pg.currentSort] - a[this.pg.currentSort]
                }
                
                // Compare string values
                let modifier = 1;
                if(this.pg.currentSortDir === 'desc') modifier = -1;
                if(a[this.pg.currentSort].toLowerCase() < b[this.pg.currentSort].toLowerCase()) return -1 * modifier;
                if(a[this.pg.currentSort].toLowerCase() > b[this.pg.currentSort].toLowerCase()) return 1 * modifier;
                return 0;
            });
        }
    }
}

</script>
