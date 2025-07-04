import { useState } from "react";

import { Search } from "neetoicons";
import { Input } from "neetoui";

const SearchBar = ({
  // searchKey = "",
  // setSearchKey,
  searchTerm,
  placeHolder = "",
  updateQueryParams,
}) => {
  const [searchKey, setSearchKey] = useState(searchTerm || "");
  const handleChange = value => {
    updateQueryParams({ searchTerm: value });
    setSearchKey(value);
  };

  return (
    <div className="w-full">
      <Input
        autoFocus
        placeholder={placeHolder}
        prefix={<Search color="#516165" />}
        size="large"
        type="search"
        value={searchKey}
        onChange={({ target: { value } }) => {
          handleChange(value);
        }}
      />
    </div>
  );
};

export default SearchBar;
