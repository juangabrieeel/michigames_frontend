// Importa la función createApp desde Vue para crear la aplicación
import { createApp } from "vue";

// Importa el componente raíz de la aplicación
import App from "./App.vue";

// Importa el enrutador para configurar las rutas correctamente
import router from "./router";

// Importa el store Vuex para gestionar el estado de la aplicación
import store from "./store";

// Importa PrimeVue para configurar los componentes de PrimeVue
import PrimeVue from "primevue/config";

// Crea la aplicación Vue
const app = createApp(App);

// Utiliza el enrutador y el store Vuex en la aplicación
app.use(router);
app.use(store);

// Usa PrimeVue para configurar los componentes de PrimeVue en la aplicación
app.use(PrimeVue);

// Monta la aplicación en el elemento con el id "app" en el DOM
app.mount("#app");
