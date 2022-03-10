<template>
<v-app>
<nav>
    <h3>Welcome as{{user.name}}</h3>
</nav>

</v-app>

</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['user'])
    },
}
</script>