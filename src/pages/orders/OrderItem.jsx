import React from 'react';

const OrderItem = ({ order, onEdit, onDelete, index, handleUpdateStatusOrder, handleUpdatePaymentStatusOrder }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'text-blue-600';
            case 'Processing':
                return 'text-yellow-600';
            case 'Shipped':
                return 'text-green-600';
            case 'Delivered':
                return 'text-gray-600';
            default:
                return '';
        }
    };


    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{index}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.userId?.username}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.phoneNumber}</td>
            <td onClick={() => handleUpdateStatusOrder(order._id, order.status)} className={"px-5 py-5 border-b border-gray-200 bg-white text-sm " + getStatusColor(order.status)}>
                {order.status}
            </td>
            <td onClick={() => handleUpdatePaymentStatusOrder(order._id, order.paymentStatus)} className={"px-5 py-5 border-b border-gray-200 bg-white text-sm " +
                (order.paymentStatus === 'paid' ? "text-green-600" :
                    order.paymentStatus === 'pending' ? "text-blue-600" :
                        order.paymentStatus === 'cancel' ? "text-red-600" : "")}>
                {order.paymentStatus}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.totalAmount}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="text-blue-500" onClick={onEdit}>Detail</button>
                <button className="text-red-500 ml-2" onClick={onDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default OrderItem;
