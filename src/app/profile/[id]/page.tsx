"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const dynamicProfile = () => {
    const router = useRouter()
    const logOut = () => {
        try {
            axios.get(`/api/v1/users/logout`)
            toast.success("Logout successfully")
            router.push('/sign-in')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (<>
    dynamic page
    <button onClick={logOut} className='outline outline-offset-2 outline-1 p-2 cursor-pointer'>Log Out</button>
    </>)
}
export default dynamicProfile