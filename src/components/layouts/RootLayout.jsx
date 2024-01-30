import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../sidebar'
import Header from '../header'
import { useDispatch, useSelector } from 'react-redux'
import { viewCurrentUserProfile } from '../../api/user'
import { setUser } from '../../redux/reducers/userReducer'

const RootLayout = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await viewCurrentUserProfile();
                dispatch(setUser(response));
            } catch (error) {
                console.error('Đã xảy ra lỗi:', error);
            }
        };

        fetchData();
    }, [dispatch]);
    if (!isLoggedIn) return <Navigate to='/login' />
    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full'>
                <Header />
                <div className='overflow-y-auto p-5 w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default RootLayout