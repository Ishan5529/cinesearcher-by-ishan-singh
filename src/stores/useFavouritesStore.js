import { getToggledFavourites } from "utils/getToggledFavourites";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouritesStore = create(
  persist(
    set => ({
      favourites: {},
      toggleFavourite: payload =>
        set(state => ({
          favourites: getToggledFavourites(state.favourites, payload),
        })),
    }),
    {
      name: "favourites",
      getStorage: () => localStorage,
    }
  )
);

export default useFavouritesStore;
