import React, { useState, useRef, useContext } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { AuthContext } from '../FirebaseProbider/FirbaseProvider'
import { useForm} from "react-hook-form"
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

export default function SignUp() {
    const navigate = useNavigate();
    const { createUser } = useContext(AuthContext);
    const [formerror, setFormerror] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {register, handleSubmit, reset,  formState: { errors }, } = useForm();
    const onSubmit = (data) => {
        const { email, pass, username, image} = data;
        // Check password conditions
       
        const hasMinLength = pass.length >= 6;
        if ( !hasMinLength) {
            setFormerror('Password must have at least 6 characters long');
            return;
        }
        createUser(email, pass, username, image)
        .then(() => {
            console.log('User created successfully');
            Swal.fire({
                icon: 'success',
                title: 'User created successfully',
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            setFormerror('');
            navigate('/login');
        }).catch(error => {
                console.error('Error creating user:', error.message);
                setFormerror(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            });

    
    };

    return (
        <div className='flex flex-col items-center gap-8 py-16 px-2'>
             <Helmet>
        <title>Store - Signup</title>
      </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-96 mx-auto flex flex-col items-center gap-6 inter'>
        
                <label className="input input-bordered flex items-center gap-2 text-gray-600 w-full">
                    <AiOutlineMail />
                    <input type="text" className="grow" placeholder="Email" name='email'
                        {...register("email", { required: true })} />
                         {errors.email && <span className='text-xs text-red-500'>required field</span>}
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    {showPassword ? <IoEyeOutline onClick={() => setShowPassword(false)} /> : <IoEyeOffOutline onClick={() => setShowPassword(true)} />}
                    <input type={showPassword ? "text" : "password"} className="grow" name='pass' placeholder='password'
                    {...register("pass", { required: true })}  />
                     {errors.pass && <span className='text-xs text-red-500'>required field</span>}
                </label>
                <button type='submit' className="btn w-full rounded-md text-white hover:bg-teal-700 bg-teal-900 font-bold">Create Account</button>
                {formerror && <p className='text-xs font-bold max-w-xs text-wrap text-red-600'> {formerror}!</p>}
            </form>
            <p className='text-sm'>After regesiter you have to login to proceed.</p>
            <div>Already joined? <Link to={'/login'} className='text-teal-700 font-bold'>Log In</Link></div>
        </div>
    )
}

