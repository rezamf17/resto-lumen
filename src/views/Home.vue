<template>
  <div>
    <v-container>
      <v-alert type="error" v-model="alert" dismissible>
        Qty Cannot Be Null
      </v-alert>
      <v-card flat>
        <v-card-title
          >Menu List
          <v-spacer></v-spacer>
          <v-badge :content="messages" :value="messages" color="red" overlap>
            <v-btn @click="cartDialog = true">
              <v-icon large> mdi-cart </v-icon>
            </v-btn>
          </v-badge>
        </v-card-title>
        <v-row>
          <v-col
            md="4"
            v-for="item in menu"
            :key="item.id"
            class="d-flex flex-column"
          >
            <v-card>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-subtitle
                >Rp. {{ item.price | formatNumber }}
                <v-text-field
                  type="number"
                  required
                  v-model="item.qty"
                  outlined
                  label="Qty"
                  >1</v-text-field
                >
              </v-card-subtitle>
            </v-card>
            <v-card-actions>
              <v-btn @click="addCart(item)"> Add to cart </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>

      <v-dialog v-model="cartDialog" scrollable>
        <v-card>
          <v-form @submit.prevent="orderSubmit">
            <v-card-title>Cart Table</v-card-title>
            <v-card-text>
              <v-text-field
                outlined
                label="On Behalf Order"
                class="sm"
                v-model="customer_name"
              ></v-text-field>
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
                      <td>
                        {{ item.name }}
                        <v-text-field
                          :value="item.id"
                          v-model="cartItems.id_menu"
                          v-show="false"
                        ></v-text-field>
                      </td>
                      <td>
                        {{ item.price }}
                      </td>
                      <td>
                        <v-text-field :value="item.qty"></v-text-field>
                      </td>
                      <th>
                        <v-icon @click="removeCart(index)"> mdi-delete </v-icon>
                      </th>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-card-actions>
              Total : Rp.
              <v-text-field v-model="totalPrice"></v-text-field>
              <v-spacer></v-spacer>
              <v-btn @click="cartDialog = false"> close </v-btn>
              <v-btn color="warning" @click="clearCart"> clear cart </v-btn>
              <v-btn
                color="primary"
                @click.prevent="orderSubmit"
                type="submit"
              >
                order
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
var numeral = require("numeral");
import axios from "axios";
import Vue from "vue";
import swal from 'sweetalert';
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});
export default {
  name: "Home",
  data(item) {
    return {
      menu: [{ qty: 1 }],
      nav: true,
      cartItems: [],
      order : [
        {
          id_menu : item.id,
          qty : item.qty
          }
      ],
      customer_name: "",
      total_price : 0,
      id: "",
      name: "",
      price: "",
      qty: "",
      cartDialog: false,
      messages: 0,
      alert: false,
    };
  },
  methods: {
    async menuShow() {
      const response = await axios.get("menu");
      this.menu = response.data.data_menu;
    },
    addCart(item) {
      if (item.qty == null) {
        this.alert = true;
      } else {
        const myObject = {
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
        };
        this.cartItems.push(myObject);
        this.messages++;
      }
    },
    removeCart(index) {
      this.cartItems.splice(index, 1);
      this.messages--;
    },
    clearCart() {
      this.cartItems = [];
      this.messages = 0;
      this.cartDialog = false;
    },
    orderSubmit() {
      axios.post('/orders', {
        customer_name : this.customer_name,
        total_price : this.totalPrice,
        orders : this.cartItems
      }).then(() => {
        swal(`Your Order On Behalf ${this.customer_name} Is Successful. 
        Please Wait Until Waiters Deliver Your Order`);
      }).catch((e) =>{
        console.log(e)
      })
    },
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.cartItems.forEach((item) => {
        total += item.price * item.qty;
      });
      return total;
    },
  },
  mounted() {
    this.menuShow();
  },
};
</script>
