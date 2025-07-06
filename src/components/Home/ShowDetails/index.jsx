import { FALLBACK_IMAGE_URL } from "constants/constant";

import { useState, useEffect } from "react";

import omdbApi from "apis/Omdb";
import { PageLoader, Tooltip } from "components/commons";
import { t } from "i18next";
import { Rating } from "neetoicons";
import { Modal } from "neetoui";
import useFavouritesStore from "stores/useFavouritesStore";

const ShowDetails = ({ showId, isOpen, setIsOpen }) => {
  const [showDetails, setShowDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { favourites, toggleFavourite } = useFavouritesStore();

  const fetchShowDetails = async () => {
    if (!showId) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await omdbApi.fetchById(showId);
      setShowDetails(() => response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShowDetails();
  }, [isOpen]);

  const handleTooltipContent = () => {
    if (showId in favourites) {
      return t("favourites.removeWarning");
    }

    return t("favourites.add");
  };

  const handleStarFill = () => (showId in favourites ? "gold" : "none");

  const handleToggleFavourite = () => {
    toggleFavourite({
      imdbID: showId,
      title: showDetails?.title,
      imdbRating: showDetails?.imdbRating,
    });
    console.log("Toggled favourite for showId:", showId);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    showDetails &&
    !isLoading && (
      <Modal
        isOpen={isOpen}
        style={{ width: "60%", minWidth: "50vw", margin: "0 auto" }}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col items-center p-6">
          <div className="Header mb-3 self-start">
            <div className="Title">
              <h1 className="text-[32px] font-bold">
                {showDetails?.title}
                <Tooltip
                  placement="right"
                  tooltipContent={handleTooltipContent()}
                >
                  <div
                    className="mb-1.5 ml-6 inline cursor-pointer"
                    onClick={handleToggleFavourite}
                  >
                    <Rating className="mb-1 inline" fill={handleStarFill()} />
                  </div>
                </Tooltip>
              </h1>
            </div>
            <div className="Genre flex flex-row gap-2">
              {showDetails?.genre?.split(",").map((genre, index) => (
                <span
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
                  key={index}
                >
                  {genre.trim()}
                </span>
              ))}
            </div>
          </div>
          <div className="Body mt-4 flex min-h-[350px] w-full flex-row gap-6">
            <div className="Poster w-2/5">
              <div className="w-max rounded-2xl border-8 border-gray-200 shadow-2xl">
                <img
                  alt={showDetails?.title}
                  className="rounded-lg"
                  src={showDetails?.poster || FALLBACK_IMAGE_URL}
                  onError={e => {
                    e.target.src = FALLBACK_IMAGE_URL;
                  }}
                />
              </div>
            </div>
            <div className="Details flex w-3/5 flex-col justify-between">
              <p className="text-gray-600">
                {showDetails?.plot !== "N/A"
                  ? showDetails?.plot
                  : t("error.noPlotDetails")}
              </p>
              <p>
                <strong>{t("showDetails.director")}:</strong>{" "}
                {showDetails?.director}
              </p>
              <p>
                <strong>{t("showDetails.cast")}:</strong> {showDetails?.actors}
              </p>
              <p>
                <strong>{t("showDetails.boxOffice")}:</strong>{" "}
                {showDetails?.boxOffice}
              </p>
              <p>
                <strong>{t("showDetails.year")}:</strong> {showDetails?.year}
              </p>
              <p>
                <strong>{t("showDetails.runtime")}:</strong>{" "}
                {showDetails?.runtime}
              </p>
              <p>
                <strong>{t("showDetails.language")}:</strong>{" "}
                {showDetails?.language}
              </p>
              <p>
                <strong>{t("showDetails.rating")}:</strong>{" "}
                {showDetails?.imdbRating}
              </p>
              <p>
                <strong>{t("showDetails.rated")}:</strong> {showDetails?.rated}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default ShowDetails;
