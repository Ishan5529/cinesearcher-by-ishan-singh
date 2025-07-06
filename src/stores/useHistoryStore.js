import create from "zustand";

export const useHistoryStore = create(set => ({
  history: JSON.parse(localStorage.getItem("history")) || [],
  lastViewedId: localStorage.getItem("lastViewedId") || null,
  viewKey: 0,
  setHistory: newHistory => {
    set({ history: newHistory });
    localStorage.setItem("history", JSON.stringify(newHistory));
  },
  setLastViewedId: imdbID => {
    set({ lastViewedId: imdbID });
    localStorage.setItem("lastViewedId", imdbID);
  },
  addOrMoveToTop: (imdbID, title) =>
    set(state => {
      const exists = state.history.some(
        item => Object.keys(item)[0] === imdbID
      );
      localStorage.setItem("lastViewedId", imdbID);

      let updatedHistory = state.history;
      if (!exists) {
        updatedHistory = [{ [imdbID]: title }, ...state.history];
        localStorage.setItem("history", JSON.stringify(updatedHistory));
      }

      return {
        history: updatedHistory,
        lastViewedId: imdbID,
        viewKey: state.viewKey ^ 1,
      };
    }),
  clearHistory: () => {
    set({ history: [], lastViewedId: null });
    localStorage.removeItem("history");
    localStorage.removeItem("lastViewedId");
  },
}));
