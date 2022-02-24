<template>
    <form @submit.prevent="loginSubmit">
        <input type="email" placeholder="email" v-model="email"> <br>
        <input type="password" placeholder="password" v-model="password"> <br>
        <button type="submit">Login</button>
    </form>
</template>
<script>
import axios from 'axios'
    export default {
        name : 'Login',
        data() {
            return{
                    email : '',
                    password : ''
            }
        },
        methods:{
             async loginSubmit(){
                const response = await axios.post('api/login', {
                    email : this.email,
                    password : this.password
                })
                // console.log(response)
                localStorage.setItem('token', response.data.token)
                this.$store.dispatch('user', response.data.user)
                this.$router.push({name : 'Dashboard'})
            }
        }

    }
</script>