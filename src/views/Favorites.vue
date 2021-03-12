<template>
  <div class="favorites">
    <div class="container">
      <FavoritesList :images="images" />
    </div>
  </div>
</template>

<script>
import FavoritesList from "@/components/FavoritesList.vue";
import { mapState } from "vuex";

export default {
  name: "Favorites",
  components: {
    FavoritesList
  },
  computed: {
    ...mapState({
      images: state => state.imageList.favoriteImages,
      isBottom: state => state.imageList.isBottom
    })
  }
};
</script>

<style lang="scss">
.favorites {
  padding-top: 104px;
}
</style>
