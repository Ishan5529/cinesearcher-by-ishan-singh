import {
  getUpdatedHistory,
  getUpdatedLastViewedIds,
  getHistoryAfterDelete,
  getLastViewedIdsAfterDelete,
} from "utils/historyStoreUtils";
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
        set(state => ({
          lastViewedIds: getUpdatedLastViewedIds(state.lastViewedIds, imdbID),
        }));
      },
      addOrMoveToTop: (imdbID, title) =>
        set(state => ({
          history: getUpdatedHistory(state.history, imdbID, title),
          lastViewedIds: getUpdatedLastViewedIds(state.lastViewedIds, imdbID),
          viewKey: state.viewKey + 1,
        })),
      deleteFromHistory: imdbID =>
        set(state => ({
          history: getHistoryAfterDelete(state.history, imdbID),
          lastViewedIds: getLastViewedIdsAfterDelete(
            state.lastViewedIds,
            imdbID
          ),
        })),
      clearHistory: () => set({ history: [], lastViewedIds: [] }),
    }),
    {
      name: "history-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useHistoryStore;
