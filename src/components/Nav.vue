<template>
    <div>
        <v-btn text router to="/" v-if="!user">
            Home
        </v-btn>
        <v-btn text router to="/login"  v-if="!user">
            Login
        </v-btn>
        <v-btn text router to="/register"  v-if="!user">
            Register
        </v-btn>
        <v-btn text router to="/about"  v-if="!user">
            About
        </v-btn>
         <v-btn text @click.prevent="logout" v-if="user">
            Logout
            </v-btn>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
    export default {
        name: 'Nav',
        data(){
            return{

            }
        },
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
    