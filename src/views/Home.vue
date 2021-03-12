<template>
  <div class="home">
    <div class="container">
      <ImagesList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ImagesList from "@/components/ImagesList.vue";

export default {
  name: "Home",
  components: {
    ImagesList,
  },
};
</script>

<style lang="scss">
.home {
  padding-top: 104px;
}
</style>
