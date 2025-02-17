import { useEffect, useState } from "react";
import { AnimalsService } from "../../api/services/all.services";
import { Link } from "react-router-dom";
import Paginator from "../Paginator";

type GetAllAnimalsFormType = {
  SearchCategories: Array<any>;
  Country: string;
  Type: string;
  PetShelterId?: number | string;
};

export const GetAllAnimalsForm: React.FC<GetAllAnimalsFormType> = ({
  SearchCategories,
  Country,
  Type,
  PetShelterId = null,
}) => {
  const [animals, setAnimals] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleGetAll = async (page?: number) => {
    try {
      const response = await AnimalsService.search(page ? page : currentPage, {
        criterias: SearchCategories,
        country: Country,
        animalType: Type,
        petShelterId: PetShelterId || null,
      });
      setAnimals(response.data);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при получении данных о животных: " + err.message);
      setAnimals([]);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    handleGetAll(page);
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <div>
          <button
            onClick={() => {
              handleGetAll(0);
            }}
            className="bg-[#ed5c01] hover:bg-[#d65400] text-white font-bold py-2 px-4 rounded"
          >
            Поиск
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <ul className="mt-4 space-y-2 flex flex-col gap-2">
          {animals.map((animal) => (
            <Link to={`/animal/${animal.ID}`} key={animal.ID}>
              <li className="p-2 bg-gray-100 rounded">
                <strong>ID:</strong> {animal.ID}, <strong>Имя:</strong>{" "}
                {animal.Name},<strong>Описание:</strong> {animal.Description},
                <strong>Тип:</strong> {animal.AnimalType?.TypeName},
                <strong>Приют:</strong> {animal.PetShelter?.Name},
                <strong>Адрес:</strong> {animal.PetShelter?.Address}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <Paginator
        currentPage={currentPage}
        onPageChange={handleChangePage}
        dataLength={animals.length}
      />
    </div>
  );
};
