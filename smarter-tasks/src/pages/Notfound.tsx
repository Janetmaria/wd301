import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-lg text-gray-600">The page you're looking for does not exist.</p>
            <button id="backToHomeButton" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <a href="/home">Back to Home</a>
            </button>
        </div>
    );
};

export default NotFound;