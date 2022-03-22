<template>
  <v-container>
    <v-card>
      <v-card-title>
          <h3>Table Category</h3>
        <v-spacer></v-spacer>
      </v-card-title>
    <v-card-subtitle>
      <v-btn class="yellow darken-3" dark @click="dialogAdd = true">
        <v-icon>mdi-plus</v-icon>
        Add Category
      </v-btn>
    </v-card-subtitle>
    <v-card-text>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table :headers="headers" :items="category" :search="search">
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.category_name }}</td>
            <th>
              <v-icon @click="edit(item)">mdi-pencil</v-icon>
              <v-icon @click.prevent="deleteCategory(item)">mdi-delete</v-icon>
            </th>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="dialogAdd" scrollable>
      <v-card>
        <v-card-title>Add New Category</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-10">
          <form @submit.prevent="addCategory">
            <v-text-field
              v-model="form.category_name"
              clearable
              solo
              label="Category Name"
            ></v-text-field>
            <button type="submit" style="display: none">Submit</button>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="dialogAdd = false"> Close </v-btn>
          <v-btn text color="primary" @click.prevent="addCategory"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit">
      <v-card>
        <v-card-title>Edit Category</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-10">
          <form @submit.prevent="updateCategory">
            <input type="hidden" v-model="form.e_id" />
            <v-text-field
              v-model="form.e_category_name"
              solo
              clearable
              label="Category Name"
            ></v-text-field>
            <button type="submit" style="display: none">Submit</button>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="dialogEdit = false">
            Close
          </v-btn>
          <v-btn text color="primary" @click.prevent="updateCategory">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      search: "",
      category: [],
      dialogAdd: false,
      dialogEdit: false,
      form: {
        id: "",
        category_name: "",
        e_id: "",
        e_category_name: "",
      },
      headers: [
        { text: "No", value: "id" },
        { text: "Category Name", value: "category_name" },
        { text: "Actions" },
      ],
    };
  },
  methods: {
    async categoryView() {
      const response = await axios.get("api/allCategory");
      this.category = response.data.data_category;
    },
    async addCategory() {
      await axios.post("api/addCategory", this.form);
      this.categoryView();
      this.dialogAdd = false;
      swal({
        title: "Success!",
        text: "Add New Category Success!",
        icon: "success",
      });
    },
    edit(item) {
      this.form.e_id = item.id;
      this.form.e_category_name = item.category_name;
      this.dialogEdit = true;
    },
    updateCategory() {
      return axios
        .put("api/editCategory/" + this.form.e_id, {
          category_name: this.form.e_category_name,
        })
        .then(() => {
          this.categoryView();
          this.dialogEdit = false;
          swal({
            title: "Success!",
            text: "Edit Category Success!",
            icon: "success",
          });
        });
    },
    deleteCategory(item) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data category!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete("api/deleteCategory/" + item.id).then(() => {
            this.categoryView();
            let index = this.category.indexOf(item.name);
            this.category.slice(index, 1);
          });
          swal("Data Category has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Data category is safe!");
        }
      });
    },
  },
  mounted() {
    this.categoryView();
  },
};
</script>
