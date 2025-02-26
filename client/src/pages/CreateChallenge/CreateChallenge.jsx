import { useContext, useState } from 'react';
import { challengeApi } from '../../services/api';
import { toast } from 'react-toastify';
import { storeContext } from '../../context/storeContext';

const CreateChallenge = () => {
    const {navigate}=useContext(storeContext)
   
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        theme: '',
        reward: '',
        creator: localStorage.getItem('userId'),
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await challengeApi.createChallenge(formData);
            toast.success(`Challenge created: ${data.title}`);
            navigate('/');
            setFormData({ title: '', description: '', theme: '', reward: '' });
        } catch (err) {
            toast.error(`Error creating challenge. ${err.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create New Challenge
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows="4"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="theme" className="text-sm font-medium text-gray-700">
                                Theme
                            </label>
                            <input
                                type="text"
                                name="theme"
                                id="theme"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                                value={formData.theme}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="reward" className="text-sm font-medium text-gray-700">
                                Reward
                            </label>
                            <input
                                type="text"
                                name="reward"
                                id="reward"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                                value={formData.reward}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            Create Challenge
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateChallenge;
