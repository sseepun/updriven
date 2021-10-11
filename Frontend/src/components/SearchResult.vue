<template>
    <div v-if="user">
        <div v-if="title" :key="title" class="post-header pt-1 pb-1 mt-6">
            <Avatar v-if="icon" :avatar="icon" classer="lg" />
            <div class="text-container">
                <h6 class="h4 fw-500">
                {{title}}
                </h6>
            </div>
        </div>
        <div class="grids" :key="title">
            <div v-for="post in getSearchResult" :key="post.id" class="grid sm-100">
                <PostSingle :post="post"/>
            </div>
        </div>
        <div 
            class="h5 fw-600 color-mgray text-center text-center" 
            style="padding:2rem 0 2.5rem 0;"
        >
            <div ref="lazyLoadPosts">Loading...</div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from "vuex"

export default {
    name: 'SearchResult',
    computed: {
        ...mapGetters({
            user: 'authentication/user',
            getStatusPaginate: 'search/getStatusPaginate',
            getSearchResult: 'search/getSearchResult',
            isLoading: 'search/isLoading',
        })
    },
    data() {
        return {
            title: null,
            icon: null,
        }
    },
    methods: {
        onScroll() {
            var lazyLoadPosts = this.$refs['lazyLoadPosts'];
            if(lazyLoadPosts){
                var top = lazyLoadPosts.getBoundingClientRect().top;
                var innerHeight = window.innerHeight;
                if(top - innerHeight < 2000) {
                    if(this.getStatusPaginate.hasNext == true) {
                        if ( this.isLoading == false) {
                            this.searchPost()
                        }
                        lazyLoadPosts.innerHTML = 'Loading...';
                    } else if (this.getStatusPaginate.hasNext == false) {
                        lazyLoadPosts.innerHTML = 'That’s All For New Content';
                    }
                }
            }
        },

        updateCategory(tab) {
            this.title = tab.title;
            this.icon = tab.icon;
            window.scrollTo(0,0);
            this.posts = [];
            this.searchPost()
        },

        ...mapActions({
            searchPost: 'search/searchPost',
        })
    },
    created() {
        // this.selectFetchOption()
    },
    mounted() {
        this.$nextTick(function(){
            window.addEventListener('scroll', this.onScroll);
            // this.fetchPostOwner();
        });
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    } 
}
</script>