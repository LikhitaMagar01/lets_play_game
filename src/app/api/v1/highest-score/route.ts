// pages/api/v1/highest-scores.ts
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET() {
    try {
        const users = await User.find({}).sort({ score: -1 })
        // const users = await User.find({}).sort({ score: -1 }).limit(10);

        return NextResponse.json({ users }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

