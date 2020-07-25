<template>
  <div id="app" class="container mx-auto mt-32">
    <h1>Actor Movie Crossovers</h1>

    <div>
      <h3>Select one or more actors</h3>

      <div class="flex items-start justify-start">
        <div class="w-1/2">
          <actor-search
            @addActor="addActor"
          />

          <ul v-if="actors.length">
            <li
              v-for="actor in actors"
              :key="actor.id"
            >
              <actor
                :actor="actor"
                @removeActor="removeActor"
              />
            </li>
          </ul>
        </div>

        <div class="w-1/2">
          <button
            class="ml-2 p-4 text-lg"
            :class="buttonClasses"
            :disabled="buttonDisabled"
            @click="findMovieCrossovers"
          >
            Find Movie Crossovers
          </button>

          <div v-if="crossoverSearchStatus === 'in-progress'">
            <p>LOADING</p>
          </div>

          <ul v-if="crossoverMovies.length">
            <li
              v-for="movie in crossoverMovies"
              :key="movie.id"
            >
              <movie
                :movie="movie"
              />
            </li>
          </ul>
        </div>
      </div>
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
import Movie from './components/Movie.vue';

@Component({
  components: {
    Actor,
    ActorSearch,
    Movie,
  },
})
export default class App extends Vue {
  // TODO - create Actor interface
  actors: Array<any> = [];

  crossoverSearchStatus = 'ready';
  crossoverMovies: any[] =  [];

  get buttonDisabled() {
    return this.actors.length <= 1 || this.crossoverSearchStatus === 'in-progress';
  }

  get buttonClasses() {
    return {
      'bg-green-300': !this.buttonDisabled,
      'bg-gray-300 cursor-not-allowed': this.buttonDisabled,
    };
  }

  addActor(actor: any) {
    this.actors.push(actor);
  }

  removeActor(actor: any) {
    const index = this.actors.indexOf(actor);
    this.actors.splice(index, 1);
  }

  // TODO (future) - figure out TV shows as well
  async findMovieCrossovers() {
    try {
      this.crossoverMovies = [];
      this.crossoverSearchStatus = 'in-progress';

      const actorIdsString = this.actors.map(actor => actor.id).join(',');
      const response = await axios.get(`${process.env.VUE_APP_API_URL_BASE}/movie-db-utils/actors-crossover`, {
        params: {
          'actor_ids': actorIdsString,
        }
      });

      this.crossoverMovies = response.data.crossover_movies;
      this.crossoverSearchStatus = 'success';
    } catch(error) {
      this.crossoverSearchStatus = 'error';
      console.log('error fetching actor data');
      console.log(error);
    }
  }
}
</script>

<style src="./assets/tailwind.css">
