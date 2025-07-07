import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouritesStore = create(
  persist(
    set => ({
      favourites: {},
      toggleFavourite: ({ imdbID, title, imdbRating }) =>
        set(state => {
          const updatedFavourites = { ...state.favourites };
          if (updatedFavourites[imdbID]) {
            delete updatedFavourites[imdbID];
          } else {
            updatedFavourites[imdbID] = { title, imdbRating };
          }

          return { favourites: updatedFavourites };
        }),
    }),
    {
      name: "favourites",
      getStorage: () => localStorage,
    }
  )
);

export default useFavouritesStore;
