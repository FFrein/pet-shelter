import { useCallback, useContext, useEffect, useState } from "react";
import Paginator from "../Paginator";
import { Context } from "../../main";
import { CriteriaService } from "../../api/services/criteria.service";

export const GetAllCriteria = () => {
  const { store } = useContext(Context);
  const [criteria, setCriteria] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleGetAll = useCallback(async (page: number) => {
    try {
      const response = await CriteriaService.getAll(page);
      setCriteria(response.data);
      setError(null);
    } catch (err: any) {
      setError("Error fetching criteria: " + err.message);
      setCriteria([]);
    }
  }, []);

  useEffect(() => {
    handleGetAll(currentPage);
  }, [currentPage, handleGetAll]);

  const onPageChange = (page: number) => {
    if (page < 1) return;
    setCurrentPage(page);
    handleGetAll(page);
  };

  return (
    <div>
      {error && <div className="text-red-500 mt-2">{error}</div>}

      <ul className="mt-4 h-[410px] overflow-y-auto overflow-x-hidden">
        {criteria.map((item) => (
          <li
            className="p-2 border-b border-gray-200 hover:bg-gray-100"
            key={item.ID}
          >
            {store.user.role === "admin" ||
            store.user.role === "shelterManager" ? (
              <>
                <strong>ID:</strong> {item.ID},{" "}
              </>
            ) : null}
            <strong>Name:</strong> {item.Name}, <strong>Description:</strong>{" "}
            {item.Description}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Paginator
          currentPage={currentPage}
          onPageChange={onPageChange}
          dataLength={criteria.length}
        />
      </div>
    </div>
  );
};
