export const getUpdatedHistory = (history, imdbID, title) => {
  const exists = history.some(item => Object.keys(item)[0] === imdbID);
  if (!exists) {
    return [{ [imdbID]: title }, ...history];
  }

  return history;
};

export const getUpdatedLastViewedIds = (lastViewedIds, imdbID) => {
  const filtered = lastViewedIds.filter(id => id !== imdbID);

  return [imdbID, ...filtered];
};

export const getHistoryAfterDelete = (history, imdbID) =>
  history.filter(item => Object.keys(item)[0] !== imdbID);

export const getLastViewedIdsAfterDelete = (lastViewedIds, imdbID) =>
  lastViewedIds.filter(id => id !== imdbID);
