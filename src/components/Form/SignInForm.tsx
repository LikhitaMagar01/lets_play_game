"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'

const SignUpForm = () => {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/v1/users/login", user)
            console.log("login success", response.data)
            toast.success("Login success")
            router.push('/game')
        }catch(error:any) {
            console.log("Login failed", error.message)
            toast.error(error.message)
        }finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        }else {
            setButtonDisabled(true)
        }
    }, [user])

    return (<>
        <div className="bg-grey-200 min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign In</h1>
                    <input
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-purple-900 text-white hover:bg-purple-900 focus:outline-none focus:bg-purple-900 my-1 cursor-pointer" onClick={onLogin}
                    >Log In</button>
                </div>
                <div className="text-grey-dark mt-6 mr-3">
                    Don't have an account? Don't Worry 
                    <Link className="ml-2 no-underline border-b border-blue text-blue" href="/sign-up">
                    {loading ? "Processing" : "Sign Up"}
                    </Link>.
                </div>
            </div>
        </div>
    </>)
}
export default SignUpForm