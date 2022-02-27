<template>
  <v-app>

    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-app-bar-nav-icon @click="drawer = !drawer" v-if="user"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <Nav />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      class="teal"
      dark
      mini-variant
      mini-variant-width="100"
      app 
    >
    <v-list class="mt-15">
        <v-list-item class="mb-3">
          <v-btn text router to="/dashboard">
            <v-icon >mdi-home</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item class="mb-3">
          <v-btn text router to="/menuManage">
            <v-icon>mdi-pizza</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item class="mb-3">
          <v-btn text router to="/categoryManage">
            <v-icon>mdi-book</v-icon>
          </v-btn>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import Nav from '../src/components/Nav.vue'
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
  name: 'App',
  components :{
    Nav,
    // NavAdmin
  },
  data: () => ({
    drawer : true
  }),
   async created(){
       const response = await axios.get('api/profile', {
         headers:{
           Authorization : 'bearer' + localStorage.getItem('token')
         }
       })
       this.$store.dispatch('user', response.data.user)
        // this.user = response.data.user
    },
    computed:{
            ...mapGetters(['user'])
        }
};
</script>
