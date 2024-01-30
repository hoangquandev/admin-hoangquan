import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../api/auth';
import { clearTokens } from '../../redux/reducers/authReducer';
import { clearUser } from '../../redux/reducers/userReducer';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const name = useSelector(state => state.user.profile?.username)

    const handleLogout = async () => {
        const response = await logoutUser();
        dispatch(clearUser())
        dispatch(clearTokens());
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">QUDE ADMIN</h1>
                <div className="relative">
                    <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                        <img src={'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='} alt="Avatar" className="w-8 h-8 rounded-full" />
                        <p>{name}</p>
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-10">
                            <Link to="/users/profile" onClick={toggleDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
