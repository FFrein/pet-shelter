import { useEffect, useState, useCallback, useContext } from "react";
import { AnimalTypesService } from "../../api/services/all.services";
import { Link } from "react-router-dom";
import Paginator from "../Paginator";
import { Context } from "../../main";

export const GetAllAnimalTypesForm = () => {
  const { store } = useContext(Context);
  const [animalTypes, setAnimalTypes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Функция для получения данных с сервера
  const handleGetAll = useCallback(async (page: number, search: string) => {
    try {
      console.log(page, search);
      const { data } = await AnimalTypesService.getAll();
      setAnimalTypes(data);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при получении типов животных: " + err.message);
      setAnimalTypes([]);
    }
  }, []);

  // Дебаунсинг поиска
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1); // Сброс страницы при новом поиске
      handleGetAll(1, searchTerm);
    }, 500); // Задержка 500 мс

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, handleGetAll]);

  const onPageChange = (page: number) => {
    if (page < 1) return;
    setCurrentPage(page);
    handleGetAll(currentPage, searchTerm);
  };

  useEffect(() => {
    handleGetAll(1, "");
  }, []);

  return (
    <div className="w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск типов животных..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <div className="text-red-500 mt-2">{error}</div>}

      <ul className="mt-4 h-[400px] overflow-y-auto overflow-x-hidden">
        {animalTypes
          ? animalTypes.map((type) => (
              <Link to={`/animalType/${type.ID}`} key={type.ID}>
                <li className="p-2 border-b border-gray-200 hover:bg-gray-100">
                  {store.user.role == "admin" ||
                  store.user.role == "shelterManager" ? (
                    <>
                      <strong>ID:</strong> {type.ID},
                    </>
                  ) : (
                    ""
                  )}
                  <strong>TypeName:</strong> {type.TypeName},{" "}
                  <strong>Description:</strong> {type.Description}
                </li>
              </Link>
            ))
          : ""}
      </ul>

      <div className="mt-4">
        <Paginator
          currentPage={currentPage}
          onPageChange={onPageChange}
          dataLength={animalTypes?.length ? animalTypes.length : 0}
        />
      </div>
    </div>
  );
};
