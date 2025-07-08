import { PageLoader } from "components/commons";
import Body from "components/Home/DisplayResults/ShowDetails/Body";
import Header from "components/Home/DisplayResults/ShowDetails/Header";
import { useOmdbShow } from "hooks/reactQuery/useOmdbApi";
import { t } from "i18next";
import { Modal } from "neetoui";
import useFavouritesStore from "stores/useFavouritesStore";

const ShowDetails = ({ showId, isModalOpen, setIsModalOpen }) => {
  const { favourites, toggleFavourite } = useFavouritesStore.pick();

  const { data, isLoading } = useOmdbShow({ i: showId });

  const showDetails = data;

  const labels = [
    { content: showDetails?.director, label: t("showDetails.director") },
    { content: showDetails?.actors, label: t("showDetails.cast") },
    { content: showDetails?.boxOffice, label: t("showDetails.boxOffice") },
    { content: showDetails?.year, label: t("showDetails.year") },
    { content: showDetails?.runtime, label: t("showDetails.runtime") },
    { content: showDetails?.language, label: t("showDetails.language") },
    { content: showDetails?.imdbRating, label: t("showDetails.rating") },
    { content: showDetails?.rated, label: t("showDetails.rated") },
  ];

  const handleToggleFavourite = () => {
    toggleFavourite({
      imdbID: showId,
      title: showDetails?.title,
      imdbRating: showDetails?.imdbRating,
    });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    showDetails && (
      <Modal
        isOpen={isModalOpen}
        style={{ width: "60%", minWidth: "50vw", margin: "0 auto" }}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="flex flex-col items-center p-6">
          <Header
            {...{ showDetails, favourites, handleToggleFavourite, showId }}
          />
          <Body
            {...{
              title: showDetails?.title,
              poster: showDetails?.poster,
              plot: showDetails?.plot,
              labels,
            }}
          />
        </div>
      </Modal>
    )
  );
};

export default ShowDetails;
