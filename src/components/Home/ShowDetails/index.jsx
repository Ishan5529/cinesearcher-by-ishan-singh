import { FALLBACK_IMAGE_URL } from "constants/constant";

import { useState, useEffect } from "react";

import omdbApi from "apis/Omdb";
import { t } from "i18next";
import { Modal } from "neetoui";

const ShowDetails = ({ showId, isOpen, setIsOpen }) => {
  const [showDetails, setShowDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchShowDetails = async () => {
    if (!showId) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await omdbApi.fetchById(showId);
      setShowDetails(() => response);
      console.log(response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShowDetails();
  }, [isOpen]);

  return (
    showDetails &&
    !isLoading && (
      <Modal
        isOpen={isOpen}
        style={{ width: "50%", minWidth: "50vw", margin: "0 auto" }}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col items-center p-6">
          <div className="Header mb-3 self-start">
            <div className="Title">
              <h1 className="text-[36px] font-bold">{showDetails?.title}</h1>
            </div>
            <div className="Genre flex flex-row gap-2">
              {showDetails?.genre?.split(",").map((genre, index) => (
                <span
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
                  key={index}
                >
                  {genre.trim()}
                </span>
              ))}
            </div>
          </div>
          <div className="Body mt-4 flex min-h-[350px] w-full flex-row gap-6">
            <div className="Poster w-2/5">
              <div className="w-max rounded-2xl border-8 border-gray-200 shadow-2xl">
                <img
                  alt={`${showDetails?.title} poster`}
                  className="rounded-lg"
                  src={showDetails?.poster || FALLBACK_IMAGE_URL}
                  onError={e => {
                    e.target.src = FALLBACK_IMAGE_URL;
                  }}
                />
              </div>
            </div>
            <div className="Details flex w-3/5 flex-col justify-between">
              <p className="text-gray-600">
                {showDetails?.plot !== "N/A"
                  ? showDetails?.plot
                  : t("error.noPlotDetails")}
              </p>
              <p>
                <strong>Director:</strong> {showDetails?.director}
              </p>
              <p>
                <strong>Actors:</strong> {showDetails?.actors}
              </p>
              <p>
                <strong>Box Office:</strong> {showDetails?.boxOffice}
              </p>
              <p>
                <strong>Year:</strong> {showDetails?.year}
              </p>
              <p>
                <strong>Runtime:</strong> {showDetails?.runtime}
              </p>
              <p>
                <strong>Language:</strong> {showDetails?.language}
              </p>
              <p>
                <strong>Rating:</strong> {showDetails?.imdbRating}
              </p>
              <p>
                <strong>Rated:</strong> {showDetails?.rated}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default ShowDetails;
