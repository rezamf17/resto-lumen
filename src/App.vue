<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>
<script>
  import Nav from './components/Nav.vue'
  import axios from 'axios'
  export default {
    components:{
      Nav
    },
    async created(){
       const response = await axios.get('api/profile', {
         headers:{
           Authorization : 'bearer' + localStorage.getItem('token')
         }
       })
       this.$store.dispatch('user', response.data.user)
        // this.user = response.data.user
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
