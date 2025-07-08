import axios from "axios";

import { BASE_URL } from "./constant";

const fetchList = params => axios.get(BASE_URL, { params });

const fetchById = params =>
  axios.get(BASE_URL, {
    params: {
      ...params,
      plot: "full",
    },
  });

const omdbApi = { fetchList, fetchById };
export default omdbApi;
