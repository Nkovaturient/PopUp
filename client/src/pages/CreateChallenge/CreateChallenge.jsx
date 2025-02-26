import { useState } from 'react';
import { challengeApi } from '../../services/api';
import { toast } from 'react-toastify';

const CreateChallenge = () => {
   
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
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Challenge</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
                <label className="block mb-4">
                    <span className="text-gray-700">Title</span>
                    <input
                        type="text"
                        name="title"
                        className="mt-1 block w-full rounded border-gray-300"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Description</span>
                    <textarea
                        name="description"
                        className="mt-1 block w-full rounded border-gray-300"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Theme</span>
                    <input
                        type="text"
                        name="theme"
                        className="mt-1 block w-full rounded border-gray-300"
                        value={formData.theme}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Reward</span>
                    <input
                        type="text"
                        name="reward"
                        className="mt-1 block w-full rounded border-gray-300"
                        value={formData.reward}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create Challenge
                </button>
                
            </form>
        </div>
    );
};

export default CreateChallenge;
