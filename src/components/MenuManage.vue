<template>
    <div>
        <NavAdmin />
        <a href="javascript:void(0)" @click="toggleBoxAdd">Add</a>
        <table>
            <thead>
                <th>No</th>
                <th>Menu Name</th>
                <th>Category</th>
                <th>Prices</th>
                <th>Actions</th>
            </thead>
            <tbody v-for="(item, index) in menu" :key="item.id">
                <td>{{index+1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.category.category_name}}</td>
                <td>{{item.price}}</td>
                <th>
                    <a href="javascript:void(0)" @click="edit(item)">Edit</a> |
                    <a href="javascript:void(0)" @click.prevent="deleteMenu(item)">Delete</a>
                </th>
            </tbody>
        </table>
        <div v-if="addData">
            <form @submit.prevent="addMenu">
                <h4>Add Data</h4>
                Name
                <input type="text" v-model="form.name"> <br>
                Category
                <select v-model="form.id_category" >
                    <option value="">Select Category</option>
                    <option v-for="item in category" :key="item.id" :value="item.id">{{item.category_name}}</option>
                </select> <br>
                Price
                <input type="number" v-model="form.price"> <br>
                <button type="submit">Add Menu</button>
            </form>
        </div>
        <div v-if="editData">
            <form @submit.prevent="updateMenu">
                <h4>Edit Data</h4>
                <input type="hidden" v-model="form.e_id">
                Name
                <input type="text" v-model="form.e_name"> <br>
                Category
                <select v-model="form.e_id_category" >
                    <option value="">Select Category</option>
                    <option v-for="item in category" :key="item.id" :value="item.id">{{item.category_name}}</option>
                </select> <br>
                Price
                <input type="number" v-model="form.e_price"> <br>
                <button type="submit">Update Menu</button>
            </form>
        </div>
    </div>
</template>
<script>
    import NavAdmin from '../components/NavAdmin.vue'
    import axios from 'axios'
    export default{
        data(){
            return{
                menu : '',
                category : '',
                addData : false,
                editData : true,
                form : {
                    id : '',
                    name : '',
                    id_category : '',
                    price : '',
                    e_id : '',
                    e_name : '',
                    e_id_category : '',
                    e_price : ''
                }
            }
        },
        methods:{
             async menuView(){
                const response = await axios.get('api/allMenu')
                this.menu = response.data.data_menu
            },
            async categoryView(){
                const response = await axios.get('api/allCategory')
                this.category = response.data.data_category
            },
            addMenu(){
                axios.post('api/addMenu', this.form)
                    this.menuView()
                    this.form.name = ''
                    this.form.price = ""
                    this.addData = false
            },
            edit(item){
                this.form.e_id = item.id
                this.form.e_name = item.name
                this.form.e_id_category = item.id_category
                this.form.e_price = item.price
            },
            updateMenu(){
                return axios.put('api/editMenu/' + this.form.e_id, {
                    name : this.form.e_name,
                    id_category : this.form.e_id_category,
                    price : this.form.e_price
                }).then(() => {
                    this.menuView()
                })
            },
            deleteMenu(item){
                axios.delete('api/deleteMenu/' + item.id).then(() =>{
                    this.menuView()
                    let index = this.menu.indexOf(item.name)
                    this.menu.splice(index,1)
                })
            },
            toggleBoxAdd(){
                this.addData = !this.addData
            },

        },
        mounted(){
            this.menuView()
            this.categoryView()
        },
        components:{
            NavAdmin,
        }
    }
</script>