<template>
    <div>
        <NavAdmin />
        <h3>Category Manage</h3>
        <a href="javascript:void(0)" @click="toggleAdd">Add</a>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in category" :key="item.id">
                <tr>
                    <td>{{index+1}}</td>
                    <td>{{item.category_name}}</td>
                    <th>
                        <a href="javascript:void(0)" @click="edit(item)">Edit</a> |
                        <a href="javascript:void(0)" @click="deleteCategory(item)">Delete</a>
                    </th>
                </tr>
            </tbody>
        </table>
        <div v-if="add">
            <form @submit.prevent="addCategory">
                <h3>Add Category</h3>
                <input type="hidden" v-model="form.id">
                Category Name
                <input type="text" v-model="form.category_name"> <br>
                <button type="submit">Add Category</button>
            </form>
        </div>
        <div v-if="edit">
            <form @click.prevent="updateCategory">
                <h3>Edit Category</h3>
                <input type="hidden" v-model="form.e_id">
                Category Name
                <input type="text" v-model="form.e_category_name"> <br>
                <button type="submit">Edit Category</button>
            </form>
        </div>
    </div>
</template>
<script>
import NavAdmin from '../components/NavAdmin.vue'
import axios from 'axios'
export default {
    components:{
        NavAdmin
    },
    data(){
        return{
            category : '',
            add : false,
            form :{
                id: '',
                category_name : '',
                e_id: '',
                e_category_name : '',
            }
        }
    },
    methods:{
        async categoryView(){
            const response = await axios.get('api/allCategory')
            this.category = response.data.data_category
        },
        async addCategory(){
            await axios.post('api/addCategory', this.form)
            this.categoryView()
        },
        edit(item) {
            this.form.e_id = item.id
            this.form.e_category_name = item.category_name
        },
        updateCategory(){
            return axios.put('api/editCategory/' + this.form.e_id, {
                category_name : this.form.e_category_name}).then(() => {
                    this.categoryView()
                })
        },
        deleteCategory(item){
            axios.delete('api/deleteCategory/' + item.id).then(() => {
                this.categoryView()
                let index = this.category.indexOf(item.name)
                this.category.slice(index, 1)
            })
        },
        toggleAdd(){
            this.add = !this.add
        }
    },
    mounted(){
        this.categoryView()
    }
}
</script>
