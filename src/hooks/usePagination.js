import { useState } from 'react';

const usePagination = (totalItems, itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = totalItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return {
        currentItems,
        currentPage,
        itemsPerPage,
        paginate
    };
};

export default usePagination;
