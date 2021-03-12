/* eslint-disable prettier/prettier */
import { GiphyFetch } from "@giphy/js-fetch-api";
import { buildGifs, bottomVisible } from "../../utils";
let apiKey = "wMqvSK3gHL65KRyFxTxyrNCUCJbskKtb";
const giphyFetch = new GiphyFetch(apiKey);

export default {
	state: {
		images: [],
		searchTerm: "",
		offset: 0,
		limit: 20,
		isBottom: false,
		firstLoad: true,
		searchLoad: false,
	},
	mutations: {
		updateGifs(state, images) {
			state.images = images
		},
		updateScrollBottom(state, isBottom) {
			state.isBottom = isBottom
		},
		updateOffset(state, offset) {
			state.offset = offset
		},
		updateFirstLoad(state, firstLoad) {
			state.firstLoad = firstLoad
		},
		updateSearchLoad(state, searchLoad) {
			state.searchLoad = searchLoad
		}
	},
	actions: {
		async createInitialGifs({ commit, state }) {
			try {
				let result = await giphyFetch.trending({
					limit: state.limit,
					offset: state.offset,
				});
				result = buildGifs(result);
				commit('updateGifs', result)
			} catch (error) {
				console.error(`trending`, error);
			}
		},

		async createSearchGifs({ commit, state }) {
			try {
				let result = await giphyFetch.search(state.searchTerm, {
					limit: state.limit,
					offset: state.offset,
				});
				buildGifs(result);
				commit('updateGifs', result)
			} catch (error) {
				console.error(`search`, error);
			}
		},
		addGifs({ dispatch, state }) {
			// if it's not initial loading then add next gif's (for lazy loading)
			// if its initial loading - clear images array
			!state.firstLoad
				? (dispatch('addOffset')) //action addOffset, mutatuin updateOffset
				: (dispatch('disableFirstLoad')); //action disableFirstLoad, mutation updateFirstLoad

			if (state.searchLoad) {
				dispatch('addSearchLoad') //action addSearchtLoad, mutation updateSearchLoad
				dispatch('createSearchGifs')
			} else {
				dispatch('createInitialGifs')
			}
		},
		scrollBottom({ commit }) {
			let result = bottomVisible();
			commit('updateScrollBottom', result)
		},
		addOffset({ commit, state }) {
			let result = state.offset += state.limit
			commit('updateOffset', result)
		},
		disableFirstLoad({ commit }) {
			let result = false;
			commit('updateFirstLoad', result)
		},
		addSearchLoad({commit}) {
			let result = true;
			commit('updateSearchLoad', result)
		}

	},
	getters: {}
};
