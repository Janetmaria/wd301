import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
        <nav>Navigation</nav>
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        </div>
    );
};

export default NotFound;