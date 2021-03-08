import Vue from "vue";
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex)

const errorSystem = {
    state: {
        showError: false,
        errorText: "Error",
    },
    mutations: {
        showError(state, message) {
            state.showError = true;
            state.errorText = message;
        }
    }
}

export default new Vuex.Store({
    state: {
        students: [],

    },
    getters: {  // work like selector
        students: state => state.students.map(s => ({ ...s, fullName: s.firstName + ' ' + s.lastName })),
        findStudents: state => id => state.students.find(s => s.id == id),
        isLoaded: state => !!state.students.length
    },
    mutations: {   // work like reducer
        setStudents(state, student) {
            state.students = student
        },
        addStudent(state, student) {
            state.students.push(student)
        },
        editStudent(state, student) {
            // state.students.map(std => {
            //     debugger
            //     if (std.id != student.id) {
            //         return std
            //     }
            //     return {
            //         ...std,
            //         firstName: student.firstName,
            //         lastName: student.lastName
            //     }
            // })
            const index = state.students.findIndex(std => std.id == student.id)
            // state.students[index] = student
            Vue.set(state.students, index, student)
        },

    },
    actions: {   // works like thunk/actions
        async getStudents(context) {
            try {
                const student = (await axios.get("http://localhost:3000/students")).data;
                context.commit("setStudents", student);
            } catch (error) {
                context.commit("showError", error)
            }
        },
        async createStudents(context, { firstName, lastName }) {
            try {
                const student = (await axios.post("http://localhost:3000/students", { firstName, lastName })).data;
                context.commit('addStudent', student);
            }
            catch (error) {
                context.commit("showError", error)
            }
        },
        async editStudent(context, { id, names }) {
            try {
                const student = (await axios.put(`http://localhost:3000/students/${id}`, names)).data;
                context.commit('editStudent', student);
            }
            catch (error) {
                context.commit("showError", error)
            }
        }
    },
    modules: {
        error: errorSystem
    }
})