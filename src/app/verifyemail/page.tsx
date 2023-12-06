"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            axios.post(`/api/v1/verifyEmail`,
                { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl">Verify Email</h1>
                <h1>{token ? `${token}` : 'no token'}</h1>
                {verified && (
                    <div><h2 className="text-2xl">Email Verified</h2>
                        <Link href="/sign-in" className='flex items-center p-2 gap-x-1 outline outline-offset-2 outline-1 cursor-pointer'><div>Sign In</div><span className='animate-bounce'></span></Link>
                    </div>
                )}
                {error && (
                    <div><h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    </div>
                )}
            </div>
        </>
    )
}