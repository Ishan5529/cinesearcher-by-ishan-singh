import React, { useState, useRef, useEffect } from "react";

import { Alert } from "components/commons";
import { t } from "i18next";
import { Button } from "neetoui";
import { isEmpty } from "ramda";
import useHistoryStore from "stores/useHistoryStore";

import HistoryList from "./List";

const History = () => {
  const { history, viewKey, lastViewedIds, deleteFromHistory, clearHistory } =
    useHistoryStore.pick();
  const itemRefs = useRef({});
  const [isOpen, setIsOpen] = useState(false);
  const [actionTaken, setActionTaken] = useState(() => () => {});
  const [alertTitle, setAlertTitle] = useState("");
  const [alertButtonLabel, setAlertButtonLabel] = useState("");

  useEffect(() => {
    if (lastViewedIds && itemRefs.current[lastViewedIds[0]]) {
      itemRefs.current[lastViewedIds[0]]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [viewKey]);

  const handleDelete = imdbID => {
    setAlertTitle(`${t("history.deleteAlertTitle")} ?`);
    setAlertButtonLabel(t("buttonLabels.delete"));
    setActionTaken(() => () => deleteFromHistory(imdbID));
    setIsOpen(true);
  };

  const handleClearHistory = () => {
    setAlertTitle(`${t("history.clearAlertTitle")} ?`);
    setAlertButtonLabel(t("buttonLabels.clear"));
    setActionTaken(() => clearHistory);
    setIsOpen(true);
    itemRefs.current = {};
  };

  return (
    <div className="flex h-full w-1/4 justify-center bg-gray-100">
      <div className="flex w-full max-w-md flex-col items-center px-4 py-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="mb-4 text-2xl font-bold">{t("history.title")}</h1>
          {!isEmpty(history) && (
            <Button
              className="mb-2 text-sm"
              label={t("history.clearButton")}
              style="danger-text"
              onClick={handleClearHistory}
            />
          )}
        </div>
        {isEmpty(history) && (
          <p className="my-auto text-gray-600">{t("history.emptyHistory")}</p>
        )}
        {!isEmpty(history) && (
          <div className="h-full w-full overflow-y-auto rounded-xl border-2 border-gray-300 pt-1.5">
            <HistoryList
              {...{ history, itemRefs, handleDelete, lastViewedIds }}
            />
          </div>
        )}
      </div>
      <Alert
        action={actionTaken}
        buttonLabel={alertButtonLabel}
        title={alertTitle}
        {...{ isOpen, setIsOpen }}
      />
    </div>
  );
};

export default History;
