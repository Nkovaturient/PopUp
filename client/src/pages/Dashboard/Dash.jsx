import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { userApi } from '../../services/api';
import LearningGraphs from './LearningGraphs';

const Dash = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId'); 
                const { data } = await userApi.getDashboard(userId);
                console.log('User data:', data);
                setUserData(data.user);
            } catch (err) {
                console.error("Failed to fetch user data:", err.message);
            }
        };
        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Welcome, {userData.username}</h2>
                <Tabs>
                    <TabList>
                        <Tab>Profile</Tab>
                        <Tab>Completed Challenges</Tab>
                        <Tab>Learning Graphs</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="p-4">
                            <p className="text-lg"><strong>Email:</strong> {userData.email}</p>
                            <p className="text-lg"><strong>Score:</strong> {userData.score}</p>
                            <p className="text-lg"><strong>Tokens:</strong> {userData.tokens}</p>
                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"> 
                                Update Profile
                              </button> &nbsp;&nbsp;
                              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                                View
                              </button>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="p-4">
                            <h3 className="text-xl font-bold mt-4">Completed Challenges</h3>
                            <ul className="list-disc list-inside">
                                {userData.completedChallenges.map((challenge) => (
                                    <li key={challenge._id} className="text-lg">{challenge.title}</li>
                                ))}
                            </ul>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="p-4">
                            <LearningGraphs />
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Dash