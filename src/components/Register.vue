<template>
    <form @submit.prevent="registerSubmit">
        <input type="text" placeholder="name" v-model="form.name"> <br>
        <input type="email" placeholder="email" v-model="form.email"> <br>
        <input type="password" placeholder="password" v-model="form.password"> <br>
        <button type="submit">Register</button>
    </form>
</template>
<script>
import axios from 'axios'
    export default {
        data() {
            return{
                form : {
                    name : '',
                    email : '',
                    password : ''
                }
            }
        },
        methods:{
            async registerSubmit(){
                await axios.post('api/register', this.form)
                this.$router.push({name : 'Login'})

            }
        }
        
    }
</script>