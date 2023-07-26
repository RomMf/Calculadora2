<template>
  <div>
    <!-- Mostrar el componente de inicio de sesión solo si el usuario no está autenticado -->
    <div v-if="!currentUser">
      <Login @login="handleLogin" />
    </div>

    <!-- Mostrar la calculadora solo si el usuario está autenticado -->
    <div v-else>
      <Calculator />
      <button @click="handleLogout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
import { firebase } from "./firebaseConfig";
import Login from "./components/Login.vue";
import Calculadora from "./components/Calculadora.vue";

export default {
  components: {
    Login,
    Calculadora,
  },
  data() {
    return {
      currentUser: null,
    };
  },
  methods: {
    handleLogin(user) {
      this.currentUser = user;
    },
    handleLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.currentUser = null;
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error.message);
        });
    },
  },
  created() {
    // Observador para detectar cambios en la autenticación del usuario
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  },
};
</script>


