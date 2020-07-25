<template>
  <div class="border border-black mb-4 p-4">
    <div class="flex items-center">
      <div
        :style="{ 'background-image': `url(${posterImageUrl})` }"
        class="w-32 h-32 bg-no-repeat bg-center"
      />

      <div>
        <h4 class="mb-2">
          {{ movie.title }}
        </h4>

        <h6 class="mb-2">
          Release date: {{ movie.release_date }}
        </h6>

        <ul>
          <li
            v-for="actorCredit in movie.actor_credits"
            :key="actorCredit.actor_id"
          >
            {{ actorCredit.actor_name }}: {{ actorCredit.character }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import ImageService from '../services/image_service';

@Component
export default class Movie extends Vue {
  // TODO - create Movie interface
  @Prop({ required: true }) readonly movie!: any;
  @Prop({ required: true }) readonly imageService!: ImageService;

  get posterImageUrl() {
    return this.imageService.profileImageUrl(this.movie.poster_path);
  }
}
</script>
