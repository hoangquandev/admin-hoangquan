import React, { useEffect, useState } from 'react';
import UserItem from './UserItem';
import RegisterForm from '../../components/forms/register-form';
import { deleteUserByAdmin, getAllUsers } from '../../api/user';
import EditUserForm from '../../components/forms/user/EditUserForm';
import * as XLSX from 'xlsx';
import Pagination from '../../components/pagination';

const Users = () => {
    const [addPopup, setAddPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await getAllUsers();
                if (response && response.length) {
                    setUsers(response);
                } else {
                    console.error('No user data returned.');
                }
            } catch (error) {
                console.error('Error fetching user list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserList();
    }, [change]);

    const getFileName = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `Danh_sach_user_${day}-${month}-${year}.xlsx`;
    };

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(users);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
        const fileName = getFileName();
        XLSX.writeFile(workbook, fileName);
    };

    const handleDeleteUser = async (id) => {
        const response = await deleteUserByAdmin(id);
        setChange(!change);
    };

    const handleClickEditPopup = (user) => {
        setSelectedUser(user);
        setEditPopup(true);
    };

    const handleCloseEditPopup = (e) => {
        if (e.target.classList.contains('bg-slate-600')) {
            setSelectedUser(null);
            setEditPopup(false);
        }
    };

    const handleClickAddPopup = () => {
        setAddPopup(true);
    };

    const handleClosePopup = (e) => {
        if (e.target.classList.contains('bg-slate-600')) {
            setAddPopup(false);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Users</h1>
                <div>
                    <button onClick={handleClickAddPopup} className="bg-blue-500 mr-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                        Add User
                    </button>
                    <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                        Export to Excel
                    </button>
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STT</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <UserItem key={index} user={user} index={index + 1 + (currentPage - 1) * usersPerPage} onEdit={() => handleClickEditPopup(user)} onDelete={() => handleDeleteUser(user._id)} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} currentPage={currentPage} />
            </div>
            {addPopup && <div onClick={handleClosePopup} className='fixed top-0 left-0 w-screen h-screen bg-slate-600 bg-opacity-80 flex justify-center items-center'>
                <RegisterForm onChange={() => setChange(!change)} />
            </div>}
            {editPopup && (
                <div onClick={handleCloseEditPopup} className='fixed top-0 left-0 w-screen h-screen bg-slate-600 bg-opacity-80 flex justify-center items-center'>
                    <EditUserForm onChange={() => { setChange(!change); setEditPopup(false); }} initialValues={selectedUser} id={selectedUser._id} />
                </div>
            )}
        </div>
    );
};

export default Users;
