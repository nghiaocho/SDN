import React from 'react';
import { Outlet } from 'react-router-dom';
import {Search, User} from 'lucide-react';
import {useAuth} from '../context/AuthContext';

import logo from '../assets/react.svg'

const MainLayout = () => {
    const {user} = useAuth();

  return (
    <>
        <div className='bg-primary'>
            <div>
                <img src={logo}/>
                <div>Library SDN302</div>
            </div>
            <div className='relative flex items-center '>
                <div className='absolute z-100 pl-1'><Search className='text-black size-5'/></div>
                <input className='bg-white text-black border-radius-sm pl-7 h-8 w-100' placeholder="Search"/>
            </div>
            <div>
                <div>
                    <House/> <span>Homepage</span>
                </div>
                <div> | </div>
                <div>
                    <User/> <span> Login </span> / {<span>Sign up</span>}
                </div>
            </div>
        </div>

        <main>
            <Outlet/>
        </main>

        <div>
            Footer
        </div>
    </>
  )
}

export default MainLayout;