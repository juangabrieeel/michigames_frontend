<template>
    <div class="game-container">
        <div class="game-content">
            <div class="game-iframe-container">
                <iframe v-if="gameUrl" :src="gameUrl" frameborder="0" allow="gamepad *;"></iframe>
                <p v-else>No se pudo cargar el juego.</p>
            </div>
            <div class="info-container">
                <div class="description-container">
                    <p v-if="juego">Nombre: {{juego.titulo}} <br>Descripción del juego: {{ juego.descripcion }} <br>Categoria: {{ juego.categoria }}</p>
                    <p v-else>No se encontró el juego con ID {{ juegoID }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// Importa axios para realizar peticiones HTTP y mapState para mapear el estado de Vuex
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    props: {
        juegoID: {
            type: Number,
            required: true // Indica que el prop juegoID es obligatorio
        }
    },
    data() {
        return {
            token: localStorage.getItem('token'), // Obtiene el token del almacenamiento local
            userID: localStorage.getItem('userID') // Obtiene el userID del almacenamiento local
        };
    },
    computed: {
        ...mapState(['juegos']), // Mapea el estado de juegos desde Vuex
        juego() {
            // Busca el juego en la lista de juegos por ID
            return this.juegos.find(juego => juego.JuegoID === this.juegoID);
        },
        gameUrl() {
            // Genera la URL del juego
            if (this.juego && this.juego.url) {
                return `https://www.1001juegos.com/embed/${this.juego.url}`;
            } else {
                return '';
            }
        }
    },
    methods: {
        registrarPartida() {
            if (!this.token) {
                console.log('Error: Usuario no registrado.');
                return;
            }

            // Obtiene el nombre del usuario desde localStorage
            const nombre_usuario = localStorage.getItem('username');

            // Verifica si el juego existe
            const juego = this.juego;

            if (!juego) {
                console.log(`Error: No se encontró el juego con ID ${this.juegoID}.`);
                return;
            }

            // Obtiene el nombre del juego
            const nombre_juego = juego.titulo;

            console.log('Registrando partida con:', {
                JuegoID: this.juegoID,
                duracion_partida: 0,
                nombre_usuario: nombre_usuario,
                nombre_juego: nombre_juego
            });

            // Realiza una petición POST para registrar la partida
            axios.post('http://localhost:3000/api/partidas/registrar', {
                JuegoID: this.juegoID,
                duracion_partida: 0,
                nombre_usuario: nombre_usuario,
                nombre_juego: nombre_juego
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log('Partida registrada:', response.data);
                })
                .catch(error => {
                    // Maneja errores en caso de falla al registrar la partida
                    console.error('Error al registrar la partida:', error);
                    if (error.response) {
                        console.error('Data:', error.response.data);
                        console.error('Status:', error.response.status);
                        console.error('Headers:', error.response.headers);
                    } else if (error.request) {
                        console.error('Request:', error.request);
                    } else {
                        console.error('Error:', error.message);
                    }
                });
        }
    },
    mounted() {
        // Se ejecuta al montar el componente para registrar la partida
        this.registrarPartida();
    }
};
</script>
<style>
.game-container {
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: #2b3530;
}

.game-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1200px;
}

.game-iframe-container {
    flex: 3;
    margin-right: 20px;
}

.info-container {
    flex: 1;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

iframe {
    width: 100%;
    height: 600px;
    border: none;
}

.description-container {
    background-color: #4A5450;
    border-radius: 10px;
    padding: 15px;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Sombra suave */
    text-align: left;
    color: #ffffff;
    font-size: 1.1em;
    line-height: 1.6;
    width: 230px;
    height: 400px;
    margin: auto;
    /* Centrar el contenedor si es más pequeño que el espacio disponible */
}


.error-message {
    color: red;
    text-align: center;
    font-weight: bold;
}
</style>
