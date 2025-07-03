import React from "react";

import MovieCard from "components/Home/MovieCard";
import SearchBar from "components/Home/SearchBar";
import { useOmdbFetch } from "hooks/reactQuery/useOmdbApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { t } from "i18next";
import { filterNonNull } from "neetocist";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

import "./common/i18n";

const App = () => {
  const { searchTerm = "" } = useQueryParams();
  const history = useHistory();
  const params = { searchTerm };

  const { data: { search, totalResults } = {} } = useOmdbFetch({
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
    <>
      <SearchBar
        placeHolder={t("searchBar.placeholder")}
        searchTerm={searchTerm}
        updateQueryParams={updateQueryParams}
      />
      <p>{totalResults}</p>
      <div className="flex flex-row">
        {search && <MovieCard movie={search[0]} />}
        {search && <MovieCard movie={search[1]} />}
        {search && <MovieCard movie={search[2]} />}
        {search && <MovieCard movie={search[3]} />}
      </div>
      <div className="flex flex-row">
        {search && <MovieCard movie={search[4]} />}
        {search && <MovieCard movie={search[5]} />}
        {search && <MovieCard movie={search[6]} />}
        {search && <MovieCard movie={search[7]} />}
      </div>
    </>
  );
};

export default App;
