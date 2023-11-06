"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/lib/auth'

const SignUpForm: React.FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setError(e.target.value)
    }

    const clearInputs = () => {
        setEmail("");
        setPassword("");
        setError("");
    }

    interface RegistrationResponse {
        status: number;
        message: string;
        // Define other properties as needed
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // try {
        //     const res = await registerUser(username, email, password) as RegistrationResponse;
        //     if (res.status === 201) {
        //         clearInputs();
        //         const router = useRouter();
        //         router.push('/login');
        //     } else {
        //         setError(res.message);
        //     }
        // } catch (e) {
        //     console.error(e);
        // }
    };

    return (<>
        <form
            onSubmit={handleSubmit} className="bg-grey-200 min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign In</h1>
                    <input
                        value={email}
                        onChange={handleEmailChange}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-purple-900 text-white hover:bg-purple-900 focus:outline-none focus:bg-purple-900 my-1 cursor-pointer"
                    >Log In</button>
                </div>
                <div className="text-grey-dark mt-6 mr-3">
                    Don't have an account? Don't Worry 
                    <a className="ml-2 no-underline border-b border-blue text-blue" href="/sign-up">
                        Sign Up
                    </a>.
                </div>
            </div>
        </form>
    </>)
}
export default SignUpForm