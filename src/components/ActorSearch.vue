<template>
  <div class="flex flex-col">
    <input
      v-model="searchQuery"
      placeholder="Enter Actor name"
      class="w-1/2 border border-black mr-6 p-2"
      @keydown="doSearch"
    >

    <div v-if="searchStatus === 'in-progress'">
      <p class="italic">Fetching...</p>
    </div>

    <div v-else-if="searchStatus === 'success'">
      <div
        v-for="actor in actorResults"
        :key="actor.id"
      >
        <actor-search-result
          :actor="actor"
          :image-service="imageService"
          @click.native="clickActor(actor)"
        />
      </div>

      <div v-if="actorResults.length <= 0">
        <p>No results</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';

import ActorSearchResult from './ActorSearchResult.vue';
import ImageService from '../services/image_service';

@Component({
  components: {
    ActorSearchResult,
  },
})
export default class ActorSearch extends Vue {
  @Prop({ required: true }) readonly imageService!: ImageService;

  searchQuery = '';
  searchStatus = 'ready';
  // TODO - create Actor interface
  actorResults = [];

  clickActor(actor: any) {
    this.$emit('addActor', actor);
    this.resetSearch();
  }

  resetSearch() {
    this.actorResults = [];
    this.searchStatus = 'ready';
  }

  async doSearch() {
    try {
      if (this.searchStatus === 'in-progress' || this.searchQuery.length < 2) {
        return;
      }

      this.searchStatus = 'in-progress';
      // NB - API key value is still discoverable via source code & watching network requests.
      // Move logic to a new server-side app if needed.
      const response = await axios.get('https://api.themoviedb.org/3/search/person', {
        params: {
          'query': this.searchQuery,
          'api_key': process.env.VUE_APP_TMDB_API_KEY,
          'language': 'en-US',
          'page': 1,
          'include_adult': false, // keeping things SFW
        },
      });

      this.actorResults = response.data.results;
      this.searchStatus = 'success';
    } catch(error) {
      this.searchStatus = 'error';
      console.log('error fetching actor data');
      console.log(error);
    }
  }
}
</script>
