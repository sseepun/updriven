<template>
    <TopNav />
    <div class="app-container">
        <div class="left-container">

        </div>

        <div class="right-container">

        </div>

        <div class="middle-container">
            <PostMultiple ref="posts" :typePost="true"/>
        </div>
    </div>
</template>

<script>
import TopNav from '../../components/TopNav';
import {mapGetters, mapActions, mapState} from "vuex"

export default {
    name: 'SearchPage',
    components: {
        TopNav
    },
    data() {
        return {
            
        }
    },
    created() {
        // this.searchPost()
    },
    computed: {
        ...mapGetters({

        })
    },
    methods: {
        ...mapActions({
            searchPost: 'search/searchPost',
        }),
    }
}
</script>
