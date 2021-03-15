import { GiphyFetch } from "@giphy/js-fetch-api";
import { buildGifs, bottomVisible } from "../../utils";
import config from "../../config";
const giphyFetch = new GiphyFetch(config.apiKey);

export default {
  state: {
    images: [],
    favoriteImages: [],
    searchTerm: "",
    offset: 0,
    limit: 20,
    isBottom: false,
    firstLoad: true,
    searchLoad: false
  },
  mutations: {
    updateGifs(state, images) {
      state.images = state.images.concat(images);
    },
    removeGifs(state) {
      state.images = [];
    },
    updateScrollBottom(state, isBottom) {
      state.isBottom = isBottom;
    },
    updateOffset(state, offset) {
      state.offset = offset;
    },
    updateFirstLoad(state, firstLoad) {
      state.firstLoad = firstLoad;
    },
    updateSearchLoad(state, searchLoad) {
      state.searchLoad = searchLoad;
    },
    updateSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    updateFavoriteGifs(state, favoriteGif) {
      state.favoriteImages = state.favoriteImages.concat(favoriteGif);
    },
    deleteFavoriteGif(state, favoriteGif) {
      state.favoriteImages = state.favoriteImages.filter(
        e => e !== favoriteGif
      );
    }
  },
  actions: {
    // fetch gifs initialy
    async createInitialGifs({ commit, state }) {
      try {
        let result = await giphyFetch.trending({
          limit: state.limit,
          offset: state.offset
        });
        result = buildGifs(result);
        commit("updateGifs", result);
      } catch (error) {
        console.error(`trending`, error);
      }
    },
    // fetch gifs from search request
    async createSearchGifs({ commit, state }) {
      try {
        let result = await giphyFetch.search(state.searchTerm, {
          limit: state.limit,
          offset: state.offset
        });
        result = buildGifs(result);
        commit("updateGifs", result);
      } catch (error) {
        console.error(`search`, error);
      }
    },
    clearGifs({ commit }) {
      commit("removeGifs");
    },
    // dispatch one of fetch actions (initial or search) depends on state params
    addGifs({ dispatch, state }) {
      // if it's not initial loading then add next gif's (for lazy loading)
      // if its initial loading - clear images array
      !state.firstLoad
        ? dispatch("addOffset") //action addOffset, mutation updateOffset
        : dispatch("disableFirstLoad"); //action disableFirstLoad, mutation updateFirstLoad

      if (state.searchLoad) {
        dispatch("createSearchGifs");
      } else {
        dispatch("createInitialGifs");
      }
    },
    scrollBottom({ commit }) {
      let result = bottomVisible();
      commit("updateScrollBottom", result);
    },
    addOffset({ commit, state }) {
      let result = (state.offset += state.limit);
      commit("updateOffset", result);
    },
    disableFirstLoad({ commit }) {
      let result = false;
      commit("updateFirstLoad", result);
    },
    addSearchLoad({ commit }) {
      let result = true;
      commit("updateSearchLoad", result);
    },
    addSearchTerm({ commit }, searchTerm) {
      let result = searchTerm;
      commit("updateSearchTerm", result);
    },
    addFavoriteGif({ commit }, favoriteGif) {
      let result = favoriteGif;
      commit("updateFavoriteGifs", result);
    },
    removeFavoriteGif({ commit }, favoriteGif) {
      let result = favoriteGif;
      commit("deleteFavoriteGif", result);
    }
  }
};
