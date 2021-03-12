<template>
  <input v-model="searchTerm" type="text" />
  <button class="button" @click="addGifs(true, true)">Search</button>
  <div v-if="!images.length" class="loading">Loading...</div>
  <div class="images-list">
    <img v-for="gif in images" :src="gif" :key="gif.id" />
  </div>
</template>

<script>
import { GiphyFetch } from "@giphy/js-fetch-api";
import { mapState, mapActions } from "vuex";

let apiKey = "wMqvSK3gHL65KRyFxTxyrNCUCJbskKtb";
let limit = 20;
//fetch gifs using GIPHY API
const giphyFetch = new GiphyFetch(apiKey);

export default {
  computed: {
    ...mapState({
      images: state => state.imageList.images,
      searchTerm: state => state.imageList.searchTerm,
      offset: state => state.imageList.offset,
      bottom: state => state.imageList.bottom,
      firstLoad: state => state.imageList.firstLoad,
      searchLoad: state => state.imageList.searchLoad
    })
  },
  data() {
    return {
      searchTerm: "",
      images: [],
      offset: 0,
      bottom: false,
      firstLoad: true,
      searchLoad: false,
    };
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
      this.bottom = this.bottomVisible();
    });
    this.addGifs(this.firstLoad, this.searchLoad);
  },
  methods: {
    ...mapActions(["createInitialGifs"]),
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    createInitialGifs() {
      (async () => {
        try {
          const result = await giphyFetch.trending({
            limit: limit,
            offset: this.offset,
          });

          this.buildGifs(result);
        } catch (error) {
          console.error(`trending`, error);
        }
      })();
    },
    createSearchGifs() {
      (async () => {
        try {
          const result = await giphyFetch.search(this.searchTerm, {
            limit: limit,
            offset: this.offset,
          });
          this.buildGifs(result);
        } catch (error) {
          console.error(`trending`, error);
        }
      })();
    },
    addGifs(firstLoad, search) {
      //if it's not initial loading then add next gif's (for lazy loading)
      //if its initial loading - clear images array
      !firstLoad
        ? (this.offset += limit)
        : ((this.firstLoad = false), (this.images = []));

      if (search) {
        this.searchLoad = true;
        this.createSearchGifs();
      } else {
        this.createInitialGifs();
      }
      console.log("images:", this.images.length, "offset", this.offset);
    },
    buildGifs(result) {
      let newImages = result.data
        .map((gif) => gif.id)
        .map((gifId) => {
          return `https://media.giphy.com/media/${gifId}/giphy.gif`;
        });

      this.images = this.images.concat(newImages);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
