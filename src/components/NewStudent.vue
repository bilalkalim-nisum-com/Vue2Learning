<template>
  <div>
    <v-flex sm8 offset-sm2>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>New Student</v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn @click="submit">submit</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <br />
    <Students />
  </div>
</template>

<script>
import axios from "axios";
import Students from "./Students";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    // async submit() {
    //   // axios.post("http://localhost:3000/students", { firstName: this.firstName ,  lastName: this.lastName });
    //   const student = (await axios.post("http://localhost:3000/students", { firstName: this.firstName, lastName: this.lastName })).data;
    //   // this.$store.commit('addStudent', student); // we can add like this to store
    //   this.addStudent(student);  //this is also a way to add to store in vue
    // },  this is commented to do with store action
    async submit() {
      this.$store.dispatch("createStudents", {
        firstName: this.firstName,
        lastName: this.lastName,
      });
    },
    ...mapMutations(["addStudent"]),
  },
  components: {
    Students,
  },
};
</script>