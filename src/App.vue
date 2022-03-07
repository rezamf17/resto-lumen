<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="user"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <Nav />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" class="teal" width="220" dark app v-if="user"
      ><v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> RESTO-LUMEN </v-list-item-title>
          <v-list-item-subtitle> Application </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-avatar size="36">
          <img
            :src="`${url}avatar/${user.image.image_name}`"
          >
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
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>LOGOUT</v-list-item-title>
        </v-list-item>
        </v-list>
      </v-list-group>
      <v-divider></v-divider>
      <v-list dense nav class="mt-1">
        <v-list-item
          v-for="item in items"
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
    </v-navigation-drawer>
    <v-main>
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
    // NavAdmin
  },
  data: () => ({
    drawer: true,
    url : 'http://localhost:3000/',
    items: [
      { title: "DASHBOARD", icon: "mdi-home", link: "/dashboard" },
      { title: "MENU MANAGE", icon: "mdi-pizza", link: "/menuManage" },
      { title: "CATEGORY MANAGE", icon: "mdi-book", link: "/categoryManage" },
    ],
  }),
  async created() {
    const response = await axios.get("api/profile", {
      headers: {
        Authorization: "bearer" + localStorage.getItem("token"),
      },
    });
    this.$store.dispatch("user", response.data.user);
    // this.user = response.data.user
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
