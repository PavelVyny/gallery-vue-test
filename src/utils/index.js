export const buildGifs = result => {
	return result.data
		.map((gif) => gif.id)
		.map((gifId) => {
			return `https://media.giphy.com/media/${gifId}/200w.webp`;
		});
}

export const bottomVisible = () => {
	const scrollY = window.scrollY;
	const visible = document.documentElement.clientHeight;
	const pageHeight = document.documentElement.scrollHeight;
	const bottomOfPage = visible + scrollY >= pageHeight;
	return bottomOfPage || pageHeight < visible;
  }