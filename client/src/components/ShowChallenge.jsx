import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storeContext } from '../context/storeContext';
import { toast } from 'react-toastify';
import { challengeApi } from '../services/api';

const ShowChallenge = () => {
    const [challenge, setChallenge] = useState(null);
    const { id } = useParams();
    const { token } = useContext(storeContext);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await challengeApi.getChallengeById(id);
                setChallenge(response.data);
            } catch (error) {
                toast.error("Failed to fetch challenge details");
            }
        };
        fetchChallenge();
    }, [id]);

    if (!challenge) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-3xl p-8">
                    <div className="space-y-4 mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            {challenge.title}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-lg font-semibold">
                                {challenge.theme}
                            </span>
                            <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 text-lg font-semibold">
                                Reward: {challenge.reward}
                            </span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Description</h2>
                        <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                            {challenge.description}
                        </p>
                    </div>

                    <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Created by</h2>
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl font-bold">
                                    {challenge.creator?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p className="text-lg font-medium text-gray-800">{challenge.creator?.name}</p>
                                <p className="text-gray-500">{challenge.creator?.email}</p>
                            </div>
                        </div>
                    </div>

                    {challenge.creator?._id === userId && (
                        <div className="flex space-x-4 mt-8">
                            <Link
                                to={`/challenges/edit/${challenge._id}`}
                                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-xl text-lg font-medium text-center transition duration-300 transform hover:-translate-y-1"
                            >
                                Edit Challenge
                            </Link>
                            <Link
                                to={`/challenges/delete/${challenge._id}`}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl text-lg font-medium text-center transition duration-300 transform hover:-translate-y-1"
                            >
                                Delete Challenge
                            </Link>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Challenges
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShowChallenge