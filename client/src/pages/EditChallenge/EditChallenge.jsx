import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { challengeApi } from '../../services/api';
import { toast } from 'react-toastify';
import { storeContext } from '../../context/storeContext';

const EditChallenge = () => {
    const { id } = useParams();
    const { navigate } = useContext(storeContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        theme: '',
        reward: ''
    });

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const { data } = await challengeApi.getChallengeById(id);
                setFormData({
                    title: data.title,
                    description: data.description,
                    theme: data.theme,
                    reward: data.reward
                });
                setIsLoading(false);
            } catch (err) {
                toast.error('Error fetching challenge details');
                navigate('/');
            }
        };

        fetchChallenge();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await challengeApi.updateChallenge(id, formData);
            toast.success('Challenge updated successfully!');
            navigate(`/challenges/show/${id}`);
        } catch (err) {
            toast.error(`Error updating challenge: ${err.message}`);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-xl p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
                    Edit Challenge
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="transition-all duration-200 hover:scale-[1.01]">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="transition-all duration-200 hover:scale-[1.01]">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 min-h-[120px]"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="transition-all duration-200 hover:scale-[1.01]">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Theme
                        </label>
                        <input
                            type="text"
                            name="theme"
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            value={formData.theme}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="transition-all duration-200 hover:scale-[1.01]">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Reward
                        </label>
                        <input
                            type="text"
                            name="reward"
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            value={formData.reward}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full"
                        >
                            Update Challenge
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditChallenge