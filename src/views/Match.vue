<template>
    <div>
        <h1>Historial de Partidas</h1>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Usuario</th>
                    <th>Juego</th>
                    <th>Duración</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(partida, index) in partidas" :key="partida.PartidaID">
                    <td>{{ index + 1 }}</td>
                    <td>{{ partida.nombre_usuario }}</td>
                    <td>{{ partida.nombre_juego }}</td>
                    <td>{{ partida.duracion_partida }}</td>
                    <td>{{ new Date(partida.createdAt).toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
// Importa axios para realizar peticiones HTTP
import axios from 'axios';

export default {
    data() {
        return {
            partidas: [], // Array para almacenar las últimas partidas
        };
    },
    mounted() {
        // Se ejecuta al montar el componente para cargar las últimas partidas
        this.cargarPartidas();
    },
    methods: {
        async cargarPartidas() {
            try {
                // Realiza una petición GET para obtener las últimas partidas
                const response = await axios.get('http://localhost:3000/api/partidas/ultimas');

                // Almacena las últimas partidas en el array partidas del estado del componente
                this.partidas = response.data;
            } catch (error) {
                // Maneja errores en caso de fallo al obtener las últimas partidas
                console.error('Error al obtener las últimas partidas:', error);
            }
        },
    },
};
</script>

<style>
table {
    font: 12px sans-serif;
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ffffff;
    margin: 20px 0;
}

thead th {
    background-color: #2c352a;
    border: 1px solid #ffffff;
    padding: 10px;
}

tbody td {
    border: 1px solid #000000;
    background-color: #a2b1a2;
    padding: 8px;
    color: black
}
</style>