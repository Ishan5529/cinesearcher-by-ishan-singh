import React, { useState, useRef, useEffect } from "react";

import { Alert } from "components/commons";
import { t } from "i18next";
import { Button } from "neetoui";
import { isEmpty } from "ramda";
import { useHistoryStore } from "stores/useHistoryStore";

import HistoryList from "./List";

const History = () => {
  const history = useHistoryStore(state => state.history);
  const viewKey = useHistoryStore(state => state.viewKey);
  const lastViewedIds = useHistoryStore(state => state.lastViewedIds);
  const deleteFromHistory = useHistoryStore(state => state.deleteFromHistory);
  const clearHistory = useHistoryStore(state => state.clearHistory);
  const itemRefs = useRef({});
  const [isOpen, setIsOpen] = useState(false);
  const [actionTaken, setActionTaken] = useState(() => () => {});
  const [alertTitle, setAlertTitle] = useState("");
  const [alertButtonLabel, setAlertButtonLabel] = useState("");

  useEffect(() => {
    if (lastViewedIds && itemRefs.current[lastViewedIds[0]]) {
      itemRefs.current[lastViewedIds[0]]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
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
    <div className="flex min-h-screen w-1/4 justify-center overflow-y-auto bg-gray-100">
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
          <p className="my-auto pb-52 text-gray-600">
            {t("history.emptyHistory")}
          </p>
        )}
        {!isEmpty(history) && (
          <HistoryList
            {...{ history, itemRefs, handleDelete, lastViewedIds }}
          />
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
