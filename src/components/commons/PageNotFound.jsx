import { t } from "i18next";
import { NoData } from "neetoui";

import { routes } from "../../routes";

const PageNotFound = () => (
  <div className="flex h-screen items-center justify-center">
    <NoData
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.label"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.home.index,
      }}
    />
  </div>
);

export default PageNotFound;
