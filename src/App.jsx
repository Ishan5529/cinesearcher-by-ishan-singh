import React from "react";

import SearchBar from "components/Home/SearchBar";
import { useOmdbFetch } from "hooks/reactQuery/useOmdbApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
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
        placeHolder="Search for movies"
        searchTerm={searchTerm}
        updateQueryParams={updateQueryParams}
      />
      <div>
        <p>{searchTerm}</p>
        {JSON.stringify(search)} - {totalResults}
      </div>
    </>
  );
};

export default App;
