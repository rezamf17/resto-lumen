<template>
<v-card max-width="400px" class="mx-auto mt-10">
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
            <v-text-field
            label="Password Confirmation"
            placeholder="Enter Password Confirmation"
            type="password"
            v-model="form.password_confirmation"
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
import swal from 'sweetalert'
import axios from 'axios'
    export default {
        data() {
            return{
                form : {
                    name : '',
                    email : '',
                    password : '',
                    password_confirmation : '',
                }
            }
        },
        methods:{
            async registerSubmit(){
                try {
                    await axios.post('api/register', this.form)
                    this.$router.push({name : 'Login'})
                    swal("Register Success!, Please Login with your own account")
                } catch (error) {
                    swal("Register Failed", "Please Check again your form" ,"warning");
                }
            }
        }
        
    }
</script>