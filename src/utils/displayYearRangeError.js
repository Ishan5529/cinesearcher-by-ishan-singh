import { TOASTR_TIMEOUT, TOASTR_TRANSITION } from "constants/constant";

import { t } from "i18next";
import { Toastr } from "neetoui";

export const displayYearRangeError = () => {
  Toastr.error(t("error.yearRangeError"), {
    autoClose: TOASTR_TIMEOUT,
    transition: TOASTR_TRANSITION,
  });
};
