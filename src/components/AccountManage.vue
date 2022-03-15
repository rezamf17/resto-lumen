<template>
    <div>
        <v-container>
            <v-card>
                <v-card-title>Table Data Account
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialogAdd = true">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                        add new account
                    </v-btn>
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
                    :items="account"
                    :items-per-page="5"
                    :search="search">
                    <template v-slot:item="{ item, index }">
                        <tr>
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.level }}</td>
                        <th>
                            <v-icon @click="edit(item)">mdi-pencil</v-icon>
                            <v-icon @click.prevent="deleteAccount(item)">mdi-delete</v-icon>
                        </th>
                        </tr>
                    </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
            <v-dialog
            v-model="dialogAdd"
            width="400px">
            <v-card >
                <v-card-title>Add New Account</v-card-title>
                <v-card-text>
                    <v-text-field
                    label="Name"
                    v-model="form.name"
                    required></v-text-field>
                    <v-text-field
                    label="Email"
                    type="email"
                    v-model="form.email"
                    required></v-text-field>
                    <v-select
                    label="Level"
                    :items="items"
                    v-model="form.level"
                    required></v-select>
                    <v-text-field
                    label="Password"
                    type="password"
                    v-model="form.password"
                    required></v-text-field>
                    <v-text-field
                    label="ConfirmPassword"
                    type="password"
                    v-model="form.password_confirmation"
                    required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="dialogAdd = false">
                        close
                    </v-btn>
                    <v-btn color="primary" @click.prevent="accountAdd">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <v-dialog
            v-model="dialogEdit"
            width="400px">
            <v-card >
                <v-card-title>Edit Account</v-card-title>
                <v-card-text>
                    <input type="hidden" v-model="form.e_id">
                    <v-text-field
                    label="Name"
                    v-model="form.e_name"
                    required></v-text-field>
                    <v-text-field
                    label="Email"
                    type="email"
                    v-model="form.e_email"
                    required></v-text-field>
                    <v-select
                    label="Level"
                    :items="items"
                    v-model="form.e_level"
                    required></v-select>
                    <v-text-field
                    label="Password"
                    type="password"
                    v-model="form.e_password"
                    hint="Empty Password if you dont want to change password"
                    required></v-text-field>
                    <v-text-field
                    label="ConfirmPassword"
                    type="password"
                    v-model="form.e_password_confirmation"
                    required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="dialogEdit = false">
                        close
                    </v-btn>
                    <v-btn color="success" @click.prevent="updateAccount">
                        update
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert'
export default {
    data(){
        return{
            account : [],
            form : {
                name : '',
                email : '',
                password : '',
                password_confirmation : '',
                level : '',
                e_id : '',
                e_name : '',
                e_email : '',
                e_password : '',
                e_password_confirmation : '',
                e_level : '',
            },
            headers: [
                { text: "No", value: "indexOf(item.id)" },
                { text: "Name", value: "name" },
                { text: "Email", value: "email" },
                { text: "Level", value: "level" },
                { text: "Actions" },
            ],
            search : '',
            dialogAdd : false,
            dialogEdit : false,
            items: [
                {value : 'admin', text : 'Admin'},
                {value : 'super-admin', text : 'Super Admin'},
            ]
        }
    },
    methods : {
        accountView(){
            axios.get('api/users').then(response => {
                this.account = response.data.users
            }).then(e => {
                console.log(e)
            })
        },
        async accountAdd(){
            await axios.post('api/addAccount', this.form).then(() => {
                this.accountView()
                swal("New Account Has Been Added!")
                this.dialogAdd = false
            }).catch(e => {
                swal(e)
            })
        },
        edit(item) {
            this.form.e_id = item.id;
            this.form.e_name = item.name;
            this.form.e_email = item.email;
            this.form.e_level = item.level;
            this.dialogEdit = true;
        },
        updateAccount(){
            if (this.form.e_password && this.form.e_password_confirmation == null) {
                        return axios
                .put("api/editAccount/" + this.form.e_id, {
                name: this.form.e_name,
                email: this.form.e_email,
                level: this.form.e_level,
                })
                .then(() => {
                this.form.e_password = ''
                this.form.e_password_confirmation = ''
                this.accountView();
                swal({
                    title: "Update Success!",
                    text: "Update Menu Success!",
                    icon: "success",
                });
                this.dialogEdit = false;
                });
            }else{
                 return axios
                .put("api/editAccount/" + this.form.e_id, {
                name: this.form.e_name,
                email: this.form.e_email,
                level: this.form.e_level,
                password : this.form.e_password,
                password_confirmation : this.form.e_password_confirmation
                })
                .then(() => {
                this.form.e_password = ''
                this.form.e_password_confirmation = ''
                this.accountView();
                swal({
                    title: "Update Success!",
                    text: "Update Menu Success!",
                    icon: "success",
                });
                this.dialogEdit = false;
                });
            }
        },
        deleteAccount(item){
            swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data user!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete("api/deleteAccount/" + item.id);
          let index = this.account.indexOf(item.name);
          this.account.splice(index, 1);
          swal("Data user has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your data user is safe!");
        }
      });
      this.menuView();
        }
    },
    mounted(){
        this.accountView()
    }
}
</script>