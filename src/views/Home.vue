<template>
  <div>
    <v-container>
      <v-card flat>
        <v-card-title
          >Menu List
          <v-spacer></v-spacer>
         <v-badge
          :content="messages"
          :value="messages"
          color="red"
          overlap
        >
          <v-btn @click="cartDialog = true">
            <v-icon large>
            mdi-cart
          </v-icon>
          </v-btn>
        </v-badge>
        </v-card-title>
        <v-row>
          <v-col
            md="4"
            v-for="(item) in menu"
            :key="item.id"
            class="d-flex flex-column"
          >
            <v-card>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-subtitle
                >Rp. {{ item.price | formatNumber }}
                <v-text-field 
                type="number" 
                value="1" 
                v-model="item.qty" 
                outlined
                label="Qty"
                ></v-text-field>
                </v-card-subtitle>
            </v-card>
            <v-card-actions>
              <v-btn @click="addCart(item)"> Add to cart </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>

      <v-dialog v-model="cartDialog">
        <v-card>
          <v-card-title>Cart Table</v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Menu Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cartItems" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.qty }}</td>
                    <th>
                      <v-icon @click="removeCart(index)"> mdi-delete </v-icon>
                    </th>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="cartDialog = false">
              close
            </v-btn>
            <v-btn color="warning" @click="clearCart">
              clear cart
            </v-btn>
            <v-btn color="primary">
              order
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
var numeral = require("numeral");
import axios from "axios";
import Vue from "vue";
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});
export default {
  name: "Home",
  data() {
    return {
      menu: [{qty : 1}],
      nav: true,
      cartItems: [],
      name: "",
      price: "",
      qty : '',
      cartDialog: false,
      messages : 0
    };
  },
  methods: {
    async menuShow() {
      const response = await axios.get("menu");
      this.menu = response.data.data_menu;
    },
    addCart(item) {
      const myObject = {
        name: item.name,
        price: item.price,
        qty : item.qty
      };
      this.cartItems.push(myObject);
      this.messages++
    },
    removeCart(index) {
      this.cartItems.splice(index, 1);
    },
    clearCart(){
      this.cartItems = [];
      this.messages = 0
      this.cartDialog = false
    }
  },
  mounted() {
    this.menuShow();
  },
};
</script>
