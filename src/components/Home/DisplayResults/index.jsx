import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "constants/constant";

import React, { useState, useEffect } from "react";

import MovieCard from "components/Home/DisplayResults/MovieCard";
import SearchBar from "components/Home/DisplayResults/SearchBar";
import ShowDetails from "components/Home/DisplayResults/ShowDetails";
import { useOmdbFetch } from "hooks/reactQuery/useOmdbApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { t } from "i18next";
import { Filter } from "neetoicons";
import { Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import { useHistoryStore } from "stores/useHistoryStore";
import { filterNonNullAndEmpty } from "utils/filterNonNullAndEmpty";
import { buildUrl } from "utils/url";

import FilterMenu from "./FilterMenu";

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

  const getShowType = (movie = isMovieChecked, series = isSeriesChecked) => {
    if (movie && series) return ["movie", "series"];

    if (movie) return "movie";

    if (series) return "series";

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
        filterNonNullAndEmpty({
          ...params,
          page,
        })
      )
    );

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

  return (
    <div className="scroll-hidden flex h-full w-3/4 flex-col items-center overflow-y-auto border-2 bg-gray-50 px-10 py-10">
      <div className="flex w-full items-center justify-between space-x-4">
        <SearchBar
          isModalOpen={isOpen}
          placeHolder={t("searchBar.placeholder")}
          {...{ searchKey, setSearchKey, updateQueryParams }}
        />
        <div className="relative cursor-pointer">
          <Filter
            fill={isFilterOpen ? "lightgray" : "none"}
            onClick={() => setIsFilterOpen(prev => !prev)}
          />
          <FilterMenu
            {...{
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
            }}
          />
        </div>
      </div>
      <div className="mr-auto mt-8 flex flex-1 flex-row flex-wrap gap-4">
        {searchTerm &&
          search?.map((movie, index) => (
            <MovieCard key={index} {...{ clickDetails, movie, setShowId }} />
          ))}
      </div>
      <ShowDetails {...{ isOpen, setIsOpen, showId }} />
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
