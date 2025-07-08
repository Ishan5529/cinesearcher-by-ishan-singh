import { Delete } from "neetoicons";

const HistoryListItem = ({
  index,
  item,
  itemRefs,
  imdbID,
  isLastViewed,
  handleDelete,
}) => (
  <li
    key={index}
    ref={itemRefs.current[imdbID]}
    className={`mb-2 text-wrap rounded p-2 text-center shadow hover:bg-blue-200 ${
      isLastViewed ? "bg-yellow-50 font-bold" : "bg-blue-100"
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

export default HistoryListItem;
