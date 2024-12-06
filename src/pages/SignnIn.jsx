import React, { useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const emailref = useRef();
    const passref = useRef();
    const navigate = useNavigate();

    async function signin(){
        const email = emailref.current.value;
        const password = passref.current.value;
        const response = await axios.post('http://localhost:3000/signin',{
            email:email,
            password:password,
        })
        const jwt = response.data.token;
        localStorage.setItem("token" , jwt);
        navigate("/dashboard");
    }

    return (
        <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div className="bg-white rounded-xl min-w-48 p-8">
                <h2 className="text-4xl flex justify-center font-bold m-4">Sign In</h2>
                <input ref={emailref} className="w-full p-2 m-4 border rounded" type="email" placeholder="Email"  />
                <input ref={passref} className="w-full p-2 m-4 border rounded" type="password" placeholder="Password"/>
                <div className='flex justify-center'><button onClick={signin} className=" p-2 bg-purple-500 text-white rounded" type="submit">Sign In</button></div>
            </div>
        </div>
    );
}
