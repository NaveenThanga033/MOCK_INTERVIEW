import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'

function Header() {
    const location = useLocation()
    
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Link to="/dashboard">
                <div className='flex justify-center'>
                    <img src={'/image.avif'} width={50} height={50} alt='logo'/>
                    <h2 className='text-purple-700 font-bold text-3xl mt-2'>Inview</h2>
                </div> 
            </Link>
            
            <ul className='hidden md:flex gap-6'>
                <li>
                    <Link 
                        to="/dashboard" 
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${location.pathname === '/dashboard' && 'text-primary font-bold'}`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/questions" 
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${location.pathname === '/questions' && 'text-primary font-bold'}`}
                    >
                        Questions
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/upgrade" 
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${location.pathname === '/upgrade' && 'text-primary font-bold'}`}
                    >
                        Upgrade
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/how-it-works" 
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${location.pathname === '/how-it-works' && 'text-primary font-bold'}`}
                    >
                        How it works?
                    </Link>
                </li>
            </ul>
            
            <UserButton />
        </div>
    )
}

export default Header