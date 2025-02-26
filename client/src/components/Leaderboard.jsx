import React, { useEffect, useState } from 'react';
import { userApi } from '../services/api';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await userApi.getLeaderboard();
            setUsers(data.sort((a, b) => b.score - a.score)); 
        };
        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
            <ul className="bg-white shadow-md rounded p-4">
                {users.map((user) => (
                    <li key={user._id} className="flex justify-between border-b py-2">
                        <span>{user.username}</span>
                        <span>Score: {user.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
