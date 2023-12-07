"use client"

import { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";

export default function MathProblem() {
    const [userAnswer, setUserAnswer] = useState('');
    const [apiAnswer, setApiAnswer] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch('https://marcconrad.com/uob/tomato/api.php', { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`error fetching data. status: ${response.status}`)
            }
            if (!data) {
                throw new Error('empty response or invalid JSON format.')
            }
            const { question, solution } = data;
            setImageSrc(question);
            setApiAnswer(solution);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUserAnswer = () => {
        const normalizedApiAnswer = apiAnswer?.toString().toLowerCase(); // Ensure apiAnswer is a string

        const isCorrect = userAnswer.toLowerCase() === normalizedApiAnswer;

        if (isCorrect) {
            toast.success("Correct answer!")
            alert('correct answer')
            fetchData()
            setUserAnswer('');
        } else {
            alert('Incorrect answer. Try again.');
        }

    };

    return (
        <div className='flex flex-col flex-wrap items-center gap-5 mt-6'>
            <h1 className='text-2xl font-bold'>Tomato Quiz</h1>
            <h2>Fetch Data from API</h2>

            {imageSrc && <img src={imageSrc} alt="Tomato" className='text-center w-1/2' />}
            <div className='flex flex-wrap gap-1'>
                <label>Your Answer:</label>
                <input
                    type="text"
                    className='w-2/4 text-black'
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                />
            </div>
            <button className='flex gap-x-1 outline outline-offset-2 outline-1 cursor-pointer p-1 text-md' onClick={handleUserAnswer}>Submit Answer</button>
        </div>
    );
}
