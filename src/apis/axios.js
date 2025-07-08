import axios from "axios";
import { t } from "i18next";
import { keysToCamelCase, transformObjectDeep } from "neetocist";
import { Toastr } from "neetoui";
import { Bounce } from "react-toastify";

const checkForSuccess = ({ response, error = "" }) => {
  if (response === "False") {
    return Toastr.error(error, {
      autoClose: 2000,
      transition: Bounce,
    });
  }

  return null;
};

const showErrorToastr = error => {
  if (error.message === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"), {
      autoClose: 2000,
      transition: Bounce,
    });
  } else if (error.response?.status !== 404) {
    Toastr.error(error, { autoClose: 2000, transition: Bounce });
  }
};

const transformResponseKeysToCamelCase = ({ data }) => {
  if (data) {
    const demo = transformObjectDeep(data, (key, value) => {
      const camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1);

      return [camelCaseKey, value];
    });

    const { search = [], ...restData } = demo;
    const transformedSearch = search.map(keysToCamelCase);

    return { search: transformedSearch, ...restData };
  }

  return {};
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      const data = transformResponseKeysToCamelCase(response);

      checkForSuccess(data);

      return data;
    },
    error => {
      showErrorToastr(error);

      return Promise.resolve(error);
    }
  );
};

const initializeAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP_OMDB_API_URL;
  axios.defaults.params = {};
  axios.defaults.params["apikey"] = process.env.REACT_APP_OMDB_API_KEY;
  responseInterceptors();
};

export default initializeAxios;
