import { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react'


interface PaginationProps {
    modelValue?: number | null;
    totalItems: number;
    itemsPerPage: number;
    displayRange: number;
    prevButtonClass?: string;
    nextButtonClass?: string;
    navButtonClass?: string;
    navActiveButtonClass?: string;
    navInActiveButtonClass?: string;
    onUpdateModelValue?: (value: number) => void;
}

export const Pagination = ({
    modelValue = null,
    totalItems,
    itemsPerPage,
    displayRange,
    prevButtonClass = "flex items-center text-[#777777] p-1.5 bg-white -mr-2 rounded-xl",
    nextButtonClass = "-ml-2 flex items-center text-[#777777] bg-white p-1.5 rounded-xl",
    navButtonClass = "flex items-center p-1.5 justify-center",
    navActiveButtonClass = "drop-shadow-primary text-white bg-PRIMARY rounded-xl shadow-md",
    navInActiveButtonClass = "text-[#777777] bg-transparent",
    onUpdateModelValue
}: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(modelValue || 1);

    useEffect(() => {
        if (modelValue && modelValue !== currentPage) {
            setCurrentPage(modelValue);
        }
    }, [modelValue]);

    const totalPages = useMemo(() => {
        return Math.ceil(totalItems / itemsPerPage);
    }, [totalItems, itemsPerPage]);

    const navItemClass = (pageNum: number) => {
        let returnClass = navButtonClass;
        if (currentPage === pageNum) {
            returnClass = `${returnClass} ${navActiveButtonClass}`;
        } else {
            returnClass = `${returnClass} ${navInActiveButtonClass}`;
        }
        return returnClass;
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            changePage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            changePage(currentPage - 1);
        }
    };

    const displayedPages = useMemo(() => {
        const pages: (number | string)[] = [];

        if (totalPages <= displayRange * 2 + 1) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - displayRange);
            let end = Math.min(totalPages, currentPage + displayRange);

            if (currentPage === totalPages) {
                start = start - 1;
            }

            if (currentPage <= displayRange) {
                end = end + (displayRange - (currentPage - 1));
            }

            if (currentPage >= totalPages - displayRange) {
                pages.push("...");
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages) {
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    }, [currentPage, totalPages, displayRange]);

    const changePage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            if (onUpdateModelValue) {
                onUpdateModelValue(page);
            }
        }
    };

    return (
        <div className="bg-transparent rounded-xl">
            <nav>
                <ul className="flex space-x-2 gap-2">
                    <li>
                        <div
                            className={`${prevButtonClass} ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:ring-1 hover:ring-[#777777] bg-transparent'
                                }`}
                            onClick={prevPage}
                        >
                            <Icon icon="mdi:chevron-left" width={20} height={20} className="h-5 w-5" />
                        </div>
                    </li>

                    {displayedPages.map((pageNumber) => (
                        <li key={typeof pageNumber === 'string' ? pageNumber : `page-${pageNumber}`}>
                            <div
                                className={typeof pageNumber === 'number' ? navItemClass(pageNumber) : ''}
                                onClick={() => typeof pageNumber === 'number' && changePage(pageNumber)}
                            >
                                <div className="text-xs font-semibold h-5 w-5 flex items-center justify-center cursor-pointer">
                                    {pageNumber}
                                </div>
                            </div>
                        </li>
                    ))}

                    <li>
                        <div
                            className={`${nextButtonClass} ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer hover:ring-1 hover:ring-[#777777] bg-transparent'
                                }`}
                            onClick={nextPage}
                        >
                            <Icon icon="mdi:chevron-right" width={20} height={20} className="h-5 w-5" />
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};