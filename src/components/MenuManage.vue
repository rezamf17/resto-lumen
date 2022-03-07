<template>
  <v-card width="70%" style="margin-left: 15%" class="mt-10">
    <v-dialog v-model="dialogEdit">
      <v-card>
        <v-card-title>Edit Menu</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-10">
          <form @submit.prevent="updateMenu">
            <input type="hidden" v-model="form.e_id" />
            <v-text-field
              v-model="form.e_name"
              label="Menu Name"
              solo
              clearable
              required
            ></v-text-field>
            <v-select
              :items="category"
              item-text="category_name"
              item-value="id"
              label="Category"
              solo
              required
              v-model="form.e_id_category"
            ></v-select>
            <v-text-field
              v-model="form.e_price"
              solo
              type="number"
              label="Prices"
              clearable
              required
            ></v-text-field>
            <button type="submit" style="display: none">Submit</button>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialogEdit = false" color="blue darken-1">
            Close
          </v-btn>
          <v-btn text @click.prevent="updateMenu" color="blue darken-1">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
          Add Menu
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Add New Menu</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px" class="mt-10">
          <v-form @submit.prevent="addMenu">
            <v-text-field
              v-model="form.name"
              solo
              label="Menu Name"
              clearable
              required
            ></v-text-field>
            <v-select
              :items="category"
              item-text="category_name"
              item-value="id"
              label="Category"
              solo
              required
              v-model="form.id_category"
            ></v-select>
            <v-text-field
              v-model="form.price"
              solo
              type="number"
              label="Prices"
              clearable
              required
            ></v-text-field>
            <button type="submit" style="display: none">Submit</button>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click.prevent="addMenu">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card-title> Menu Table </v-card-title>
    <v-card-subtitle>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-subtitle>
    <v-data-table
      :headers="headers"
      :items="menu"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.category.category_name }}</td>
          <td>{{ item.price }}</td>
          <th>
            <v-icon @click="edit(item)">mdi-pencil</v-icon>
            <v-icon @click.prevent="deleteMenu(item)">mdi-delete</v-icon>
          </th>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      search: "",
      menu: [],
      category: [],
      addData: false,
      editData: true,
      dialog: false,
      dialogEdit: false,
      form: {
        id: "",
        name: "",
        id_category: "",
        price: "",
        e_id: "",
        e_name: "",
        e_id_category: "",
        e_price: "",
      },
      headers: [
        { text: "No", value: "indexOf(item.id)" },
        { text: "Menu Name", value: "name" },
        { text: "Category", value: "id_category" },
        { text: "Prices", value: "price" },
        { text: "Actions" },
      ],
    };
  },
  methods: {
    async menuView() {
      const response = await axios.get("api/allMenu");
      this.menu = response.data.data_menu;
    },
    async categoryView() {
      const response = await axios.get("api/allCategory");
      this.category = response.data.data_category;
    },
    addMenu() {
      axios.post("api/addMenu", this.form);
      this.form.name = "";
      this.form.price = "";
      this.addData = false;
      this.dialog = false;
      swal({
        title: "Success!",
        text: "Add New Menu Success!",
        icon: "success",
      });
      this.menuView();
    },
    edit(item) {
      this.form.e_id = item.id;
      this.form.e_name = item.name;
      this.form.e_id_category = item.id_category;
      this.form.e_price = item.price;
      this.dialogEdit = true;
    },
    updateMenu() {
      return axios
        .put("api/editMenu/" + this.form.e_id, {
          name: this.form.e_name,
          id_category: this.form.e_id_category,
          price: this.form.e_price,
        })
        .then(() => {
          this.menuView();
          swal({
            title: "Update Success!",
            text: "Update Menu Success!",
            icon: "success",
          });
          this.dialogEdit = false;
        });
    },
    deleteMenu(item) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data menu!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete("api/deleteMenu/" + item.id);
          let index = this.menu.indexOf(item.name);
          this.menu.splice(index, 1);
          swal("Data menu has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your data menu is safe!");
        }
      });
      this.menuView();
    },
  },
  mounted() {
    this.menuView();
    this.categoryView();
  },
  components: {
    // NavAdmin,
  },
};
</script>