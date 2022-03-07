<template>
    <div>
        <v-container>
            <v-btn text @click="onDisabled">
                    <v-icon>mdi-pencil</v-icon>
                    Edit Profile
                </v-btn>
            <v-card width="400" class="pa-md-4 mx-lg-auto" :disabled="disable">
            <v-card-title>
                Profile Page
                <v-spacer></v-spacer>
                
            </v-card-title>
            <v-card-text >      
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            <v-avatar>
                        <img
                            :src="`${url}avatar/${profile.image.image_name}`"
                            :alt="image"
                        >
                        </v-avatar>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-btn text router to="/profilePict">
                                Change Profile Pict
                            </v-btn>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>Name :</v-list-item-content>
                        <v-list-item-content class="align-end">
                            <v-text-field
                            label="Name"
                            v-model="profile.name"></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>Email :</v-list-item-content>
                        <v-list-item-content class="align-end">
                            <v-text-field
                            label="Email"
                            v-model="profile.email"></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>Level User :</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{profile.level}}
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click.prevent="updateProfile">
                    Update
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert'
export default {
    props: ['url'],
    data(){
        return{
            profile : [],
            file : null,
            disable : true,
            rules : [
                        value => !value || value.size < 1000000 || 'Avatar size should be less than 1 MB!',
                    ],
        }
    },
    methods:{
        getProfile(){
            axios.get("api/profile").then((res) => {
                this.profile = res.data.user
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
        },
        updateProfile(){
            return axios.put('api/profile/' + this.profile.id, {
                name : this.profile.name,
                email : this.profile.email,
                image : this.profile.image,
                headers : {'Content-Type' : 'multipart/form-data'},
            },
            ).then(() => {
                swal({
                    title: "Update Success!",
                    text: "Update Profile Success!",
                    icon: "success",
                });
                this.dialog = true
                this.getProfile()
            }).catch((e) => {
                console.log(e)
            })
        },
        onChangeFile(event){
            this.file = event
            // console.log(event.name)
        },
        onDisabled(){
            this.disable = !this.disable
        }
    },
    mounted(){
        this.getProfile()
    },
}
</script>