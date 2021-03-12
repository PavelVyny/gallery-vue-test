<template>
  <div class="home">
    <div class="container">
      <ImagesList :images="images" />
    </div>
  </div>
</template>

<script>
import ImagesList from "@/components/ImagesList.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    ImagesList
  },
  computed: {
    ...mapState({
      images: (state) => state.imageList.images,
      searchTerm: (state) => state.imageList.searchTerm,
      offset: (state) => state.imageList.offset,
      isBottom: (state) => state.imageList.isBottom,
      firstLoad: (state) => state.imageList.firstLoad,
      searchLoad: (state) => state.imageList.searchLoad,
    })
  },
  watch: {
    bottom(newValue) {
      if (newValue) {
        this.addGifs(this.firstLoad, this.searchLoad);
      }
    },
  },
  created() {
    window.addEventListener("scroll", () => {
      this.scrollBottom();
    });
    this.addGifs(this.firstLoad, this.searchLoad);
  },
  methods: {
    ...mapActions(["addGifs", "scrollBottom"]),
  },
};
</script>

<style lang="scss">
.home {
  padding-top: 104px;
}
</style>
