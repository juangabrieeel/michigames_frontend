<template>
    <div class="login-container">
        <h1>Regístrate</h1>
        <form class="login-form" @submit.prevent="registerUser" ref="form">
            <div class="form-group">
                <label for="new-username">Usuario:</label>
                <input type="text" id="new-username" v-model="newUser.username" required>
            </div>
            <div class="form-group">
                <label for="new-email">Correo:</label>
                <input type="email" id="new-email" v-model="newUser.email" required>
            </div>
            <div class="form-group">
                <label for="new-password">Contraseña:</label>
                <input type="password" id="new-password" v-model="newUser.password" required>
            </div>
            <div class="form-group">
                <label for="confirm-password">Repite la contraseña:</label>
                <input type="password" id="confirm-password" v-model="newUser.confirmPassword" required>
            </div>
            <button type="submit" class="enter">Crear cuenta</button>
        </form>
        <p>¿Ya tienes cuenta? <router-link to="/login" class="register-link">Inicia sesión aquí</router-link></p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            newUser: {
                username: '',
                password: '',
                confirmPassword: '',
                email: ''
            },
            errorMessage: ''
        };
    },
    methods: {
        registerUser() {
            // Verificar si las contraseñas coinciden
            if (this.newUser.password !== this.newUser.confirmPassword) {
                this.errorMessage = "Las contraseñas no coinciden";
                return;
            }

            // Verificar si el formulario es válido
            if (!this.$refs.form || !this.$refs.form.checkValidity()) {
                this.errorMessage = "Por favor, completa todos los campos correctamente.";
                return;
            }

            // Enviar la solicitud POST para registrar un nuevo usuario
            axios.post('http://localhost:3000/api/register', {
                username: this.newUser.username,
                email: this.newUser.email,
                password: this.newUser.password
            })
                .then(response => {
                    console.log("Usuario creado correctamente");
                    // Redirigir al usuario a la página de inicio de sesión
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.error("Error al crear el usuario:", error.response.data);
                    this.errorMessage = "Error al crear el usuario: " + error.response.data.message;

                    // Mostrar errores de validación específicos
                    if (error.response.data.errors && error.response.data.errors.length > 0) {
                        const validationErrors = error.response.data.errors;
                        validationErrors.forEach(err => {
                            console.log(`Error en ${err.field}: ${err.message}`);
                        });
                    }
                });
        }
    }
}
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

.login-form .form-group {
    margin-bottom: 15px;
}

.login-form label {
    display: block;
    text-align: left;
    margin-bottom: 5px;
}

.login-form input {
    width: calc(100% - 20px);
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.enter {
    width: 100%;
    padding: 10px 20px;
    background-color: #5A6560;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.enter:hover {
    background-color: #6B7565;
}

.register-link {
    color: #fff;
    text-decoration: underline;
}

.error-message {
    color: red;
    font-size: 25px;
    margin-top: 10px;
}
</style>
