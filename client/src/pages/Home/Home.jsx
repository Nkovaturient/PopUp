import { useEffect, useState } from 'react';
import ChallengeCard from '../../components/ChallengeCard';
import { challengeApi } from '../../services/api';
import Header from '../../components/Header/Header';
import ArcFlow from '../../components/arc';

const Home = () => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            const { data } = await challengeApi.getAllChallenges();
            setChallenges(data);
        };
        fetchChallenges();
    }, []);

    return (
        <>
         <Header />
        <div className="container mx-auto p-6">
        <ArcFlow />
            <h1 className="text-3xl font-bold mb-4 mt-4">Pop Culture Challenges</h1>
            <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                { challenges.length > 0 && challenges.map((challenge) => (
                    <ChallengeCard key={challenge._id} challenge={challenge} />
                ))}
            </div>
        </div>
        </>
    );
};

export default Home;
