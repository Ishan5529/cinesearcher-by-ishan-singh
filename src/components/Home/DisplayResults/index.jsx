import React from "react";

import MovieCard from "components/Home/DisplayResults/MovieCard";
import SearchBar from "components/Home/DisplayResults/SearchBar";
import { useOmdbFetch } from "hooks/reactQuery/useOmdbApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { t } from "i18next";
import { filterNonNull } from "neetocist";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

const DisplayResults = () => {
  const { searchTerm = "" } = useQueryParams();
  const history = useHistory();
  const params = { searchTerm };

  const { data: { search } = {} } = useOmdbFetch({
    s: searchTerm,
  });

  const updateQueryParams = useFuncDebounce(updatedValue => {
    const updatedParam = {
      ...params,
      ...updatedValue,
    };

    history.push(
      isEmpty(updatedParam.searchTerm)
        ? buildUrl("/movies")
        : buildUrl("/movies", filterNonNull(updatedParam))
    );
  });

  return (
    <div className="flex h-full w-[1300px] flex-col items-center overflow-y-auto border-2 px-10 py-10">
      <SearchBar
        placeHolder={t("searchBar.placeholder")}
        searchTerm={searchTerm}
        updateQueryParams={updateQueryParams}
      />
      <div className="mt-8 flex flex-1 flex-row flex-wrap gap-4">
        {search.map((movie, index) => (
          <MovieCard clickDetails={() => {}} key={index} movie={movie} />
        ))}
      </div>
      <h1 className="mt-4 self-end border-2 border-red-300 text-[64px]">
        Pagination here
      </h1>
    </div>
  );
};

export default DisplayResults;
