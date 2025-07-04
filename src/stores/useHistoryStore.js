import create from "zustand";

export const useHistoryStore = create(set => ({
  history: JSON.parse(localStorage.getItem("history")) || [],
  setHistory: newHistory => {
    set({ history: newHistory });
    localStorage.setItem("history", JSON.stringify(newHistory));
  },
  addOrMoveToTop: (imdbID, title) =>
    set(state => {
      const exists = state.history.some(
        item => Object.keys(item)[0] === imdbID
      );
      if (exists) {
        return {};
      }
      const updated = [{ [imdbID]: title }, ...state.history];
      localStorage.setItem("history", JSON.stringify(updated));

      return { history: updated };
    }),
  clearHistory: () => {
    set({ history: [] });
    localStorage.removeItem("history");
  },
}));
