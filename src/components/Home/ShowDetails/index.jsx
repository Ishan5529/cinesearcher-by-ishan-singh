import { FALLBACK_IMAGE_URL } from "constants/constant";

import { PageLoader, Tooltip } from "components/commons";
import { useOmdbShow } from "hooks/reactQuery/useOmdbApi";
import { t } from "i18next";
import { Rating } from "neetoicons";
import { Modal } from "neetoui";
import useFavouritesStore from "stores/useFavouritesStore";
import { fallbackHelper } from "utils/fallbackHelper";

import Label from "./Label";

const ShowDetails = ({ showId, isOpen, setIsOpen }) => {
  const { favourites, toggleFavourite } = useFavouritesStore();

  const { data, isLoading } = useOmdbShow({ i: showId });

  const showDetails = data;

  const labels = [
    { content: showDetails?.director, label: t("showDetails.director") },
    { content: showDetails?.actors, label: t("showDetails.cast") },
    { content: showDetails?.boxOffice, label: t("showDetails.boxOffice") },
    { content: showDetails?.year, label: t("showDetails.year") },
    { content: showDetails?.runtime, label: t("showDetails.runtime") },
    { content: showDetails?.language, label: t("showDetails.language") },
    { content: showDetails?.imdbRating, label: t("showDetails.rating") },
    { content: showDetails?.rated, label: t("showDetails.rated") },
  ];

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
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    showDetails && (
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
                  src={fallbackHelper(showDetails?.poster, FALLBACK_IMAGE_URL)}
                  onError={({ target }) => {
                    target.src = FALLBACK_IMAGE_URL;
                  }}
                />
              </div>
            </div>
            <div className="Details flex w-3/5 flex-col justify-between">
              <p className="text-gray-600">
                {fallbackHelper(showDetails?.plot, t("error.noPlotDetails"))}
              </p>
              {labels.map((item, index) => (
                <Label content={item.content} key={index} label={item.label} />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default ShowDetails;
