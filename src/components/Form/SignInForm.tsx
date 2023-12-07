"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
interface User {
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<User>({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/v1/users/login', user);
      toast.success('Login success');
      const meResponse = await axios.get("/api/v1/me");
      const username = meResponse.data.user.username;
      router.push(`/profile/${username}`)
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <>
      <div className="bg-grey-200 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign In</h1>
              <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                autoComplete="email"
              />

              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                autoComplete="password"
              />
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-purple-900 text-white hover:bg-purple-900 focus:outline-none focus:bg-purple-900 my-1 cursor-pointer"
                disabled={buttonDisabled}
              >
                {loading ? 'Processing' : 'Log In'}
              </button>
            </div>
          </form>
          <div className="text-grey-dark mt-6 mr-3">
            Don't have an account? Don't Worry{' '}
            <Link className="ml-2 no-underline border-b border-blue text-blue" href="/sign-up">
              {loading ? 'Processing' : 'Sign Up'}
            </Link>
            .
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default SignUpForm;
