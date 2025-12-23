import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    const getPages = () => {
        const pages: (number | string)[] = [];
        // Always show first page
        pages.push(1);

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        if (start > 2) {
            pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) {
            pages.push("...");
        }

        // Always show last page if more than 1 page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="mt-16 flex items-center justify-center gap-2">
            {/* First Page */}
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
                aria-label="First page"
            >
                <FiChevronsLeft className="text-lg" />
            </button>

            {/* Previous */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
                aria-label="Previous page"
            >
                <FiChevronLeft className="text-lg" />
            </button>

            {/* Page Numbers */}
            <div className="hidden items-center gap-2 sm:flex">
                {getPages().map((page, index) => {
                    if (page === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="flex h-10 w-10 items-center justify-center text-gray-400"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all
                                ${isActive
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "text-gray-600 hover:bg-gray-100"
                                }
                            `}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            {/* Mobile simplified counter */}
            <div className="flex items-center px-4 text-sm font-medium text-gray-700 sm:hidden">
                Page {currentPage} of {totalPages}
            </div>

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
                aria-label="Next page"
            >
                <FiChevronRight className="text-lg" />
            </button>

            {/* Last Page */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
                aria-label="Last page"
            >
                <FiChevronsRight className="text-lg" />
            </button>
        </div>
    );
};

export default Pagination;