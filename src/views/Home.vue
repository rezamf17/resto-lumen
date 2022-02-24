<template>
  <div class="home">
    <h3>Menu Pages</h3>
    <table>
      <thead>
        <th>Menu Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Actions</th>
      </thead>
      <tbody v-for="item in menu" :key="item.id">
        <td>{{item.name}}</td>
        <td>{{item.category.category_name}}</td>
        <td>{{item.price}}</td>
        <td>Order</td>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'Home',
  data(){
    return{
      menu : ''
    }
  },
  async created(){
    const response = await axios.get('menu')
    this.menu = response.data.data_menu
  },
}
</script>
