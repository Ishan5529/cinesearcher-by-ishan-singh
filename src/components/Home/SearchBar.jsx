import { Search } from "neetoicons";
import { Input } from "neetoui";

const SearchBar = ({
  searchTerm = "",
  placeHolder = "",
  debounceUpdateSearchTerm = () => {},
}) => {
  console.log(placeHolder, searchTerm, debounceUpdateSearchTerm);

  return (
    <div className="w-full px-20 py-8">
      <Input
        autoFocus
        placeholder={placeHolder}
        prefix={<Search color="#516165" />}
        size="large"
        type="search"
        value={searchTerm}
        onChange={e => debounceUpdateSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
