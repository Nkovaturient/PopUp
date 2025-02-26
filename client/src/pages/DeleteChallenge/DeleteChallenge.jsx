import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { challengeApi } from '../../services/api';

const DeleteChallenge = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await challengeApi.getChallengeById(id);
                setChallenge(response.data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch challenge details');
                setIsLoading(false);
            }
        };

        fetchChallenge();
    }, [id]);

    const handleDelete = async () => {
        try {
            await challengeApi.deleteChallenge(id);
            navigate('/');
            toast.success('Challenge deleted successfully');
        } catch (err) {
            toast.error(`Error deleting challenge: ${err.message}`);
            console.log(`Error deleting challenge: ${err}`);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (error) return <div className="text-red-600 text-center p-4">{error}</div>;
    if (!challenge) return <div className="text-center p-4">Challenge not found</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Delete Challenge</h2>
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700">{challenge.title}</h3>
                    <p className="text-gray-600">
                        <span className="font-semibold">Theme:</span> {challenge.theme}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Description:</span> {challenge.description}
                    </p>
                    {challenge.reward && (
                        <p className="text-gray-600">
                            <span className="font-semibold">Reward:</span> {challenge.reward}
                        </p>
                    )}
                </div>
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <p className="text-yellow-600 flex items-center">
                        ⚠️ Are you sure you want to delete this challenge?
                    </p>
                    <p className="text-yellow-600 mt-1">This action cannot be undone.</p>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button 
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button 
                        className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
                        onClick={handleDelete}
                    >
                        Delete Challenge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteChallenge;