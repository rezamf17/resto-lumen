<template>
  <v-app>
    <v-app-bar app color="amber darken-2" dark>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="user"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <Nav />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" class="red darken-3" width="230" dark app v-if="user"
      ><v-list-item>
        <v-list-item-avatar>
              <v-img src="../public/resto-logo.png"></v-img>
            </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> RESTO-LUMEN </v-list-item-title>
          <v-list-item-subtitle> Application </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-avatar size="36">
          <v-img
            :src="`http://localhost:3000/avatar/${user.image.image_name}`"
          ></v-img>
        </v-avatar>
      </v-list-item>
      <v-list-group :value="false" color="white" width="100%">
        <template v-slot:activator>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list dense nav>
          <v-list-item link to="/profile">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>PROFILE</v-list-item-title>
        </v-list-item>
        <!-- <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>LOGOUT</v-list-item-title>
        </v-list-item> -->
        </v-list>
      </v-list-group>
      <v-divider></v-divider>
      <v-list dense nav class="mt-1" v-if="user.level == 'admin'">
        <v-list-item
          v-for="item in itemsAdmin"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense nav class="mt-1" v-if="user.level == 'super-admin'">
        <v-list-item link
        v-for="item in itemsSuper"
          :key="item.title"
          :to="item.link">
          <v-list-item-icon>
            <v-icon>
              {{item.icon}}
            </v-icon>
          </v-list-item-icon>
         <v-list-item-content >
            <v-list-item-title>{{item.title}}</v-list-item-title>
         </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main color="blue">
      <router-view :url="url"> </router-view>
    </v-main>
  </v-app>
</template>

<script>
import Nav from "../src/components/Nav.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "App",
  components: {
    Nav,

  },
  data: () => ({
    drawer: true,
    url : 'http://localhost:3000/',
    itemsAdmin: [
      { title: "DASHBOARD", icon: "mdi-home", link: "/dashboard" },
      { title: "MENU MANAGE", icon: "mdi-pizza", link: "/menuManage" },
      { title: "CATEGORY MANAGE", icon: "mdi-book", link: "/categoryManage" },
      { title: "ORDER MANAGE", icon: "mdi-currency-usd", link: "/order" },
    ],
    itemsSuper : [
      { title: "DASHBOARD", icon : "mdi-home", link: "/dashboardAdmin"},
      { title: "ACCOUNT MANAGE", icon : "mdi-account", link: "/account"},
    ]
  }),
   created() {
    const response = axios.get("api/profile");
    this.$store.dispatch("user", response.data.user);
    // this.user = response.data.user
  },
  
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
