import  { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Dashboard = () => {

    const [topUsers, setTopUsers] = useState([
        { _id: '1', username: 'Alice', score: 120 },
        { _id: '2', username: 'Bob', score: 95 },
        { _id: '3', username: 'Charlie', score: 80 },
        { _id: '4', username: 'David', score: 70 },
        { _id: '5', username: 'Eve', score: 60 },
    ]);
    const [popularChallenges, setPopularChallenges] = useState([
        { _id: 'Challenge A', count: 30 },
        { _id: 'Challenge B', count: 25 },
        { _id: 'Challenge C', count: 20 },
        { _id: 'Challenge D', count: 15 },
        { _id: 'Challenge E', count: 10 },
    ]);
    const [dailyTrends, setDailyTrends] = useState([
        { _id: 'Day 1', count: 50 },
        { _id: 'Day 2', count: 65 },
        { _id: 'Day 3', count: 55 },
        { _id: 'Day 4', count: 70 },
        { _id: 'Day 5', count: 80 },
    ]);

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Set demo data
            setTopUsers([
                { _id: '1', username: 'Alice', score: 120 },
                { _id: '2', username: 'Bob', score: 95 },
                { _id: '3', username: 'Charlie', score: 80 },
                { _id: '4', username: 'David', score: 70 },
                { _id: '5', username: 'Eve', score: 60 },
            ]);

            setPopularChallenges([
                { _id: 'Challenge A', count: 30 },
                { _id: 'Challenge B', count: 25 },
                { _id: 'Challenge C', count: 20 },
                { _id: 'Challenge D', count: 15 },
                { _id: 'Challenge E', count: 10 },
            ]);
            setDailyTrends([
                { _id: 'Day 1', count: 50 },
                { _id: 'Day 2', count: 65 },
                { _id: 'Day 3', count: 55 },
                { _id: 'Day 4', count: 70 },
                { _id: 'Day 5', count: 80 },
            ]);
        };

        fetchData();
    }, []);

    const dailyTrendChartData = {
        labels: dailyTrends.map((trend) => trend._id),
        datasets: [
            {
                label: 'Daily Participation',
                data: dailyTrends.map((trend) => trend.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const popularChallengesChartData = {
        labels: popularChallenges.map((challenge) => challenge._id),
        datasets: [
            {
                label: 'Challenge Participation',
                data: popularChallenges.map((challenge) => challenge.count),
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Count',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Category',
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Chart Title',
                font: {
                    size: 16,
                },
            },
            legend: {
                display: true,
                position: 'bottom',
            },
        },
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Trends Chart */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-2 text-gray-700">Daily Trends</h2>
                    <div style={{ height: '300px' }}>
                        <Line data={dailyTrendChartData} options={chartOptions} />
                    </div>
                </div>

                {/* Popular Challenges Chart */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-2 text-gray-700">Popular Challenges</h2>
                    <div style={{ height: '300px' }}>
                        <Bar data={popularChallengesChartData} options={chartOptions} />
                    </div>
                </div>
            </div>

            {/* Top Users List */}
            <div className="mt-8 bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-700">Top Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Username
                                    </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Score
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {topUsers.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{user.username}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{user.score}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
