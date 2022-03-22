<template>
  <v-container elevation-10 class="m-10">
    <v-card class="rounded-xl yellow lighten-1">
      <v-card-title> Dashboard Admin </v-card-title>
      <v-card-subtitle> Welcome back {{ user.name }} </v-card-subtitle>
    </v-card>
    <v-row class="mt-10 mb-10">
      <v-col>
        <v-card class="mx-auto rounded-xl yellow lighten-1" max-width="344">
          <v-card-text>
            <p class="text-h4 text--primary">Menu Manage</p>
            <p>You have {{menu_count}} menus in this system</p>
            <div class="text--primary">
              You can manage your menu here.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn router to="/menuManage" text color="deep-purple accent-4"> Learn More </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto rounded-xl yellow lighten-1" max-width="344">
          <v-card-text>
            <p class="text-h4 text--primary">Category Manage</p>
            <p>You have {{category_count}} category</p>
            <div class="text--primary">
              You can manage your category here
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn router to="/categoryManage" text color="deep-purple accent-4"> Learn More </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto rounded-xl yellow lighten-1" max-width="344">
          <v-card-text>
            <p class="text-h4 text--primary">Order</p>
            <p>You have {{order_count}} orders and {{customer_count}} customers data</p>
            <div class="text--primary">
                You can see and report your data order here
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn router to="/order" text color="deep-purple accent-4"> Learn More </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios'
export default {
    data(){
        return{
            menu_count : '',
            category_count : '',
            order_count : '',
            customer_count : '',
        }
    },
    methods:{
        async menuCount(){
            axios.get('api/count-menu').then((response) => {
                this.menu_count = response.data.total_menu
            }).catch((err) => {
                console.log(err)
            });
        },
        async categoryCount(){
            axios.get('api/count-category').then((response) => {
                this.category_count = response.data.total_category
            }).catch((err) => {
                console.log(err)
            });
        },
        async orderCount(){
            axios.get('api/count-order').then((response) => {
                this.order_count = response.data.total_order
            }).catch((err) => {
                console.log(err)
            });
        },
        async customerCount(){
            axios.get('api/count-customer').then((response) => {
                this.customer_count = response.data.total_customer
            }).catch((err) => {
                console.log(err)
            });
        },
    },
  computed: {
    ...mapGetters(["user"]),
  },
  created(){
      this.menuCount()
      this.categoryCount()
      this.orderCount()
      this.customerCount()
  }
};
</script>
