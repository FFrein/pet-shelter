import { useCallback, useContext, useEffect, useState } from "react";
import { DiseasesService } from "../../api/services/all.services";
import { Link } from "react-router-dom";
import Paginator from "../Paginator";
import { Context } from "../../main";

export const GetAllDiseasesForm = () => {
  const { store } = useContext(Context);
  const [diseases, setDiseases] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleGetAll = useCallback(async (page: number, search: string) => {
    try {
      const response = await DiseasesService.getAll(page, search);
      setDiseases(response.data);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при получении типов животных: " + err.message);
      setDiseases([]);
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

  useEffect(() => {
    handleGetAll(1, "");
  }, []);

  const onPageChange = (page: number) => {
    if (page < 1) return;
    setCurrentPage(page);
    handleGetAll(page, searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск заболеваний..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <div className="text-red-500 mt-2">{error}</div>}

      <ul className="mt-4 h-[410px] overflow-y-auto overflow-x-hidden">
        {diseases.map((type) => (
          <Link to={`/diseases/${type.ID}`} key={type.ID}>
            <li className="p-2 border-b border-gray-200 hover:bg-gray-100">
              {store.user.role == "admin" ||
              store.user.role == "shelterManager" ? (
                <>
                  <strong>ID:</strong> {type.ID},
                </>
              ) : (
                ""
              )}
              <strong>Name:</strong> {type.Name},<strong>Description:</strong>{" "}
              {type.Description}
            </li>
          </Link>
        ))}
      </ul>
      <div>
        <Paginator
          currentPage={currentPage}
          onPageChange={onPageChange}
          dataLength={diseases?.length ? diseases.length : 0}
        />
      </div>
    </div>
  );
};
