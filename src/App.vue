<template>
  <div class="main-container">
    <div class="content">
      <div v-if="!loggedIn">
        <router-link to="/login" class="login-button">Iniciar Sesión</router-link>
      </div>
      <div v-else>
        <router-link to="/profile" class="login-button"><i class="pi pi-user" style="font-size: 2.5rem"></i>
        </router-link>
      </div>
      <div class="encabezado">
        <h1>MICHIGAMES</h1>
        <br>
        <div class="web-buttons">
          <router-link to="/" class="web-button">Home</router-link>
          <router-link to="/match" class="web-button">Partidas</router-link>
          <router-link to="/faq" class="web-button">FAQ</router-link>
        </div>
      </div>
      <router-view />
    </div>

    <!-- Pie de página -->
    <div class="piepagina">
      <div class="social-buttons">
        <a href="https://www.facebook.com/" class="social-button" target="_blank">Facebook</a>
        <a href="https://x.com/" class="social-button" target="_blank">Twitter</a>
        <a href="https://www.instagram.com/" class="social-button" target="_blank">Instagram</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false, // Indica si el usuario ha iniciado sesión
      username: '', // Nombre de usuario para mostrar en la bienvenida
    };
  },
  created() {
    // Verificar si el usuario está autenticado al cargar el componente
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      const token = localStorage.getItem('token');
      if (token) {
        // Si hay un token en el almacenamiento local, el usuario está autenticado
        this.loggedIn = true;
        // Obtener el nombre de usuario del almacenamiento local
        this.username = localStorage.getItem('username');
      } else {
        // Em caso contrario el usuario no está autenticado
        this.loggedIn = false;
        this.username = '';
      }
    }
  },
  watch: {
    // Watch encargado de llamar al metodo para que aparezca o no el nombre del usuario de forma correcta
    '$route'() {
      this.checkAuthentication();
    }
  }
};
</script>


<style>
/* Fuente Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Jersey+15&display=swap');
/* Import del incono de primevue */
@import 'primeicons/primeicons.css';

body {
  background-color: #323E2D;
  font-family: 'Jersey 15', sans-serif;
  color: #fff;
}

h1 {
  font-size: 15mm;
}

button {
  font-family: 'Jersey 15', sans-serif;
  font-size: 5mm;
}

/* Estilos para el encabezado */
.encabezado {
  text-align: center;
  background-color: #4A5450;
  margin-top: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* Estilos para los botones */
.web-button {
  display: inline-block;
  padding: 10px 40px;
  margin: 0 10px;
  background-color: #5A6560;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

/* Para cuando se pasa el raton por encima del botón*/
.web-button:hover {
  background-color: #6B7565;
}

/* Estilos para el botón de inicio de sesión */
.login-button {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 10px 30px;
  background-color: #171717;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgb(0, 0, 0);
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  font-size: 5mm;
}

/* Para cuando se pasa el raton por encima del botón*/
.login-button:hover {
  background-color: #323331;
}


/* Estilos para el contenedor principal */
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Estilos para el contenido principal */
.content {
  flex: 1;
}

/* Estilos para el pie de página */
.piepagina {
  background-color: #4A5450;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  text-align: center;
}

/* Estilos para los botones sociales */
.social-button {
  display: inline-block;
  padding: 10px 40px;
  margin: 0 10px;
  background-color: #5A6560;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

/* Para cuando se pasa el raton por encima del botón*/
.social-button:hover {
  background-color: #6B7565;
}
</style>
