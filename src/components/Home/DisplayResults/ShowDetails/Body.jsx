import { FALLBACK_IMAGE_URL } from "constants/constant";

import { t } from "i18next";
import { fallbackHelper } from "utils/fallbackHelper";

import Label from "./Label";

const Body = ({ title, poster, plot, labels }) => (
  <div className="Body mt-4 flex min-h-[350px] w-full flex-row gap-6">
    <div className="Poster w-2/5">
      <div className="w-max rounded-2xl border-8 border-gray-200 shadow-2xl">
        <img
          alt={title}
          className="rounded-lg"
          src={fallbackHelper(poster, FALLBACK_IMAGE_URL)}
          onError={({ target }) => {
            target.src = FALLBACK_IMAGE_URL;
          }}
        />
      </div>
    </div>
    <div className="Details flex w-3/5 flex-col justify-between">
      <p className="text-gray-600">
        {fallbackHelper(plot, t("error.noPlotDetails"))}
      </p>
      {labels.map((item, index) => (
        <Label content={item.content} key={index} label={item.label} />
      ))}
    </div>
  </div>
);

export default Body;
