// pages/api/scores.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/dbConfig/dbConfig';
import User from "@/models/userModel"

connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { userId } = req.body;

            // Validate input
            if (!userId) {
                return res.status(400).json({ error: 'Invalid input' });
            }

            // Find the user by userId
            const userScore = await User.findOne({ userId });

            if (!userScore) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Increment the score by 1
            userScore.score += 1;
            await userScore.save();

            res.status(200).json({ message: 'Score incremented successfully' });
        } catch (error) {
            console.error('Error incrementing score:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
