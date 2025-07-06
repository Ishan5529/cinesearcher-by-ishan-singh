import create from "zustand";

export const useHistoryStore = create(set => ({
  history: JSON.parse(localStorage.getItem("history")) || [],
  lastViewedIds: JSON.parse(localStorage.getItem("lastViewedIds")) || [],
  viewKey: 0,
  setHistory: newHistory => {
    set({ history: newHistory });
    localStorage.setItem("history", JSON.stringify(newHistory));
  },
  setLastViewedId: imdbID => {
    set(state => {
      const filtered = state.lastViewedIds.filter(id => id !== imdbID);
      const updated = [imdbID, ...filtered];
      localStorage.setItem("lastViewedIds", JSON.stringify(updated));

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
      localStorage.setItem(
        "lastViewedIds",
        JSON.stringify(updatedLastViewedIds)
      );

      let updatedHistory = state.history;
      if (!exists) {
        updatedHistory = [{ [imdbID]: title }, ...state.history];
        localStorage.setItem("history", JSON.stringify(updatedHistory));
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
      localStorage.setItem("history", JSON.stringify(updatedHistory));
      localStorage.setItem(
        "lastViewedIds",
        JSON.stringify(updatedLastViewedIds)
      );

      return {
        history: updatedHistory,
        lastViewedIds: updatedLastViewedIds,
      };
    }),
  clearHistory: () => {
    set({ history: [], lastViewedId: [] });
    localStorage.removeItem("history");
    localStorage.removeItem("lastViewedId");
  },
}));
