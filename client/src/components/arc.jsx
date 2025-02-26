import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ArcFlow = () => {
    return (
        <div className="container mx-auto p-6 mb-4 py-4 mt-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Featuring PopUp</h1>
            <Tabs>
                <TabList className="flex justify-center xs:flex-col mt-4 flex-wrap gap-4 space-x-4 mb-6">
                    <Tab className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300">Create Account</Tab>
                    <Tab className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-600 transition duration-300">Create Challenge</Tab>
                    <Tab className="bg-purple-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-purple-600 transition duration-300">View Challenge</Tab>
                    <Tab className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition duration-300">Mint NFTs</Tab>
                    <Tab className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 transition duration-300">Marketplace</Tab>
                    <Tab className="bg-indigo-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-600 transition duration-300">Send Rewards</Tab>
                    <Tab className="bg-teal-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-teal-600 transition duration-300">Explore Dashboard</Tab>
                </TabList>

                <TabPanel>
                    <div className="p-4 bg-blue-100 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Create Account</h2>
                        <p>Sign up to get started with our platform. Create your account to access all features.</p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="p-4 bg-green-100 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Create Challenge</h2>
                        <p>Create new challenges to engage with the community and earn rewards.</p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="p-4 bg-purple-100 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-2">View Challenge</h2>
                        <p>View and participate in challenges created by others. Track your progress and achievements.</p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="p-4 bg-yellow-100 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Mint NFTs</h2>
                        <p>Mint your achievements as NFTs and showcase them in your collection.</p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="p-4 bg-red-100 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Marketplace</h2>
                        <p>List your NFTs on the marketplace or buy items from other users.</p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="p-4 bg-indigo-100 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Send Rewards</h2>
                        <p>Send rewards and NFTs to other users' wallets. Share your achievements and rewards.</p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="p-4 bg-teal-100 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Explore Dashboard</h2>
                        <p>Explore your dashboard to track your progress, view completed challenges, and manage your profile.</p>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ArcFlow;