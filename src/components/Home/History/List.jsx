import React from "react";

import HistoryListItem from "./Item";

const HistoryList = ({ history, itemRefs, handleDelete, lastViewedIds }) => (
  <ul className="w-full px-2">
    {history.map((item, index) => {
      const imdbID = Object.keys(item)[0];
      const isLastViewed = imdbID === lastViewedIds[0];

      if (!itemRefs.current[imdbID]) {
        itemRefs.current[imdbID] = React.createRef();
      }

      return (
        <HistoryListItem
          key={index}
          {...{ item, itemRefs, imdbID, isLastViewed, handleDelete }}
        />
      );
    })}
  </ul>
);

export default HistoryList;
