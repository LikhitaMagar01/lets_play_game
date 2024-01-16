// pages/highest-scores.tsx
"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from '@/components/UserList/HighestUserList';
import NavBar from '@/components/NavBar';

type User = {
  _id: string;
  username?: string;
  score: number;
};

const HighestScores: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/highest-score');
        console.log('API Response:', response.data); // Log the response

        const fetchedUsers = response.data.users;

        if (Array.isArray(fetchedUsers) && fetchedUsers.length > 0) {
          setUsers(fetchedUsers);
        } else {
          console.error('Invalid or empty user data received.');
        }
      } catch (error) {
        console.error('Error fetching highest scores:', error);
      }
    };


    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Highest Scorers</h1>
        {users.length > 0 ? (
          <UserList users={users} />
        ) : (
          <p className="text-gray-600">Loading highest scores...</p>
        )}
      </div>
    </>
  );
};

export default HighestScores;
