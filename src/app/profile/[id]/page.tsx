"use client"
import NavBar from '@/components/NavBar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface User {
    id: string;
    username: string;
    email: string;
    // Add other properties as needed
}

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
    // State to store user details
    const [userData, setUserData] = useState<User>(user);
    const router = useRouter()

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Fetch user details from /api/me
                const response = await fetch('/api/v1/me');
                const data = await response.json();

                if (response.ok) {
                    // Update the user data in state
                    setUserData(data.user);
                } else {
                    console.error('Error fetching user details:', data.error);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []); // Run once when the component mounts

    const logOut = () => {
        try {
            axios.get(`/api/v1/users/logout`)
            toast.success("Logout successfully")
            router.push('/sign-in')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <div>
            <NavBar />
            <h1>User Profile</h1>
            <p>ID: {userData?.id}</p>
            <p>Username: {userData?.username}</p>
            <p>Email: {userData?.email}</p>
            <button onClick={logOut} className='outline outline-offset-2 outline-1 p-2 cursor-pointer'>Log Out</button>
        </div>
    );
};

export default UserProfile;
