const pagination = {
    namespaced: true,
    state: () => ({
        pagination: {
            currentSort: 'distance',
            currentSortDir: 'asc',
            pageSize: 25,
            maxLength: 500,
            pageCount: 1,
            currentPageSize: 25,
            currentPage: 1,
            filter: '',
            cleanFilter: false,
            pages: 1,
            listLength: 1
        }
    }),
    mutations: {
        pagination(state, value) {
            state.pagination = value
            state.pagination.listLength = value.listLength
            state.pagination.pageSize = parseInt(value.pageSize) > state.maxLength ? state.maxLength : parseInt(value.pageSize)
            state.pagination.pageCount = value.listLength > 0 ? Math.ceil(value.listLength / state.pagination.pageSize) : 1
        },
        currentSort (state, value) {
            state.pagination.currentSort = value
        },
        currentSortDir (state, value) {
            state.pagination.currentSortDir = value
        },
        currentPageSize (state, value) {
            state.pagination.currentPageSize = (value > 0) ? value : 1
        },
        pageSize (state, value) {
            if (parseInt(value) > 0) {
                state.pagination.pageSize = parseInt(value) > state.pagination.maxLength ? state.pagination.maxLength : parseInt(value)
            } else {
                state.pagination.pageSize = 1
            }
            state.pagination.pageCount = state.pagination.listLength > 0 ? Math.ceil(state.pagination.listLength / state.pagination.pageSize) : 1
        },
        currentPage (state, value) {
            state.pagination.currentPage = value
        },
        pages (state, value) {
            state.pagination.pages = value
        },
        filter (state, value) {
            state.pagination.filter = value
        },
        listLength (state, value) {
            state.pagination.listLength = value
            state.pagination.page = value > 0 ? Math.ceil(value / state.pagination.pageSize) : 1
        },
        firstPage(state) {
            state.pagination.currentPage = 1;
        },
        lastPage(state) {
            state.pagination.currentPage = state.pagination.pageCount;
        },
        nextPage(state) {
            if((state.pagination.currentPage*state.pagination.pageSize) < state.pagination.listLength) state.pagination.currentPage++;
        },
        prevPage(state) {
            if(state.pagination.currentPage > 1) state.pagination.currentPage--;
        },
    },
    getters:{
        pagination(state) {
            return state.pagination
        },
        currentSort(state) {
            return state.pagination.currentSort
        },
        currentSortDir(state) {
            return state.pagination.currentSortDir
        },
        pageSize(state) {
            return state.pagination.pageSize
        },
        currentPage(state) {
            return state.pagination.currentPage
        },
        pages(state) {
            return state.pagination.pages
        },
        pageCount(state) {
            return state.pagination.pageCount
        },
        filter(state) {
            return state.pagination.filter
        },
        listLength(state) {
            return state.pagination.listLength
        }
    }
}

export default pagination
