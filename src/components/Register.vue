<template>
<v-card width="40%" class="mx-auto mt-10">
    <v-card-title>Register</v-card-title>
    <v-card-text>
        <v-form @submit.prevent="registerSubmit">
            <v-text-field
            label="Name"
            placeholder="Enter Name"
            type="text"
            v-model="form.name"
            outlined
            ></v-text-field>
            <v-text-field
            label="Email"
            placeholder="Enter Email"
            type="email"
            v-model="form.email"
            outlined
            ></v-text-field> 
            <v-text-field
            label="Password"
            placeholder="Enter Password"
            type="password"
            v-model="form.password"
            outlined
            ></v-text-field> 
            <v-card-actions>
                <v-btn color="success" type="submit">
                    Register
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card-text>
</v-card>
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