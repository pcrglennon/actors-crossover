<template>
  <div id="app" class="container mx-auto mt-32">
    <h1>Actors Crossover</h1>

    <div v-if="isLoading">
      <h3>Loading...</h3>
    </div>

    <div v-else>
      <h3>Select one or more actors</h3>

      <actor-search
        :image-service="imageService"
        @addActor="addActor"
      />

      <ul>
        <li
          v-for="actor in actors"
          :key="actor.id"
        >
          <actor
            :actor="actor"
            :image-service="imageService"
          />
        </li>
      </ul>
    </div>

    <div class="flex justify-center border-t-2 border-black mt-32 py-12">
      <a href="https://www.themoviedb.org" target="_blank">
        <img alt="Powered by The Movie DB" src="https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

import Actor from './components/Actor.vue';
import ActorSearch from './components/ActorSearch.vue';
import ImageService from './services/image_service';

@Component({
  components: {
    Actor,
    ActorSearch,
  },
})
export default class App extends Vue {
  isLoading = true;
  // TODO - create Actor interface
  actors: Array<any> = [];
  imageService: ImageService | null = null;

  addActor(actor: any) {
    this.actors.push(actor);
  }

  async created() {
    const response = await axios.get('https://api.themoviedb.org/3/configuration', {
      params: {
        'api_key': process.env.VUE_APP_TMDB_API_KEY,
      },
    });

    this.imageService = new ImageService(response.data.images);
    this.isLoading = false;
  }
}
</script>

<style src="./assets/tailwind.css">
