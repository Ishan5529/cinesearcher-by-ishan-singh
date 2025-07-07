import { t } from "i18next";
import { Close } from "neetoicons";
import { Input, Checkbox, Toastr } from "neetoui";
import { Bounce } from "react-toastify";

const FilterMenu = ({
  isFilterOpen,
  setIsFilterOpen,
  year,
  setYear,
  updateQueryParams,
  getShowType,
  setIsMovieChecked,
  setIsSeriesChecked,
  isMovieChecked,
  isSeriesChecked,
}) => {
  const validateDate = ({ target: { value } }) => {
    const maxYear = new Date().getFullYear();
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
    Toastr.error(t("error.yearError"), {
      autoClose: 2000,
      transition: Bounce,
    });

    return String(maxYear);
  };

  const handleYearChange = event => {
    const validatedValue = validateDate(event);
    updateQueryParams({ searchYear: validatedValue });
  };

  const handleMovieCheck = () => {
    setIsMovieChecked(prev => {
      const newValue = !prev;
      updateQueryParams({
        type: getShowType(newValue, isSeriesChecked),
      });

      return newValue;
    });
  };

  const handleSeriesCheck = () => {
    setIsSeriesChecked(prev => {
      const newValue = !prev;
      updateQueryParams({
        type: getShowType(isMovieChecked, newValue),
      });

      return newValue;
    });
  };

  return (
    isFilterOpen && (
      <div className="absolute right-0 top-10 z-10 w-96 cursor-default rounded-md border bg-white px-4 pb-4 pt-10 shadow-lg">
        <Input
          label={t("inputLabels.year")}
          max={new Date().getFullYear()}
          min={1900}
          placeholder="YYYY"
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
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => setIsFilterOpen(false)}
        >
          <Close size={16} />
        </div>
      </div>
    )
  );
};
export default FilterMenu;
