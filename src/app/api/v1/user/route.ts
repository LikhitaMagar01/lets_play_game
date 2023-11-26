import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST'){
        return res.status(405).end();
    }
    try {
        const { username, email, password } = await req.body;

        if (!username || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        const user = await db.user.create({
            data: {
                username,
                email: email.toLowerCase(),
                password: await bcrypt.hash(password, 10)
            }
        })

        const { password: hashedPasswrod, ...result } = user;
        return NextResponse.json({ result }, { status: 201 });

    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Something went wrong while trying to register", result: e }, { status: 500 });
    }
}