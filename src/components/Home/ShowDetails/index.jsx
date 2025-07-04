import { FALLBACK_IMAGE_URL } from "constants/constant";

import { useState, useEffect } from "react";

import omdbApi from "apis/Omdb";
import { Modal } from "neetoui";

const ShowDetails = ({ show, isOpen = false }) => {
  const [showDetails, setShowDetails] = useState(show);
  const [isLoading, setIsLoading] = useState(false);

  const fetchShowDetails = async () => {
    if (!showDetails?.imdbID) return;
    setIsLoading(true);
    try {
      const response = await omdbApi.fetchById(showDetails.imdbID);
      setShowDetails(() => response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching show details:", error);
    } finally {
      setIsLoading(false);
      console.log("Show Details:", showDetails);
    }
  };

  useEffect(() => {
    fetchShowDetails();
  }, []);

  if (isLoading) {
    console.log("Loading show details...");
  }

  return (
    isOpen && (
      <Modal isOpen={isOpen} size="large" onClose={() => {}}>
        <div className="flex flex-col items-center p-6">
          <div className="Header">
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
          <div className="Body mt-4 flex flex-row gap-6">
            <div className="Poster">
              <img
                alt={`${showDetails?.title} poster`}
                className="h-96 w-72 rounded-lg"
                src={showDetails?.poster || FALLBACK_IMAGE_URL}
                onError={e => {
                  e.target.src = FALLBACK_IMAGE_URL;
                }}
              />
            </div>
            <div className="Details flex flex-col gap-4">
              <p className="text-gray-600">{showDetails?.plot}</p>
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
