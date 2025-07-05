import { create } from "zustand";

const useFavouritesStore = create(set => ({
  favourites: JSON.parse(localStorage.getItem("favourites")) || {},
  toggleFavourite: ({ imdbID, title, imdbRating }) =>
    set(state => {
      const updatedFavourites = { ...state.favourites };
      if (updatedFavourites[imdbID]) {
        delete updatedFavourites[imdbID];
      } else {
        updatedFavourites[imdbID] = { title, imdbRating };
      }
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

      return { favourites: updatedFavourites };
    }),
}));

export default useFavouritesStore;
