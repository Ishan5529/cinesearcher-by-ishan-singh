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
import useHistoryStore from "stores/useHistoryStore";
import { filterNonNullAndEmpty } from "utils/filterNonNullAndEmpty";
import { buildUrl } from "utils/url";
import { validatedYear } from "utils/validatedYear";

import FilterMenu from "./FilterMenu";

import { routes } from "../../../routes";

const DisplayResults = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [checkedTypes, setCheckedTypes] = useState([false, false]);
  const [showId, setShowId] = useState(null);
  const addOrMoveToTop = useHistoryStore.pickFrom();
  const {
    page = null,
    searchYear = "",
    type = "",
    searchTerm = "",
  } = useQueryParams();
  const [searchKey, setSearchKey] = useState(searchTerm || "");
  const [year, setYear] = useState("");
  const history = useHistory();

  const getShowType = ([movie, series]) => {
    if (movie && series) return "";

    if (movie) return "movie";

    if (series) return "series";

    setCheckedTypes(() => [true, true]);

    return "";
  };

  useEffect(() => {
    setSearchKey(searchTerm);
    setCheckedTypes(() => [
      type === "movie" || type === "",
      type === "series" || type === "",
    ]);
    setYear(searchYear || "");
  }, [searchTerm, searchYear, type]);

  const params = {
    searchTerm,
    searchYear: validatedYear(year, setYear),
    page: Number(page) || DEFAULT_PAGE_INDEX,
    type: getShowType(checkedTypes),
  };

  const { data: { search, totalResults } = {} } = useOmdbFetch({
    s: searchTerm.trim(),
    page: Number(page) || DEFAULT_PAGE_INDEX,
    type,
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
    setIsModalOpen(true);
    addOrMoveToTop(imdbID, title);
  };

  return (
    <div className="scroll-hidden flex h-full w-3/4 flex-col items-center overflow-y-auto border-2 bg-gray-50 px-10 py-10">
      <div className="flex w-full items-center justify-between space-x-6">
        <SearchBar
          placeHolder={t("searchBar.placeholder")}
          {...{ isModalOpen, searchKey, setSearchKey, updateQueryParams }}
        />
        <div className="relative cursor-pointer">
          <Filter
            className="hover:fill-gray-300"
            fill={isFilterOpen ? "lightgray" : "darkgray"}
            size={28}
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
              setCheckedTypes,
              checkedTypes,
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
      <ShowDetails {...{ isModalOpen, setIsModalOpen, showId }} />
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
