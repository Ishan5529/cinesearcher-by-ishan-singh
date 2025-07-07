export const getToggledFavourites = (
  favourites,
  { imdbID, title, imdbRating }
) => {
  const updatedFavourites = { ...favourites };
  if (updatedFavourites[imdbID]) {
    delete updatedFavourites[imdbID];
  } else {
    updatedFavourites[imdbID] = { title, imdbRating };
  }

  return updatedFavourites;
};
