import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import EditUserProfileForm from '../../components/forms/user/EditUserProfileForm'
import ChangePasswordForm from '../../components/forms/user/ChangePasswordForm'

const Profile = () => {
    const [isShow, setShow] = useState(false)
    const handleClickPopup = () => {
        setShow(true)
    }
    const handleClosePopup = (e) => {
        if (e.target.classList.contains('bg-slate-600')) {
            setShow(false);
        }
    };
    return (
        <div className="container mx-auto p-5">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Profile</h1>
                <div>
                    <button onClick={handleClickPopup} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none mr-4">
                        Change Password
                    </button>

                </div>
            </div>
            <EditUserProfileForm />
            {isShow && <div onClick={handleClosePopup} className='fixed top-0 left-0 w-screen h-screen bg-slate-600 bg-opacity-80 flex justify-center items-center'>
                <ChangePasswordForm />
            </div>}
        </div>
    )
}

export default Profile