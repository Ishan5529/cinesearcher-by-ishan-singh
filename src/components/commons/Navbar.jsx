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
    <div className="flex h-full flex-row items-center space-x-8 bg-transparent py-6 text-white shadow-sm">
      <NavLink className="" to={routes.home.index}>
        <div className="rounded-lg p-2 text-3xl font-bold text-gray-600">
          <span className="text-3xl text-purple-600">Cine</span> Searcher
        </div>
      </NavLink>
      <NavLink
        to={routes.home.index}
        className={classNames("text-base font-semibold hover:text-pink-300", {
          "text-blue-400": pathname === routes.home.index,
          "text-gray-400": pathname !== routes.home.index,
        })}
      >
        {t("navbarTitle", { title: "Home" })}
      </NavLink>
      <NavLink
        to={routes.favourites.index}
        className={classNames("text-base font-semibold hover:text-pink-300", {
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
