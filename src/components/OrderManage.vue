<template lang="">
    <v-container>
        <v-card>
          <v-card-title>
            Order Manage
          </v-card-title>
          <v-card-subtitle>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-subtitle>
          <v-card-text>
      <v-data-table
      :headers="headers"
      :items="customers"
      :items-per-page="10"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ item.customer_name }}</td>
          <td>Rp. {{ item.total_price }}</td>
          <th>
            <v-icon @click="view(item)">mdi-eye</v-icon>
            <v-icon @click.prevent="deleteCustomer(item)">mdi-delete</v-icon>
          </th>
        </tr>
      </template>
    </v-data-table>
          </v-card-text>
        </v-card>
      <v-dialog
      v-model="viewOrder"
      >
      <v-card>
        <v-card-title>
          Detail Order
        </v-card-title>
        <v-card-text>
          <!-- <v-text-field
            v-model="id"
            label="Id"
          ></v-text-field> -->
          <v-text-field
            v-model="customer"
            label="On Behalf Name"
          ></v-text-field>
          <!-- {{dataDetailOrder}} -->
          <v-simple-table dense>
              <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Menu Items
                  </th>
                  <th class="text-left">
                    Qty
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item) in dataDetailOrder"
                  :key="item.id"
                >
                  <td>{{ item.menus.name }}</td>
                  <td>{{ item.qty }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="viewOrder = false">close</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-container>
</template>
<script>
import axios from "axios";
import swal from 'sweetalert'
export default {
  data() {
    return {
      search: "",
      showOrder: false,
      customers: [],
      viewOrder : false,
      id : '',
      customer : '',
      dataDetailOrder : [],
      headers: [
        { text: "No", value: "indexOf(item.id)" },
        { text: "Customer Name", value: "customer_name" },
        { text: "Total Price", value: "total_price" },
        { text: "Actions" },
      ],
    };
  },
  
  methods: {
    async getCustomer(){
      await axios
      .get("api/getCustomers")
      .then((response) => {
        this.customers = response.data.data_customer;
      })
      .catch((e) => {
        console.log(e);
      });
    },
    view(item){
      this.id = item.id
      this.customer = item.customer_name
      axios.get('api/getDetailOrder/' + this.id).then(response => {
        this.viewOrder = true
        this.dataDetailOrder = response.data.data_order
      }).catch(e => {
        console.log(e)
      })
    },
    deleteCustomer(item) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data order!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete("api/deleteCustomers/" + item.id);
          let index = this.customers.indexOf(item);
          this.customers.splice(index, 1);
          swal("Data order has been deleted!", {
            icon: "success",
          });
        } else {
            swal("Your data order is safe!");
        }
          this.getCustomer();
      });
    },
  },
  created(){
    this.getCustomer()
    this.view()
  }
};
</script>