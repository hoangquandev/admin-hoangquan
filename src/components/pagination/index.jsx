import React from 'react';

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="flex justify-center mt-4">
            {pageNumbers.map(number => (
                <li key={number} className="mx-1">
                    <button
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded-md focus:outline-none ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-green-500 text-white hover:bg-blue-600'
                            }`}
                        disabled={currentPage === number}
                    >
                        {number}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default Pagination;
