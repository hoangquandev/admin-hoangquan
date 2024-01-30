import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <ul className="flex justify-center mt-4">
            {currentPage > 1 && (
                <li className="mx-1">
                    <button
                        onClick={() => paginate(1)}
                        className="px-4 py-2 rounded-md focus:outline-none bg-gray-200 text-gray-600 hover:bg-gray-300"
                    >
                        First
                    </button>
                </li>
            )}
            {pageNumbers.map(number => (
                <li key={number} className="mx-1">
                    <button
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded-md focus:outline-none ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                    >
                        {number}
                    </button>
                </li>
            ))}
            {currentPage < totalPages && (
                <li className="mx-1">
                    <button
                        onClick={() => paginate(totalPages)}
                        className="px-4 py-2 rounded-md focus:outline-none bg-gray-200 text-gray-600 hover:bg-gray-300"
                    >
                        Last
                    </button>
                </li>
            )}
        </ul>
    );
};

export default Pagination;
