<template>
    <br>
    <div class="profile-container">
        <div class="profile-image-container">
            <img :src="getImageUrl()" :alt="username" class="profile-image">
        </div>
        <div class="profile-details">
            <div class="profile-name">
                <div class="box">
                    <h2>{{ username }}</h2>
                </div>
            </div>
            <div class="profile-description">
                <div class="box">
                    <p>{{ description }}</p>
                </div>
            </div>
            <button class="logout-button" @click="logout">Cerrar sesión</button>
        </div>
    </div>
    <br>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            defaultDescription: '¡Bienvenido a tu perfil! Esta es una descripción predeterminada.',
            imageUrl: require('@/assets/img/user.jpg') 
        };
    },
    mounted() {
        // Obtener el nombre de usuario almacenado en localStorage
        this.username = localStorage.getItem('username') || 'Desconocido'; // Se añade un valor predeterminado en caso de no existir el nombre
    },
    methods: {
        // Metodo para obtener la imagen del perfil
        getImageUrl() {
            return this.imageUrl; 
        },
        
        // Metodo encargado de cerrar sesión
        logout() {
            // Eliminar el token y el nombre de usuario del almacenamiento local al cerrar sesión
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            this.loggedIn = false;
            this.username = '';
            // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
            this.$router.push('/login');

        },
    },
    computed: {
        description() {
            return this.defaultDescription;
        }
    }
};
</script>

<style>
.profile-container {
    width: 100%;
    text-align: center;
    padding: 20px; /* Aumenta el espacio alrededor de la caja */
    border-radius: 10px;
    background-color: #3b4440;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    max-width: 400px; /* Ancho máximo de la caja */  
    margin: 0 auto; /* Centra horizontalmente */ 
}

.profile-image-container {
    margin-bottom: 20px;
}

.profile-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #1f2422;
}

.profile-details {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.box {
    background-color: #1f2422;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    width: 300px;
    text-align: center;
}
.logout-button{
    background-color: red;
}
</style>
