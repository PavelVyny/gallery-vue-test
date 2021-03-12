<template>
  <!-- <input v-model="searchTerm" type="text" /> -->
  <!-- <button class="button" @click="addGifs(true, true)">Search</button> -->
  <div v-if="!images.length" class="loading">Loading...</div>
  <div class="images-list">
    <img v-for="gif in images" :src="gif" :key="gif.id" />
  </div>
</template>

<script>
export default {
  name: "ImagesList",
  props: {
    images: Array
  }
};
</script>

<style scoped lang="scss">
.images-list {
  padding-top: 32px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
img {
  display: block;
  width: calc(25% - (24px * 3) / 4);
  margin-bottom: 24px;
}
</style>
