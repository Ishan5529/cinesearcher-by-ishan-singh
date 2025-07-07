import omdbApi from "apis/Omdb";
import { useQuery } from "react-query";

import { QUERY_KEYS } from "../../constants/query";

export const useOmdbFetch = params =>
  useQuery({
    keepPreviousData: true,
    queryKey: [QUERY_KEYS.OMDB, params],
    queryFn: () => omdbApi.fetchList(params),
    enabled: !!params.s,
  });

export const useOmdbShow = params =>
  useQuery({
    queryKey: [QUERY_KEYS.OMDB, params],
    queryFn: () => omdbApi.fetchById(params),
    enabled: !!params.i,
  });
