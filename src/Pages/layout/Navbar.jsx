import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();


    const handleLogout = async () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">Rumbia ID</h1>
            <button
                className="bg-red-600 py-1.5 px-3 rounded-md font-semibold hover:bg-white hover:text-red-600"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar