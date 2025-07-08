import { useState } from "react";

import { Tooltip, Alert } from "components/commons";
import ShowDetails from "components/Home/DisplayResults/ShowDetails";
import { t } from "i18next";
import { Rating } from "neetoicons";
import { isEmpty } from "ramda";
import useFavouritesStore from "stores/useFavouritesStore";
import useHistoryStore from "stores/useHistoryStore";
import withTitle from "utils/withTitle";

const Favourites = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [showId, setShowId] = useState(null);
  const { favourites, toggleFavourite } = useFavouritesStore.pick();
  const addOrMoveToTop = useHistoryStore.pickFrom();

  const favouriteEntries = Object.entries(favourites);

  if (isEmpty(favouriteEntries)) {
    return (
      <div className="flex h-4/5 w-full items-center justify-center">
        <h1 className="text-2xl font-bold">{t("favourites.empty")}</h1>
      </div>
    );
  }

  const handleDelete = imdbID => {
    setShowId(() => imdbID);
    setIsDeleteClicked(() => true);
  };

  const updateHistory = (imdbID, title) => {
    addOrMoveToTop(imdbID, title);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-gray-50 px-16 py-8">
      {favouriteEntries &&
        favouriteEntries.map(([imdbID, { title, imdbRating }]) => (
          <div
            className="m-2 flex rounded-lg border bg-white px-6 py-4 shadow-lg shadow-gray-400 hover:border hover:bg-blue-50"
            key={imdbID}
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p>
                <strong>{t("showDetails.rating")}:</strong>{" "}
                <span className="text-base">{imdbRating}</span> / 10.0
              </p>
              <button
                className="mt-2 rounded bg-blue-400 px-4 py-1 text-white hover:bg-blue-500"
                onClick={() => {
                  setIsModalOpen(() => true);
                  setShowId(() => imdbID);
                  updateHistory(imdbID, title);
                }}
              >
                {t("buttonLabels.showDetails")}
              </button>
            </div>
            <Tooltip tooltipContent={t("favourites.removeWarning")}>
              <div className="h-max" onClick={() => handleDelete(imdbID)}>
                <Rating
                  className="cursor-pointer hover:animate-spin-slow hover:fill-yellow-500"
                  fill="gold"
                />
              </div>
            </Tooltip>
          </div>
        ))}
      <ShowDetails {...{ isModalOpen, setIsModalOpen, showId }} />
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

export default withTitle(Favourites, "Favourites");
