import React, { useState , useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const emailref = useRef();
    const passref = useRef();
    const firstnameref = useRef();
    const lastnameref = useRef();
    const navigate = useNavigate();



    async function signup(){
        const email = emailref.current.value;
        const password = passref.current.value;
        const firstname = firstnameref.current.value;
        const lastname = lastnameref.current.value;
        await axios.post('http://localhost:3000/signup',{
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname
        })
        alert("You Have SignedUP!!!!!!!!!");
        navigate("/signin");
    }

    return (
        <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div className="bg-white rounded-xl min-w-48 p-8">
                <h2 className="text-4xl flex justify-center font-bold m-4">Sign Up</h2>
                <input ref={emailref} className="w-full p-2 m-4 border rounded" type="email" placeholder="Email"/>

                <input ref={passref}  className="w-full p-2 m-4 border rounded" type="password" placeholder="Password"/>

                <input ref={firstnameref}  className="w-full p-2 m-4 border rounded" type="password" placeholder="firstname"/>

                <input ref={lastnameref}  className="w-full p-2 m-4 border rounded" type="password" placeholder="lastname"/>
                <div className='flex justify-center'><button onClick={signup} className=" p-2 bg-purple-500 text-white rounded" type="submit">Sign Up</button></div>
            </div>
        </div>
    );
}
