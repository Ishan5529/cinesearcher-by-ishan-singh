import React from "react";

import classNames from "classnames";
import { t } from "i18next";
import {
  NavLink,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { routes } from "routes";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-row items-center space-x-8 bg-transparent py-6 text-white shadow-sm">
      <div className="rounded-lg p-2 text-3xl font-bold text-gray-700">
        <span className="text-3xl text-red-600">Cine</span> Searcher
      </div>
      <NavLink
        to={routes.home.index}
        className={classNames("font-semibold hover:text-red-300", {
          "text-blue-400": pathname === routes.home.index,
          "text-gray-400": pathname !== routes.home.index,
        })}
      >
        {t("navbarTitle", { title: "Home" })}
      </NavLink>
      <NavLink
        to={routes.favourites.index}
        className={classNames("font-semibold hover:text-red-300", {
          "text-blue-400": pathname === routes.favourites.index,
          "text-gray-400": pathname !== routes.favourites.index,
        })}
      >
        {t("navbarTitle", { title: "Favourites" })}
      </NavLink>
    </div>
  );
};

export default Navbar;
