import React from 'react';

const UserItem = ({ user, onEdit, onDelete, index }) => {
    const { username, email, role, phone, status } = user;

    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{index}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{username}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{email}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{role}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{phone}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{status}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="text-blue-500" onClick={onEdit}>Edit</button>
                <button className="text-red-500 ml-2" onClick={onDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default UserItem;
