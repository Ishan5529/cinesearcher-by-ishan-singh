import { Spinner } from "neetoui";

const PageLoader = () => (
  <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-row items-center justify-center bg-gray-400 opacity-75">
    <Spinner />
    {console.log("here")}
  </div>
);

export default PageLoader;
