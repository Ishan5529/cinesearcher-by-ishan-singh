import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "constants/constant";

import React, { useState } from "react";

import MovieCard from "components/Home/DisplayResults/MovieCard";
import SearchBar from "components/Home/DisplayResults/SearchBar";
import ShowDetails from "components/Home/ShowDetails";
import { useOmdbFetch } from "hooks/reactQuery/useOmdbApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { t } from "i18next";
import { filterNonNull } from "neetocist";
import { Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import { useHistoryStore } from "stores/useHistoryStore";
import { buildUrl } from "utils/url";

import { routes } from "../../../routes";

const DisplayResults = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showId, setShowId] = useState(null);
  const addOrMoveToTop = useHistoryStore(state => state.addOrMoveToTop);
  const { page, searchTerm = "" } = useQueryParams();
  const [searchKey, setSearchKey] = useState(searchTerm || "");
  const history = useHistory();

  const params = { searchTerm, page: Number(page) || DEFAULT_PAGE_INDEX };

  const { data: { search, totalResults } = {} } = useOmdbFetch({
    s: searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
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

  const updateQueryParams = useFuncDebounce(updatedValue => {
    const updatedParam = {
      ...params,
      ...updatedValue,
      page: DEFAULT_PAGE_INDEX,
    };

    history.push(
      isEmpty(updatedParam.searchTerm)
        ? buildUrl(routes.home.index)
        : buildUrl(routes.home.index, filterNonNull(updatedParam))
    );
  });

  const clickDetails = (imdbID, title) => {
    setIsOpen(true);
    addOrMoveToTop(imdbID, title);
  };

  return (
    <div className="flex h-full w-3/4 flex-col items-center overflow-y-auto border-2 bg-gray-50 px-10 py-10">
      <SearchBar
        isModalOpen={isOpen}
        placeHolder={t("searchBar.placeholder")}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        updateQueryParams={updateQueryParams}
      />
      <div className="mt-8 flex flex-1 flex-row flex-wrap gap-4">
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
      <div className="mt-10 self-end">
        <Pagination
          className="neetix-pagination"
          count={totalResults || 1}
          navigate={handlePageNavigation}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default DisplayResults;
