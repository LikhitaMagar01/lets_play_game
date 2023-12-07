"use client"
import { BiSolidBox } from 'react-icons/bi'
import { PiHamburgerLight } from 'react-icons/pi'
import { AiOutlineArrowDown } from 'react-icons/ai'
import Link from 'next/link'
import { useState } from 'react'
import Drawer from './Drawer'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    function toggle() {
        setIsOpen((isOpen) => !isOpen)
    }
    return <nav className='flex justify-between md:justify-around p-5'>
        <div>
            <BiSolidBox size={25} href={"/"} className="cursor-pointer" />
        </div>
        <PiHamburgerLight size={25} onClick={toggle} className='cursor-pointer md:hidden flex' />
        {
            isOpen && (<Drawer isOpen={isOpen} onClose={toggle}>
                <div className='flex flex-col gap-4 p-2'>
                    <Link href="/sign-in" className='cursor-pointer'>Sign In</Link>
                    <Link href="/sign-up" className='flex gap-x-1 outline outline-offset-2 outline-1 cursor-pointer'><div>Sign Up</div><span className='animate-bounce'><AiOutlineArrowDown size={25} /></span></Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/game'}>Game</Link>
                    <Link href={'/'}>Contact</Link>
                    <Link href={'/'}>Blogs</Link>
                </div>
            </Drawer>
            )
        }
        <div className='gap-x-8 hidden md:flex'>
            <Link href={'/'}>Home</Link>
            <Link href={'/game'}>Game</Link>
            <Link href={'/'}>How to play</Link>
            <Link href={'/'}>Top Scorer</Link>
        </div>
        <div className='gap-x-4 hidden md:flex'>
            <Link href="/sign-in" className='cursor-pointer'>Sign In</Link>
            <Link href="/sign-up" className='flex items-center px-1 py-0 rounded gap-x-1 outline outline-offset-2 outline-1 cursor-pointer'><div>Sign Up</div><span className='animate-bounce'><AiOutlineArrowDown size={16} /></span></Link>
        </div>
    </nav>
}

export default NavBar