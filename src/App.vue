<template>
  <div id="app" class="container mx-auto mt-32">
    <h1>Actor Movie Crossovers</h1>

    <div v-if="isLoading">
      <h3>Loading...</h3>
    </div>

    <div v-else>
      <h3>Select one or more actors</h3>

      <div class="flex items-start justify-start">
        <div class="w-1/2">
          <actor-search
            :image-service="imageService"
            @addActor="addActor"
          />

          <ul v-if="actors.length">
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
                :image-service="imageService"
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
import ImageService from './services/image_service';

@Component({
  components: {
    Actor,
    ActorSearch,
    Movie,
  },
})
export default class App extends Vue {
  isLoading = true;

  // TODO - create Actor interface
  actors: Array<any> = [];
  imageService: ImageService | null = null;

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

  // TODO (future) - figure out TV shows as well
  async findMovieCrossovers() {
    try {
      this.crossoverMovies = [];
      this.crossoverSearchStatus = 'in-progress';

      const requests = this.actors.map((actor: any) => {
        return axios.get(`https://api.themoviedb.org/3/person/${actor.id}/movie_credits`, {
          params: {
            'api_key': process.env.VUE_APP_TMDB_API_KEY,
            'language': 'en-US',
          },
        });
      });

      const responses = await axios.all(requests);

      this.processCredits(responses);

      this.crossoverSearchStatus = 'success';
    } catch(error) {
      this.crossoverSearchStatus = 'error';
      console.log('error fetching actor data');
      console.log(error);
    }
  }

  // lifecycle hooks
  async created() {
    const response = await axios.get('https://api.themoviedb.org/3/configuration', {
      params: {
        'api_key': process.env.VUE_APP_TMDB_API_KEY,
      },
    });

    this.imageService = new ImageService(response.data.images);
    this.isLoading = false;
  }

  // TODO - split this big mess out somewhere, somehow
  private processCredits(responses: any[]) {
    const moviesIdMap: { [id: number]: { actorCredits: any[]; id: number; title: string; releaseDate: string; posterPath: string } } = {};

    const actorIdRegex = /https:\/\/api\.themoviedb\.org\/3\/person\/(\d+)\/movie_credits/;

    responses.forEach((response: any) => {
      // TODO - find a better way to pair up the Actor ID to the response
      const actorId = Number(response.config.url.match(actorIdRegex)[1]);
      const actor = this.actors.find(actor => actor.id === actorId);

      const castCredits = response.data.cast;
      castCredits.forEach((castCredit: any) => {
        const movieId: number = castCredit.id;
        const actorCredit = { id: castCredit.credit_id, actorName: actor.name, characterName: castCredit.character };

        if (moviesIdMap[movieId]) {
          moviesIdMap[movieId].actorCredits.push(actorCredit);
        } else { // initialize movie
          const { title, release_date, poster_path } = castCredit;
          moviesIdMap[movieId] = {
            id: movieId,
            title: title,
            releaseDate: release_date,
            posterPath: poster_path,
            actorCredits: [actorCredit]
          };
        }
      });
    });

    const crossoverMovieIds = Object.keys(moviesIdMap).filter((stringKey: string) => {
      return moviesIdMap[Number(stringKey)].actorCredits.length > 1;
    });

    crossoverMovieIds.forEach((movieIdString: string) => {
      const movie = moviesIdMap[Number(movieIdString)];
      this.crossoverMovies.push(movie);
    });
  }
}
</script>

<style src="./assets/tailwind.css">
