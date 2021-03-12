/* eslint-disable prettier/prettier */
import { GiphyFetch } from "@giphy/js-fetch-api";
let apiKey = "wMqvSK3gHL65KRyFxTxyrNCUCJbskKtb";

const giphyFetch = new GiphyFetch(apiKey);

export default {
	state: {
		images: [],
		searchTerm: "",
		offset: 0,
		bottom: false,
		firstLoad: true,
		searchLoad: false,
	},
	mutations: {
		updateImages(state, images) {
			state.images = images
		}
	},
	actions: {
		async createInitialGifs(ctx, limit, offset) {
			try {
				const result = await giphyFetch.trending({
					limit: limit,
					offset: offset,
				});

				this.buildGifs(result);
			} catch (error) {
				console.error(`trending`, error);
			}
		}
	},
	getters: {}
};
