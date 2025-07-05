import { useState } from "react";

import { Tooltip, Alert } from "components/commons";
import ShowDetails from "components/Home/ShowDetails";
import { t } from "i18next";
import { Rating } from "neetoicons";
import { isEmpty } from "ramda";
import useFavouritesStore from "stores/useFavouritesStore";

const Favourites = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [showId, setShowId] = useState(null);
  const { favourites, toggleFavourite } = useFavouritesStore();

  const favouriteEntries = Object.entries(favourites);

  if (isEmpty(favouriteEntries)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-2xl font-bold">{t("favourites.empty")}</h1>
      </div>
    );
  }

  const handleDelete = imdbID => {
    setShowId(() => imdbID);
    setIsDeleteClicked(() => true);
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-y-auto px-16 py-12">
      {favouriteEntries &&
        favouriteEntries.map(([imdbID, { title, imdbRatings }]) => (
          <div className="m-2 flex rounded border px-6 py-4" key={imdbID}>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p>
                <strong>{t("showDetails.rating")}:</strong>{" "}
                <span className="text-base">{imdbRatings}</span>/10.0
              </p>
              <button
                className="mt-2 rounded bg-blue-500 px-4 py-1 text-white"
                onClick={() => {
                  setIsOpen(() => true);
                  setShowId(() => imdbID);
                }}
              >
                {t("buttonLabels.showDetails")}
              </button>
            </div>
            <Tooltip tooltipContent={t("favourites.removeWarning")}>
              <div onClick={() => handleDelete(imdbID)}>
                <Rating className="cursor-pointer" fill="gold" />
              </div>
            </Tooltip>
          </div>
        ))}
      <ShowDetails isOpen={isOpen} setIsOpen={setIsOpen} showId={showId} />
      <Alert
        action={() => toggleFavourite({ imdbID: showId })}
        buttonLabel={t("buttonLabels.remove")}
        isOpen={isDeleteClicked}
        setIsOpen={setIsDeleteClicked}
        showId={showId}
        title={`${t("favourites.removeWarning")}?`}
      />
    </div>
  );
};

export default Favourites;
