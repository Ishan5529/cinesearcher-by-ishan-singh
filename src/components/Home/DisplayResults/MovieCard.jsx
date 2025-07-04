import { FALLBACK_IMAGE_URL } from "constants/constant";

import { Tooltip } from "components/commons";
import { Button } from "neetoui";
import capitalize from "utils/capitalize";

const MovieCard = ({ movie, clickDetails }) => (
  <div className="flex h-96 w-72 flex-col justify-between gap-y-2 rounded-2xl px-4 py-2 shadow-2xl hover:bg-gray-100">
    <div>
      <div className="mb-2 flex items-center justify-center">
        <img
          alt={`${movie?.title} poster`}
          className="h-64 w-48 rounded-xl"
          src={movie?.poster ? movie?.poster : FALLBACK_IMAGE_URL}
          onError={e => {
            e.target.src = FALLBACK_IMAGE_URL;
          }}
        />
      </div>
      <Tooltip tooltipContent={movie?.title}>
        <h2 className="line-clamp-2 w-fit text-[20px] font-bold">
          {movie?.title}
        </h2>
      </Tooltip>
      <p className="text-gray-600">
        {capitalize(movie?.type)} • {movie?.year}
      </p>
    </div>
    <Button
      className="w-min text-nowrap bg-gray-100 text-blue-500"
      label="View details"
      size="small"
      style="secondary"
      type="button"
      onClick={clickDetails}
    />
  </div>
);

export default MovieCard;
