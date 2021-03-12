<template>
  <div v-if="!images.length" class="loading">Loading...</div>
  <div class="images-list">
    <div v-for="gif in images" :key="gif.id" v-bind:class="[itemClass]">
      <button @click="clickFavorite(gif)" class="images-list__button"></button>
      <img :src="gif" class="images-list__image" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ImagesList",
  props: {
    images: Array,
  },
  data() {
    return {
      itemClass: "images-list__item",
    };
  },
  methods: {
    ...mapActions(["addFavoriteGif"]),
    clickFavorite(gif) {
      this.addFavoriteGif(gif);
    },
  },
};
</script>

<style lang="scss">
.images-list {
  padding-top: 32px;
  display: flex;
  flex-wrap: wrap;

  &__item {
    display: block;
    width: calc(25% - (24px * 3) / 4);
    height: 368px;
    margin-bottom: 24px;
    position: relative;
    margin-right: 24px;

    &:nth-of-type(4n + 4) {
      margin-right: 0;
    }

    @media screen and (max-width: 1024px) {
      width: calc(50% - 24px / 2);

      &:nth-of-type(2n + 2) {
        margin-right: 0;
      }
    }

    @media screen and (max-width: 540px) {
      width: 100%;
      margin-right: 0;
    }

    &:hover {
      .images-list__button {
        display: block;
      }
    }
  }

  &__image {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__button {
    display: none;
    width: 40px;
    height: 32px;
    background-color: #fff;
    border-radius: 2px;
    position: absolute;
    content: "";
    top: 16px;
    right: 16px;
    padding: 0;
    border: 0;
    cursor: pointer;

    &:hover {
      &::before {
        transition: filter 0.5s ease-out;
        filter: brightness(0.5);
      }
    }

    &::before {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 15px;
      height: 14px;
      background-image: url("../assets/like.svg");
      background-size: 100% 100%;
      filter: brightness(1);
      transition: filter 0.3s ease-out;
    }

    &:focus {
      outline: 0;
    }
    &_trash {
      &::before {
        width: 11px;
        height: 14px;
        background-image: url("../assets/trash.svg");
      }
    }
  }
}

.loading {
  margin: 30px;
  font-size: 24px;
}
</style>
