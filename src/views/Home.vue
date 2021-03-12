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
      images: state => state.imageList.images,
      isBottom: state => state.imageList.isBottom
    })
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom();
    });
    this.addGifs();
  },
  methods: {
    ...mapActions(["addGifs", "scrollBottom"]),
    bottom() {
      this.scrollBottom();
      if (this.isBottom) {
        this.addGifs();
      }
    }
  }
};
</script>

<style lang="scss">
.home {
  padding-top: 104px;
}
</style>
