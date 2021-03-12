<template>
  <div v-if="!images.length" class="loading">
    Favorites is empty, hurry up to choose your favorite pics!
  </div>
  <div class="images-list">
    <div v-for="gif in images" :key="gif.id" class="images-list__item">
      <button
        @click="clickToRemove(gif)"
        class="images-list__button images-list__button_trash"
      ></button>
      <img :src="gif" class="images-list__image" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FavoritesList",
  props: {
    images: Array
  },
  methods: {
    ...mapActions(["removeFavoriteGif"]),
    clickToRemove(gif) {
      this.removeFavoriteGif(gif);
    }
  }
};
</script>
