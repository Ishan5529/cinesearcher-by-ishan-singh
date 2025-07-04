import { t } from "i18next";
import { isEmpty } from "ramda";
import { useHistoryStore } from "stores/useHistoryStore";

const History = () => {
  const history = useHistoryStore(state => state.history);
  const lastViewedId = useHistoryStore(state => state.lastViewedId);
  const clearHistory = useHistoryStore(state => state.clearHistory);

  return (
    <div className="flex min-h-screen w-1/4 justify-center overflow-y-auto bg-gray-100">
      <div className="flex w-full max-w-md flex-col items-center px-4 py-6">
        <h1 className="mb-4 text-2xl font-bold">{t("history.title")}</h1>
        {isEmpty(history) && (
          <p className="text-gray-600">{t("history.emptyHistory")}</p>
        )}
        {!isEmpty(history) && (
          <ul className="w-full">
            {history.map((item, index) => {
              const imdbID = Object.keys(item)[0];
              const isLastViewed = imdbID === lastViewedId;

              return (
                <li
                  key={index}
                  className={`mb-2 text-wrap rounded p-2 text-center shadow hover:bg-blue-200 ${
                    isLastViewed ? "bg-yellow-100 font-bold" : "bg-blue-100"
                  }`}
                >
                  {Object.values(item)[0]}
                </li>
              );
            })}
          </ul>
        )}
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="button"
          onClick={clearHistory}
        >
          {t("history.clearButton")}
        </button>
      </div>
    </div>
  );
};

export default History;
