// Importa las funciones createRouter y createWebHistory desde vue-router
import { createRouter, createWebHistory } from "vue-router";

// Importa las diferentes vistas (componentes) utilizadas en las rutas
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import Match from "../views/Match.vue";
import Faq from "../views/Faq.vue";
import Login from "../views/Login";
import Singup from "../views/Singup";
import Profile from "../views/Profile";

// Rutas de las vistas
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/game/:juegoID", // Define un parámetro dinámico :juegoID en la ruta
    component: Game,
    props: (route) => ({
      juegoID: parseInt(route.params.juegoID), // Convierte el parámetro a número usando parseInt
    }),
  },
  {
    path: "/match",
    name: "match",
    component: Match,
  },
  {
    path: "/faq",
    name: "faq",
    component: Faq,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/singup",
    name: "singup",
    component: Singup,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
];

// Crea un enrutador utilizando las rutas definidas anteriormente y la historia de navegación basada en el historial de navegación del navegador
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes, // Rutas definidas
});

// Exporta el enrutador para que pueda ser utilizado en otros archivos
export default router;
