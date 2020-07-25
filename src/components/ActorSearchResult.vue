<template>
  <div class="flex items-center border border-black mb-2 p-2 cursor-pointer">
    <div
      :style="{ 'background-image': `url(${imageUrl})` }"
      class="w-16 h-16 bg-no-repeat bg-center"
    />

    <h5>{{ actor.name }}</h5>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import ImageService from '../services/image_service';

@Component
export default class ActorSearchResult extends Vue {
  // TODO - create Actor interface
  @Prop({ required: true }) readonly actor!: any;

  imageService = new ImageService();

  get imageUrl() {
    return this.imageService.thumbnailImageUrl(this.actor.profile_path);
  }
}
</script>
