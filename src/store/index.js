import { createStore } from "vuex";
import imageList from "./modules/imageList";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    imageList
  },
  // connect favoriteImages from store to localStorage using vuex-persistedstate plugin
  plugins: [
    createPersistedState({
      paths: ["imageList.favoriteImages"]
    })
  ]
});
