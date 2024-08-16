import React, { useState, useContext, useEffect } from 'react';
import { IoColorFilterOutline } from "react-icons/io5";
import { AuthContext } from '../FirebaseProbider/FirbaseProvider';

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
          <a href='/' className="font-bold">Store</a>
        </div>
        {isLogin ? (
          <div className="flex-none gap-2">
            <div className="form-control">
              <input type="text" placeholder="Search" className="input input-sm input-bordered w-24 md:w-auto" />
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-sm btn-ghost avatar">
                <IoColorFilterOutline className='text-xl' />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a>Settings</a></li>
                <li><a>Settings</a></li>
                <li><a>Settings</a></li>
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
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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
