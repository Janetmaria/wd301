import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
        <nav>Navigation</nav>
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-lg text-gray-600">The page you're looking for does not exist.</p>
            <button id="backToHomeButton" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate('/home')}>
                Back to Home
            </button>
        </div>
    );
};

export default NotFound;