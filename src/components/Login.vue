<template>
    <div class="login">
      <h2>Inicio de Sesión</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Correo electrónico:</label>
          <input type="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" v-model="password" required>
        </div>
        <div>
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { firebase } from "../firebaseConfig";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      login() {
        const email = this.email;
        const password = this.password;
  
        // Autenticación con correo y contraseña predefinidos 
        const predefinedEmail = "usuario@example.com";
        const predefinedPassword = "password123";
  
        if (email === predefinedEmail && password === predefinedPassword) {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              this.$emit("login", userCredential.user);
            })
            .catch((error) => {
              console.error("Error al iniciar sesión:", error.message);
            });
        } else {
          console.error("Credenciales incorrectas");
        }
      },
    },
  };
  </script>
  
  