import axios from "axios";

import { BASE_URL } from "./constant";

const fetchList = params => axios.get(BASE_URL, { params });

const fetchById = id =>
  axios.get(BASE_URL, {
    params: {
      i: id,
      plot: "full",
    },
  });

const omdbApi = { fetchList, fetchById };
export default omdbApi;
