import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../FirebaseProbider/FirbaseProvider';
import { IoIosLogOut } from "react-icons/io";
export default function Header() {
  const [isLogin, setLogin] = useState(false);
  const { logOut, usern } = useContext(AuthContext);

  useEffect(() => {
    setLogin(!!usern);
  }, [usern]);

  return (
    <header>
      <div className="navbar bg-base-100 p-0">
        <div className="flex-1">
          <a href='/' className="font-bold" title='Home'> <img src="/vite.svg" alt="logo" className='g-6 w-6 inline-block mr-1' />
          Store</a>
        </div>
        {isLogin ? (
          <div className="flex-none gap-2">
           
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-sm btn-ghost avatar">
                <IoIosLogOut className='text-xl font-semibold text-red-600' />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-300 rounded-box font-bold z-[1] mt-3 w-44 p-2 shadow">
                <li><a onClick={logOut}>Logout</a></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-sm btn-ghost ">
                Log In
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-44 p-2 shadow">
                <li className='text-green-600 font-semibold'><a href='/login'>Log In</a></li>
                <li className='text-green-600 font-semibold mt-1'><a href='/signup'>Sign Up</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
