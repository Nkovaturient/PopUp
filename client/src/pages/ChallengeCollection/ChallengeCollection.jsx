import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { challengeApi } from '../../services/api';
import ChallengeCard from '../../components/ChallengeCard';
import { Link } from 'react-router-dom';

const ChallengeCollection = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme, id } = useParams();

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                setLoading(true);
                let response;

                if (theme) {
                    response = await challengeApi.getChallengesByTheme(theme);
                } else if (id) {
                    response = await challengeApi.getChallengeById(id);
                    response = { data: [response.data] };
                     // Wrap single challenge in array
                     console.log("challenges=", response);
                } else {
                    response = await challengeApi.getAllChallenges();
                }

                setChallenges(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchChallenges();
    }, [theme, id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {theme ? `${theme} Challenges` : 'All Challenges'}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {challenges.length} challenges available
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenges.map((challenge) => (
                        <div key={challenge._id} className="transform hover:scale-105 transition-transform duration-300">
                            <ChallengeCard challenge={challenge} />
                        </div>
                    ))}
                </div>

                {challenges.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">
                            No challenges found {theme && `for theme: ${theme}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengeCollection