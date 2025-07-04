import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "constants/constant";

import React, { useState } from "react";

import MovieCard from "components/Home/DisplayResults/MovieCard";
import SearchBar from "components/Home/DisplayResults/SearchBar";
import { useOmdbFetch } from "hooks/reactQuery/useOmdbApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { t } from "i18next";
import { filterNonNull } from "neetocist";
import { Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

const DisplayResults = () => {
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
        "/movies",
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
        ? buildUrl("/movies")
        : buildUrl("/movies", filterNonNull(updatedParam))
    );
  });

  return (
    <div className="flex h-full w-[1300px] flex-col items-center overflow-y-auto border-2 bg-gray-50 px-10 py-10">
      <SearchBar
        placeHolder={t("searchBar.placeholder")}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        updateQueryParams={updateQueryParams}
      />
      <div className="mt-8 flex flex-1 flex-row flex-wrap gap-4">
        {searchTerm &&
          search?.map((movie, index) => (
            <MovieCard clickDetails={() => {}} key={index} movie={movie} />
          ))}
      </div>
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
