import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";

const ChallengeCard = ({ challenge }) => {
  const { token, navigate } = useContext(storeContext);

  const handleAuth = () => {
    if (token) {
      navigate(`/challenge/${challenge._id}`);
    } else {
      navigate("/");
      toast.warn("Kindly login to create or view the challenges");
    }
  };

  return (
    <button onClick={handleAuth} className="block">
      <div className="bg-white hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl p-6 cursor-pointer">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            {challenge.title}
          </h2>

          <p className="text-gray-600 line-clamp-2 text-sm">
            {challenge.description}
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {challenge.theme}
            </span>
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              {challenge.reward} <br />
            </span>
            {challenge.creator?._id === localStorage.getItem("userId") ? (
              <>
                <Link
                  to={`/challenges/${challenge._id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Edit
                </Link>
                <Link
                  to={`/challenges/${challenge._id}/delete`}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Delete
                </Link>
              </>
            ) : (
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                View
              </button>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ChallengeCard;
