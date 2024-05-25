<template>
    <div class="login-container">
        <h1>Iniciar Sesión</h1>
        <form @submit.prevent="loginUser">
            <div class="form-group">
                <label for="username">Usuario:</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div class="form-group">
                <label for="password">Contraseña:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit" class="enter">Entrar</button>
        </form>
        <p>¿No tienes cuenta? <router-link to="/singup" class="register-link">Regístrate aquí</router-link></p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
// Importa axios para realizar peticiones HTTP
import axios from 'axios';

export default {
    data() {
        return {
            // Datos del formulario de inicio de sesión
            username: '', // Nombre de usuario
            password: '', // Contraseña
            errorMessage: '' // Mensaje de error
        };
    },
    methods: {
        async loginUser() {
            try {
                // Realiza una petición POST para iniciar sesión
                const response = await axios.post('http://localhost:3000/api/login', {
                    username: this.username,
                    password: this.password
                });

                // Verifica el estado de la respuesta
                if (response.status === 200) {
                    // Inicio de sesión exitoso
                    const userData = response.data;
                    console.log('Inicio de sesión exitoso:', userData);

                    // Guarda la información del usuario en el almacenamiento local
                    localStorage.setItem('userId', userData.userId);
                    localStorage.setItem('username', userData.username);
                    localStorage.setItem('token', userData.token);

                    // Redirige a la página principal
                    this.$router.push('/');

                } else {
                    // Maneja errores de inicio de sesión
                    console.error('Error al iniciar sesión:', response.data.message);
                    this.errorMessage = response.data.message;
                }

            } catch (error) {
                // Error de red u otros errores al hacer la solicitud
                console.error('Error al iniciar sesión:', error);

                if (error.response && error.response.status === 401) {
                    // Si el error es 401 (No autorizado), el nombre de usuario o la contraseña son incorrectos
                    this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
                } else {
                    // En caso de otros errores, muestra un mensaje genérico de error
                    this.errorMessage = 'Error al iniciar sesión';
                }
            }
        }
    }
};
</script>
<style>
.login-container {
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #4A5450;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    color: #fff;
    text-align: center;
}

.login-container .form-group {
    margin-bottom: 15px;
}

.login-container label {
    display: block;
    text-align: left;
    margin-bottom: 5px;
}

.login-container input {
    width: calc(100% - 20px);
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.login-container button {
    width: 100%;
    padding: 10px 20px;
    background-color: #5A6560;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.login-container button:hover {
    background-color: #6B7565;
}

.login-container .register-link {
    color: #fff;
    text-decoration: underline;
}

.login-container .error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}
</style>
