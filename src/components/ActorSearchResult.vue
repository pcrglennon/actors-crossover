<template>
  <div class="flex items-center border border-black mb-2">
    <div
      :style="{ 'background-image': `url(${imageThumbnailUrl})` }"
      class="w-16 h-16 bg-no-repeat bg-center"
    />

    <h5>{{ actor.name }}</h5>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ActorSearchResult extends Vue {
  // TODO - create Actor interface
  @Prop({ required: true }) readonly actor!: any;
  @Prop({ required: true }) readonly imagesConfiguration!: any;

  get imageThumbnailUrl() {
    if (this.actor.profile_path) {
    return this.imagesConfiguration.secure_base_url +
            this.thumbnailSize +
            this.actor.profile_path;
    } else {
      return 'https://via.placeholder.com/45';
    }
  }

  get thumbnailSize() {
    return this.imagesConfiguration.profile_sizes[0]; // 'w45'
  }
}
</script>
