<template>
</template>

<script>
import {mapGetters, mapActions, mapState} from "vuex"
export default {
    name: 'AuthSuccess',
    computed: {
        ...mapGetters({

        })
    },
    methods: {
        ...mapActions({
            checkAuth: 'authentication/checkAuth'
        }),
    },
    created() {
        this.checkAuth(this.$route.params.id).then( () => {
          this.$router.push({ 
            name: 'UserDashboardPage'
          });
        }).catch( err => {
            
        })
    }
}
</script>