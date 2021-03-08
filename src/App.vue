<template>
  <v-app>
    <v-toolbar app>
      <v-btn flat to="/">Students List</v-btn>
      <v-btn flat to="/NewStudent">New Student</v-btn>
    </v-toolbar>
    <v-content>
      <br />
      <router-view />
    </v-content>
    <v-snackbar v-model="$store.state.error.showError">
      {{ $store.state.error.errorText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import NewStudent from "./components/NewStudent";
import Students from "./components/Students";
import EditStudent from "./components/EditStudent";
import store from "./store";

export default {
  name: "App",
  components: {
    NewStudent,
    Students,
    EditStudent,
  },
  data() {
    return {};
  },
  async created() {
    // let student = (await axios.get("http://localhost:3000/students")).data;
    // // this.$store.commit('setStudents', (await axios.get("http://localhost:3000/students")).data);
    // this.$store.commit("setStudents", student);
    this.$store.dispatch("getStudents");
  },
};
</script>
