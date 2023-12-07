"use client"

import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import toast from 'react-hot-toast'

export default function MathProblem() {
    const [userAnswer, setUserAnswer] = useState('');
    const [apiAnswer, setApiAnswer] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const meResponse = await axios.get('/api/v1/me');
            const userId = meResponse.data.user.id;
            setUserId(userId);

            const response = await fetch('https://marcconrad.com/uob/tomato/api.php', { method: 'GET' });
            const data = await response.json();

            if (!response.ok || !data) {
                throw new Error(`Error fetching data. Status: ${response.status}`);
            }

            const { question, solution } = data;
            setImageSrc(question);
            setApiAnswer(solution);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const incrementScore = async () => {
        try {
            const response = await axios.put('/api/v1/scores', { userId });

            if (response.status === 200) {
                toast.success('Score incremented successfully');
            } else {
                throw new Error(`Error incrementing score. Status: ${response.status}`);
            }
        } catch (error:any) {
            console.error('Error incrementing score:', error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUserAnswer = () => {
        const normalizedApiAnswer = apiAnswer?.toString().toLowerCase();
        const normalizedUserAnswer = userAnswer.toLowerCase();

        const isCorrect = normalizedUserAnswer === normalizedApiAnswer;

        if (isCorrect) {
            toast.success('Correct answer!');
            incrementScore();
        } else {
            toast.error('Incorrect answer. Try again.');
        }

        setUserAnswer('');
    };

    return (
        <div className="flex flex-col flex-wrap items-center gap-7">
            <h1 className="text-2xl font-bold">Tomato Quiz</h1>
            <h2>Fetch Data from API</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {imageSrc && <img src={imageSrc} alt="Tomato" className="text-center w-1/2" />}
                    <div className="flex flex-wrap gap-1">
                        <label>Your Answer:</label>
                        <input
                            type="text"
                            className="w-2/4 text-black"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                        />
                    </div>
                    <button className="flex gap-x-1 outline outline-offset-2 outline-1 cursor-pointer p-1 text-md" onClick={handleUserAnswer}>
                        Submit Answer
                    </button>
                </>
            )}
            <Toaster />
        </div>
    );
}
