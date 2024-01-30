import React from 'react';

const ProductItem = ({ product, onEdit, onDelete, index }) => {
    const { name, description, price, status } = product;

    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{index}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{name}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{description}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{price}</td>
            <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm " + (status ? "text-green-600" : "text-yellow-600")}>{status ? 'public' : 'draft'}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="text-blue-500" onClick={onEdit}>Edit</button>
                <button className="text-red-500 ml-2" onClick={onDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default ProductItem;
