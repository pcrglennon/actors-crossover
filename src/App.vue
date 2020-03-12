<template>
  <div id="app" class="container mx-auto mt-32">
    <h1>Actors Crossover</h1>

    <div class="flex">
      <actor-search />
    </div>

    <div class="flex justify-center border-t-2 border-black mt-32 py-12">
      <a href="https://www.themoviedb.org" target="_none">
        <img alt="Powered by The Movie DB" src="https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ActorSearch from './components/ActorSearch.vue';

@Component({
  components: {
    ActorSearch
  },
})
export default class App extends Vue {
  // TODO - create Actor interface
  actors = [];
}
</script>

<style src="./assets/tailwind.css">
