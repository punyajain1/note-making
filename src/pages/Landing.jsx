import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
            <div className="max-w-2xl text-center p-8">
                <h1 className="text-5xl font-bold mb-6">Welcome to MemoMate</h1>
                <p className="text-xl mb-8">Your personal space for organizing thoughts, ideas, and memories. Create, store, and manage your notes with ease.</p>
                
                <div className="space-x-4">
                    <button 
                        onClick={() => navigate('/signin')}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => navigate('/signup')}
                        className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}