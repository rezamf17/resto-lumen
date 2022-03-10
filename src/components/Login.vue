<template>
  <v-card width="40%" class="mx-auto mt-10">
    <v-card-title>Login</v-card-title>
    <v-form @submit.prevent="loginSubmit">
      <v-card-text>
        <v-text-field
          label="Email"
          placeholder="Enter Email"
          type="email"
          v-model="email"
          outlined
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          placeholder="Enter Password"
          type="password"
          v-model="password"
          outlined
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" type="submit"> Login </v-btn>
      </v-card-actions>
    </v-form>
    <div v-if="!error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
  </v-card>
</template>
<script>
import axios from "axios";
import swal from 'sweetalert'
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
     async loginSubmit() {
        await axios
          .post("api/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            this.$store.dispatch("user", response.data.user);
            if(response.data.user.level == 'super-admin'){
              this.$router.push({ name: "DashboardAdmin" });
              swal("Login Success!")
            }else if(response.data.user.level == 'admin'){
              this.$router.push({ name: "Dashboard" });
              swal("Login Success!")
            }else{
              swal("Login Failed!")
            }
          });
    },
  },
};
</script>