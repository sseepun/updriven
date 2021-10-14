<template>
    <TopNav />
    <div class="app-container">
        <div class="left-container">
            <div class="wrapper" data-simplebar>
                <LeftNav @on-click="(tab) => onClickTab(tab)" />
            </div>
        </div>

        <div class="right-container">
            <SectionSponsored />
            {{ searchResult }}
        </div>

        <div class="middle-container">
            <SearchResult ref="search"/>
        </div>
    </div>
</template>

<script>
import TopNav from '../../components/TopNav';
import LeftNav from '../../components/LeftNav';
import SearchResult from '../../components/SearchResult';
import SectionSponsored from '../../components/SectionSponsored';
import {mapGetters, mapActions, mapState} from "vuex"

export default {
    name: 'SearchPage',
    components: {
        TopNav,
        LeftNav,
        SearchResult,
        SectionSponsored,
    },
    data() {
        return {
            
        }
    },
    created() {
        AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    },
    computed: {
        ...mapGetters({
            searchResult: 'search/getSearchResult',
        })
    },
    methods: {
        ...mapActions({
            searchPost: 'search/searchPost',
        }),

        onClickTab(tab) {
            if ( tab.link=='javascript:' ) {
                this.$refs['search'].updateCategory(tab);
            } else {
                window.location.href = tab.link;
            }
        },
    }
}
</script>
