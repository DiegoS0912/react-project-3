import React from 'react';
import '../styles/pagination.css';

const Pagination = ({currentPage, setCurrentPage, totalPages}) => {

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className='pagination'>
            <button onClick={handlePrev}>Prev</button>
            <span>{`${currentPage} / ${totalPages}`}</span>
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default Pagination;