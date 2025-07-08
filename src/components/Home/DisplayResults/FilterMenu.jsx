import { MIN_ALLOWED_YEAR, MAX_ALLOWED_YEAR } from "constants/constant";

import { t } from "i18next";
import { Close } from "neetoicons";
import { Input, Checkbox } from "neetoui";
import { displayYearRangeError } from "utils/displayYearRangeError";

const FilterMenu = ({
  isFilterOpen,
  setIsFilterOpen,
  year,
  setYear,
  updateQueryParams,
  getShowType,
  checkedTypes,
  setCheckedTypes,
}) => {
  const [isMovieChecked, isSeriesChecked] = checkedTypes;

  const validateYear = ({ target: { value } }) => {
    const maxYear = MAX_ALLOWED_YEAR;
    if (value === "") {
      setYear("");

      return "";
    }

    const numericValue = Number(value);
    if (numericValue <= maxYear) {
      setYear(value);

      return value;
    }
    setYear(String(maxYear));
    displayYearRangeError();

    return String(maxYear);
  };

  const handleYearChange = event => {
    const validatedValue = validateYear(event);
    if (validatedValue >= MIN_ALLOWED_YEAR || validatedValue === "") {
      updateQueryParams({ searchYear: validatedValue });
    }
  };

  const handleMovieCheck = () => {
    setCheckedTypes(([movie, series]) => {
      const newChecked = [!movie, series];
      updateQueryParams({ type: getShowType(newChecked) });

      return newChecked;
    });
  };

  const handleSeriesCheck = () => {
    setCheckedTypes(([movie, series]) => {
      const newChecked = [movie, !series];
      updateQueryParams({ type: getShowType(newChecked) });

      return newChecked;
    });
  };

  return (
    isFilterOpen && (
      <div className="absolute right-0 top-10 z-10 w-[26rem] cursor-default rounded-lg border bg-white py-6 pl-4 pr-12 shadow-lg">
        <Input
          label={t("inputLabels.year")}
          max={MAX_ALLOWED_YEAR}
          min={MIN_ALLOWED_YEAR}
          placeholder={t("searchBar.yearPlaceholder")}
          type="number"
          value={year}
          onChange={handleYearChange}
        />
        <div className="mt-6 flex flex-col items-start space-y-2">
          <h3 className="font-medium">{t("inputLabels.type")}</h3>
          <div className="flex items-center space-x-16">
            <Checkbox
              checked={isMovieChecked}
              id="movie"
              label={t("inputLabels.movie")}
              onChange={handleMovieCheck}
            />
            <Checkbox
              checked={isSeriesChecked}
              id="series"
              label={t("inputLabels.series")}
              onChange={handleSeriesCheck}
            />
          </div>
        </div>
        <div
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setIsFilterOpen(false)}
        >
          <Close size={18} />
        </div>
      </div>
    )
  );
};
export default FilterMenu;
