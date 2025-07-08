import { Tooltip } from "components/commons";
import { t } from "i18next";
import { Rating } from "neetoicons";

const Header = ({ showDetails, favourites, handleToggleFavourite, showId }) => {
  const handleTooltipContent = () => {
    if (showId in favourites) {
      return t("favourites.removeWarning");
    }

    return t("favourites.add");
  };

  const handleStarFill = () => (showId in favourites ? "gold" : "none");

  return (
    <div className="Header mb-3 self-start">
      <div className="Title">
        <h1 className="text-[32px] font-bold">
          {showDetails?.title}
          <Tooltip placement="right" tooltipContent={handleTooltipContent()}>
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
  );
};

export default Header;
