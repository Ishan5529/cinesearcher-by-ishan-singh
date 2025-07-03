import { keysToCamelCase } from "neetocist";
import { parse } from "qs";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const { search } = useLocation();
  const queryParams = parse(search, { ignoreQueryPrefix: true });

  return keysToCamelCase(queryParams);
};

export default useQueryParams;
