import React from "react";

interface PaginatorProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  dataLength: number; // Количество элементов на текущей странице
}

const ITEMS_PER_PAGE = 10; // Предполагаемое количество элементов на странице

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  onPageChange,
  dataLength,
}) => {
  // Функция для генерации массива номеров страниц
  const getPageNumbers = () => {
    const pages = [];
    const maxDisplayedPages = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxDisplayedPages / 2)
    );
    let endPage = startPage + maxDisplayedPages - 1;

    // Поскольку общее количество страниц неизвестно, отображаем текущую страницу +/- 2
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Определяем, можно ли переходить на следующую страницу
  const canGoNext = dataLength === ITEMS_PER_PAGE;

  return (
    <nav
      className="flex justify-center items-center space-x-2 my-4"
      aria-label="Pagination"
    >
      {/* Кнопка "Назад" */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-gray-700"
        } border border-gray-300`}
      >
        Назад
      </button>

      {/* Номера страниц */}
      {getPageNumbers().map((page) => {
        const isDisabled = page > currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={isDisabled}
            className={`px-3 py-1 rounded-md border border-gray-300 ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : isDisabled
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Кнопка "Вперед" */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`px-3 py-1 rounded-md ${
          !canGoNext
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-gray-700"
        } border border-gray-300`}
      >
        Вперед
      </button>
    </nav>
  );
};

export default Paginator;
