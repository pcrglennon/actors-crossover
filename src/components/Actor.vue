<template>
  <div class="flex items-center border border-black mb-4 p-4">
    <div
      :style="{ 'background-image': `url(${profileImageUrl})` }"
      class="w-32 h-32 bg-no-repeat bg-center"
    />

    <h4>{{ actor.name }}</h4>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import ImageService from '../services/image_service';

@Component
export default class ActorSearchResult extends Vue {
  // TODO - create Actor interface
  @Prop({ required: true }) readonly actor!: any;
  @Prop({ required: true }) readonly imageService!: ImageService;

  get profileImageUrl() {
    return this.imageService.profileImageUrl(this.actor.profile_path);
  }
}
</script>
