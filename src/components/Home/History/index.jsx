import React, { useState, useRef, useEffect } from "react";

import { Alert } from "components/commons";
import { t } from "i18next";
import { Delete } from "neetoicons";
import { Button } from "neetoui";
import { isEmpty } from "ramda";
import { useHistoryStore } from "stores/useHistoryStore";

const History = () => {
  const history = useHistoryStore(state => state.history);
  const viewKey = useHistoryStore(state => state.viewKey);
  const lastViewedId = useHistoryStore(state => state.lastViewedId);
  const deleteFromHistory = useHistoryStore(state => state.deleteFromHistory);
  const clearHistory = useHistoryStore(state => state.clearHistory);
  const itemRefs = useRef({});
  const [isOpen, setIsOpen] = useState(false);
  const [actionTaken, setActionTaken] = useState(() => () => {});
  const [alertTitle, setAlertTitle] = useState("");
  const [alertButtonLabel, setAlertButtonLabel] = useState("");

  useEffect(() => {
    if (lastViewedId && itemRefs.current[lastViewedId]) {
      itemRefs.current[lastViewedId]?.current?.scrollIntoView({
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
          <ul className="w-full px-4">
            {history.map((item, index) => {
              const imdbID = Object.keys(item)[0];
              const isLastViewed = imdbID === lastViewedId;

              if (!itemRefs.current[imdbID]) {
                itemRefs.current[imdbID] = React.createRef();
              }

              return (
                <li
                  key={index}
                  ref={itemRefs.current[imdbID]}
                  className={`mb-2 text-wrap rounded p-2 text-center shadow hover:bg-blue-200 ${
                    isLastViewed ? "bg-yellow-100 font-bold" : "bg-blue-100"
                  }`}
                >
                  <div className="flex w-full space-x-4">
                    <p className="mr-auto text-wrap text-left font-medium">
                      {Object.values(item)[0]}
                    </p>
                    <div
                      className="cursor-pointer self-center hover:text-red-600"
                      onClick={() => handleDelete(imdbID)}
                    >
                      <Delete size={20} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Alert
        action={actionTaken}
        buttonLabel={alertButtonLabel}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={alertTitle}
      />
    </div>
  );
};

export default History;
