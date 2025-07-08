import { MIN_ALLOWED_YEAR, MAX_ALLOWED_YEAR } from "constants/constant";

import { isEmpty } from "ramda";
import { displayYearRangeError } from "utils/displayYearRangeError";

export const validatedYear = (year, setYear) => {
  if (Number(year) < MIN_ALLOWED_YEAR || isEmpty(year)) {
    return "";
  }

  if (Number(year) > MAX_ALLOWED_YEAR) {
    displayYearRangeError();
    setYear(String(MAX_ALLOWED_YEAR));

    return String(MAX_ALLOWED_YEAR);
  }

  return year;
};
