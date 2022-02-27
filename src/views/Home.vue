<template>
  <v-container>
    <v-card flat>
      <v-card-title>Menu List</v-card-title>
                <v-row>
                    <v-col md="4" v-for="item in menu" :key="item.id"
                           class="d-flex flex-column" >
                        <v-card>
                            <v-card-title>{{item.name}}</v-card-title>
                            <v-card-subtitle>Rp. {{item.price | formatNumber}}</v-card-subtitle>
                        </v-card>
                        <v-card-actions>
                            <v-btn>
                                Add to cart
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-card>
  </v-container>
</template>

<script>
var numeral = require('numeral');
import axios from 'axios'
import Vue from 'vue'
Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
  });
  export default {
    name: 'Home',
    data(){
      return{
        menu : ''
      }
    },
    methods:{
      async menuShow(){
        const response = await axios.get('menu')
        this.menu = response.data.data_menu
      }
    },
    mounted(){
      this.menuShow()
    },
    components: {
      // HelloWorld,
    },
  }
</script>
