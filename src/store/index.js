// Importa la función createStore desde Vuex para crear el almacenamiento de la aplicación
import { createStore } from "vuex";

// Importa axios para realizar peticiones HTTP
import axios from "axios";

// Crea y exporta el almacenamiento Vuex
export default createStore({
  state: {
    juegos: [], // Array para almacenar los juegos
  },
  mutations: {
    // Mutación para establecer los juegos en el estado
    setJuegos(state, juegos) {
      state.juegos = juegos;
    },
  },
  actions: {
    // Acción para cargar los juegos desde la base de datos
    async cargarJuegosDesdeBD({ commit }) {
      try {
        // Realiza una petición GET a la API para obtener juegos
        const response = await axios.get("http://localhost:3000/api/juegos");

        // Llama a la mutación setJuegos para almacenar los juegos en el estado
        commit("setJuegos", response.data);
      } catch (error) {
        // Maneja errores en caso de falla al cargar juegos desde la base de datos
        console.error("Error al cargar juegos desde la base de datos:", error);
      }
    },
  },
  getters: {
    // Getter opcional para obtener un juego por ID
    getJuegoById: (state) => (id) => {
      return state.juegos.find((juego) => juego.id === id);
    },
  },
});
