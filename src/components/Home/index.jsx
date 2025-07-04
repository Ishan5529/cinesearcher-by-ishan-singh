import DisplayResults from "./DisplayResults";
import History from "./History";

const Home = () => (
  <div className="flex h-screen w-screen flex-row">
    <DisplayResults />
    <History />
  </div>
);

export default Home;
