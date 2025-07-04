import { useEffect, useRef } from "react";

import { Search } from "neetoicons";
import { Input } from "neetoui";

const SearchBar = ({
  searchKey = "",
  setSearchKey,
  placeHolder = "",
  updateQueryParams,
  isModalOpen = false,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleSlashFocus = event => {
      if (
        event.key === "/" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !isModalOpen &&
        document.activeElement !== inputRef.current
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleSlashFocus);

    return () => window.removeEventListener("keydown", handleSlashFocus);
  }, [isModalOpen]);

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
        ref={inputRef}
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
