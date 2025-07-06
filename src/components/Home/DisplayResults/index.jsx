import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "constants/constant";

import React, { useState, useEffect } from "react";

import MovieCard from "components/Home/DisplayResults/MovieCard";
import SearchBar from "components/Home/DisplayResults/SearchBar";
import ShowDetails from "components/Home/ShowDetails";
import { useOmdbFetch } from "hooks/reactQuery/useOmdbApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { t } from "i18next";
import { filterNonNull } from "neetocist";
import { Filter, Close } from "neetoicons";
import { Pagination, Input, Checkbox, Toastr } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import { Bounce } from "react-toastify";
import { useHistoryStore } from "stores/useHistoryStore";
import { buildUrl } from "utils/url";

import { routes } from "../../../routes";

const DisplayResults = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMovieChecked, setIsMovieChecked] = useState(false);
  const [isSeriesChecked, setIsSeriesChecked] = useState(false);
  const [showId, setShowId] = useState(null);
  const addOrMoveToTop = useHistoryStore(state => state.addOrMoveToTop);
  const { page, searchYear, type = "", searchTerm = "" } = useQueryParams();
  const [searchKey, setSearchKey] = useState(searchTerm || "");
  const [year, setYear] = useState("");
  const history = useHistory();

  const getShowType = () => {
    if (isMovieChecked && isSeriesChecked) {
      return ["movie", "series"];
    }

    if (isMovieChecked) {
      return "movie";
    }

    if (isSeriesChecked) {
      return "series";
    }

    return "";
  };

  const params = {
    searchTerm,
    searchYear,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    type: getShowType(),
  };

  useEffect(() => {
    setSearchKey(searchTerm);
    setIsMovieChecked(type === "movie" || type.includes("movie"));
    setIsSeriesChecked(type === "series" || type.includes("series"));
    setYear(searchYear || "");
  }, [searchTerm, searchYear]);

  useEffect(() => {
    updateQueryParams({ type: getShowType(), searchYear: year });
  }, [isMovieChecked, isSeriesChecked, year]);

  const { data: { search, totalResults } = {} } = useOmdbFetch({
    s: searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    type: getShowType(),
    y: searchYear,
  });

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.home.index,
        filterNonNull({
          ...params,
          page,
        })
      )
    );

  const filterNonNullAndEmpty = params => {
    const nonNullParams = filterNonNull(params);

    return Object.fromEntries(
      Object.entries(nonNullParams).filter(([_, value]) => !isEmpty(value))
    );
  };

  const updateQueryParams = useFuncDebounce(updatedValue => {
    const updatedParam = {
      ...params,
      ...updatedValue,
      page: DEFAULT_PAGE_INDEX,
    };

    history.push(
      isEmpty(updatedParam.searchTerm)
        ? buildUrl(routes.home.index)
        : buildUrl(routes.home.index, filterNonNullAndEmpty(updatedParam))
    );
  });

  const clickDetails = (imdbID, title) => {
    setIsOpen(true);
    addOrMoveToTop(imdbID, title);
  };

  const validateDate = event => {
    const value = event.target.value;
    const maxYear = new Date().getFullYear();
    if (value === "") {
      setYear("");

      return;
    }

    const numericValue = Number(value);
    if (numericValue <= maxYear) {
      setYear(value);
    } else {
      setYear(String(maxYear));
      Toastr.error(t("error.yearError"), {
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  return (
    <div className="scroll-hidden flex h-full w-3/4 flex-col items-center overflow-y-auto border-2 bg-gray-50 px-10 py-10">
      <div className="flex w-full items-center justify-between space-x-4">
        <SearchBar
          isModalOpen={isOpen}
          placeHolder={t("searchBar.placeholder")}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          updateQueryParams={updateQueryParams}
        />
        <div className="relative cursor-pointer">
          <Filter
            fill={isFilterOpen ? "lightgray" : "none"}
            onClick={() => setIsFilterOpen(prev => !prev)}
          />
          {isFilterOpen && (
            <div className="absolute right-0 top-10 z-10 w-96 cursor-default rounded-md border bg-white px-4 pb-4 pt-10 shadow-lg">
              <Input
                label={t("inputLabels.year")}
                max={new Date().getFullYear()}
                min={1900}
                placeholder="YYYY"
                type="number"
                value={year}
                onChange={validateDate}
              />
              <div className="mt-6 flex flex-col items-start space-y-2">
                <h3 className="font-medium">{t("inputLabels.type")}</h3>
                <div className="flex items-center space-x-16">
                  <Checkbox
                    checked={isMovieChecked}
                    id="movie"
                    label={t("inputLabels.movie")}
                    onChange={() => setIsMovieChecked(!isMovieChecked)}
                  />
                  <Checkbox
                    checked={isSeriesChecked}
                    id="series"
                    label={t("inputLabels.series")}
                    onChange={() => setIsSeriesChecked(!isSeriesChecked)}
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
          )}
        </div>
      </div>
      <div className="mr-auto mt-8 flex flex-1 flex-row flex-wrap gap-4">
        {searchTerm &&
          search?.map((movie, index) => (
            <MovieCard
              clickDetails={clickDetails}
              key={index}
              movie={movie}
              setShowId={setShowId}
            />
          ))}
      </div>
      <ShowDetails isOpen={isOpen} setIsOpen={setIsOpen} showId={showId} />
      {!isEmpty(searchTerm) && (
        <div className="mt-10 self-end">
          <Pagination
            className="neetix-pagination"
            count={totalResults || 1}
            navigate={handlePageNavigation}
            pageNo={Number(page) || DEFAULT_PAGE_INDEX}
            pageSize={DEFAULT_PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
};

export default DisplayResults;
