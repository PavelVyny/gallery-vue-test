<template>
  <div class="search">
    <input
      class="search__input"
      v-model="searchTerm"
      placeholder="Search GIF"
      type="text"
    />
    <button class="search__button" @click="submit()">Search</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    ...mapActions(["addGifs", "clearGifs", "addSearchLoad", "addSearchTerm"]),
    submit() {
      this.addSearchLoad();
      this.addSearchTerm(this.searchTerm);
      this.clearGifs();
      this.addGifs();
    }
  }
};
</script>

<style lang="scss">
.search {
  min-width: 65%;
  display: flex;
  position: relative;

  @media screen and (max-width: 1024px) {
    margin-top: 10px;
  }

  &::before {
    width: 18px;
    height: 18px;
    position: absolute;
    content: "";
    top: 50%;
    left: 19px;
    transform: translateY(-50%);
    background-image: url("../assets/loop.svg");
  }

  &__input {
    min-height: 56px;
    width: 100%;
    padding: 18px 18px 18px 48px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 4px;

    @media screen and (max-width: 1024px) {
      min-height: 24px;
      padding: 8px 8px 8px 48px;
    }

    &::placeholder {
      color: #c0c0c0;
    }

    &:focus {
      outline: 0;
    }
  }

  &__button {
    cursor: pointer;
  }
}
</style>
