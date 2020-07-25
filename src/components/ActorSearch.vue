<template>
  <div class="flex flex-col">
    <input
      v-model="searchQuery"
      placeholder="Enter Actor name"
      class="w-1/2 border border-black mr-6 p-2"
      @keyup="doSearch"
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

@Component({
  components: {
    ActorSearchResult,
  },
})
export default class ActorSearch extends Vue {
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

      const response = await axios.get(`${process.env.VUE_APP_API_URL_BASE}/movie-db-utils/tmdb-api-proxy/search/person`, {
        params: {
          'query': this.searchQuery,
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
