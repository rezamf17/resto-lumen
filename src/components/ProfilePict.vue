<template>
    <div>
        <v-container>
            <v-card class="pa-md-4 mx-lg-auto">
                <v-card-title>Profile Picture</v-card-title>
                <v-card-text>
                    <v-file-input
                    label="Choose Avatar Pict"
                    filled
                    prepend-icon="mdi-camera"
                    v-model="image_name"
                    ></v-file-input>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click.prevent="submitImage">
                        change
                    </v-btn>
                    <v-btn text router to="/profile">
                        back
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            image_name : ''
        }
    },
    methods:{
        submitImage(){
            const bodyFormData = new FormData()
            bodyFormData.append("image_name", this.image_name)
            axios.post('api/changeImage', bodyFormData)
        }
    }
}
</script>
<style lang="">
    
</style>