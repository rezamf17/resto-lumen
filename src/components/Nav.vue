<template>
    <div>
        <router-link to="/" v-if="!user">Home |</router-link> 
      <router-link to="/login" v-if="!user">Login |</router-link> 
      <router-link to="/register" v-if="!user">Register |</router-link> 
      <router-link to="/about" v-if="!user">About |</router-link> 
      <a href="javascript:void(0)" @click.prevent="logout" v-if="user">Logout as {{user.name}}</a> 
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
    export default {
        name: 'Nav',
        methods:{
            logout(){
            localStorage.removeItem('token')
            this.$store.dispatch('user', null)
            this.$router.push('/')
        }
        },
        computed:{
            ...mapGetters(['user'])
        }
    }
</script>
    