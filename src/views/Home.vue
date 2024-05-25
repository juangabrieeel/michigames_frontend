<template>
  <div>
    <div class="game-cards">
      <!-- Mostrar tarjetas de juegos -->
      <router-link v-for="juego in juegos" :key="juego.JuegoID" :to="'/game/' + juego.JuegoID" class="game-card-link">
        <div class="game-card">
          <img :src="getImageUrl(juego.imagen)" :alt="juego.titulo">
          <p class="titulo">{{ juego.titulo }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['juegos']), // Obtener juegos de la store
  },
  methods: {
    ...mapActions(['cargarJuegosDesdeBD']), // Acción para cargar juegos desde la base de datos
    getImageUrl(imagen) {
      // Función cargar la URL correcta de la imagen
      return require(`@/assets/img/${imagen}`);
    },
  },
  mounted() {
    // Cargar juegos al montar el componente 
    this.cargarJuegosDesdeBD();
  },
};
</script>
<style>
.titulo {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.game-card-link {
  text-decoration: none;
  color: inherit;
  flex: 10 0 calc(30% - 40px); /* Ajuste para mostrar hasta 3 juegos por fila */
  margin: 20px;
}

.game-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.game-card {
  width: 100%;
  text-align: center;
  padding: 5px;
  border: none;
  border-radius: 10px;
  background-color: #3b4440;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.game-card img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.game-card img:hover {
  transform: scale(1.05);
}

.game-card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-top: 10px;
}
</style>
