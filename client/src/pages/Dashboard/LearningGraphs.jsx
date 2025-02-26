import React, { useEffect, useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { analyticsApi } from '../../services/api';
import { toast } from 'react-toastify';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
BarElement,
ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
ArcElement,
Title,
Tooltip,
Legend
);

const LearningGraphs = () => {
const [platformStats, setPlatformStats] = useState(null);
const [activityData, setActivityData] = useState(null);
const [themeData, setThemeData] = useState(null);
const [popularChallenges, setPopularChallenges] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchAnalytics = async () => {
        try {
            const [stats, activity, themes, popular] = await Promise.all([
                analyticsApi.getPlatformStats(),
                analyticsApi.getActivityOverTime(),
                analyticsApi.getChallengesByTheme(),
                analyticsApi.getPopularChallenges(),
            ]);

            setPlatformStats(stats.data);
            setActivityData(activity.data);
            setThemeData(themes.data);
            setPopularChallenges(popular.data);
        } catch (error) {
            toast.error('Failed to fetch analytics data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    fetchAnalytics();
}, []);

const activityChartData = {
    labels: activityData?.map(item => item._id) || [],
    datasets: [{
        label: 'User Activity',
        data: activityData?.map(item => item.count) || [],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
    }]
};

const themeChartData = {
    labels: themeData?.map(item => item._id) || [],
    datasets: [{
        data: themeData?.map(item => item.count) || [],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
        ],
    }]
};

const popularChallengesData = {
    labels: popularChallenges?.map(challenge => challenge.title) || [],
    datasets: [{
        label: 'Completion Count',
        data: popularChallenges?.map(challenge => challenge.completionCount) || [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
};

if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
        </div>
    );
}

return (
    <div className="p-6 max-w-7xl mx-auto">
        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">{platformStats?.totalUsers}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Total Challenges</h3>
                <p className="text-3xl font-bold text-green-600">{platformStats?.totalChallenges}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
                <p className="text-3xl font-bold text-purple-600">
                    {((platformStats?.totalCompletions / platformStats?.totalChallenges) * 100).toFixed(1)}%
                </p>
            </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Activity Over Time */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">User Activity Trend</h3>
                <Line
                    data={activityChartData}
                    options={{
                        responsive: true,
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }}
                />
            </div>

            {/* Challenge Themes Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Challenges by Theme</h3>
                <Doughnut
                    data={themeChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'bottom' }
                        }
                    }}
                />
            </div>

            {/* Popular Challenges */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Most Popular Challenges</h3>
                <Bar
                    data={popularChallengesData}
                    options={{
                        responsive: true,
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }}
                />
            </div>
        </div>
    </div>
);
};

export default LearningGraphs