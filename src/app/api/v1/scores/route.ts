
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function PUT(request: NextRequest){
    try {

        const reqBody = await request.json()
        const { userId } = reqBody;

        const user = await User.findByIdAndUpdate(userId, { $inc: { score: 1 } }, { new: true });
       
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Score updated successfully', user }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({error: 'score not updated'}, {status: 500})
    }
}

