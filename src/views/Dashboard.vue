<template>
<div>
<h3>Welcome {{user.name}}</h3>
<NavAdmin />
</div>

</template>
<script>
// import axios from 'axios'
import NavAdmin from '../components/NavAdmin.vue'
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['user'])
    },
    components:{
        NavAdmin
    }
}
</script>