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
        const pages: number[] = [];

        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="mt-16 flex items-center justify-center gap-6 text-sm">

            {/* Previous */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="text-muted transition hover:text-primary disabled:opacity-30"
            >
                ←
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-4">
                {getPages().map((page) => {
                    const isActive = page === currentPage;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`relative text-sm tracking-wide transition
                ${isActive
                                    ? "text-primary font-medium"
                                    : "text-muted hover:text-primary"
                                }
              `}
                        >
                            {page}

                            {/* Active underline */}
                            {isActive && (
                                <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-primary" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="text-muted transition hover:text-primary disabled:opacity-30"
            >
                →
            </button>
        </div>
    );
};

export default Pagination;