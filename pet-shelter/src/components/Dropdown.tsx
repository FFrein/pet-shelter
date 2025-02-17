import React, { useState, useRef, useEffect } from "react";

type DropdownProps = {
  items: Array<string>;
  onSelect: any;
  placeholder: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Переключение открытия/закрытия списка
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Обработка выбора элемента
  const handleSelect = (item: string) => {
    setSelected(item);
    onSelect(item);
    setIsOpen(false);
  };

  // Обработка сброса выбора
  const handleReset = (event: React.MouseEvent) => {
    event.stopPropagation(); // Предотвращает закрытие списка при клике на крестик
    setSelected(null);
    onSelect(null);
  };

  // Закрытие списка при клике вне компонента
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-left w-[200px]" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={toggleDropdown}
        >
          {selected ? selected : placeholder}
          {selected ? (
            // Крестик для сброса выбора
            <span
              onClick={handleReset}
              className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              &times;
            </span>
          ) : (
            // Иконка стрелки вниз
            <svg
              className="ml-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-left absolute mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto z-10">
          <ul className="py-1">
            {items.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleSelect(item)}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    selected === item
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
