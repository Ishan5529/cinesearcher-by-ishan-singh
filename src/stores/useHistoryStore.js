import create from "zustand";
import { persist } from "zustand/middleware";

const useHistoryStore = create(
  persist(
    set => ({
      history: [],
      lastViewedIds: [],
      viewKey: 0,
      setHistory: newHistory => set({ history: newHistory }),
      setLastViewedId: imdbID => {
        set(state => {
          const filtered = state.lastViewedIds.filter(id => id !== imdbID);
          const updated = [imdbID, ...filtered];

          return { lastViewedIds: updated };
        });
      },
      addOrMoveToTop: (imdbID, title) =>
        set(state => {
          const exists = state.history.some(
            item => Object.keys(item)[0] === imdbID
          );
          const filtered = state.lastViewedIds.filter(id => id !== imdbID);
          const updatedLastViewedIds = [imdbID, ...filtered];
          let updatedHistory = state.history;
          if (!exists) {
            updatedHistory = [{ [imdbID]: title }, ...state.history];
          }

          return {
            history: updatedHistory,
            lastViewedIds: updatedLastViewedIds,
            viewKey: state.viewKey + 1,
          };
        }),
      deleteFromHistory: imdbID =>
        set(state => {
          const updatedHistory = state.history.filter(
            item => Object.keys(item)[0] !== imdbID
          );

          const updatedLastViewedIds = state.lastViewedIds.filter(
            id => id !== imdbID
          );

          return {
            history: updatedHistory,
            lastViewedIds: updatedLastViewedIds,
          };
        }),
      clearHistory: () => set({ history: [], lastViewedIds: [] }),
    }),
    {
      name: "history-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useHistoryStore;
