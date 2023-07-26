
import Vue from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router"; // Importa las funciones para crear el enrutador
import firebaseConfig from "./firebaseConfig"; // Importa la configuración de Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Componentes
import Login from "./components/Login.vue";
import Calculadora from "./components/Calculadora.vue";

// Inicializa Firebase con la configuración
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

// Configuración de las rutas
const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/calculadora",
    component: Calculadora,
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

new Vue({
  router, // Asegúrate de utilizar el enrutador en la instancia de Vue
  render: (h) => h(App),
}).$mount("#app");


