// components/GameRules.tsx
import React from 'react';
import NavBar from '../NavBar';

const GameRules: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className="container mx-auto my-8">
                <span className='text-4xl mb-3'>
                    Be our top scorer
                </span>
                <h1 className="text-3xl font-bold mb-4">Game Rules</h1>
                <ul className="list-disc pl-5">
                    <li>Rule 1: Get your account.</li>
                    <li>Rule 2: Login to your account.</li>
                    <li>Rule 3: Go to game.</li>
                    <li>Rule 4: Guess the correct answer.</li>
                </ul>
            </div>
        </>
    );
};

export default GameRules;
