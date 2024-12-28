import { useState } from "react";
import { AnimalTypesService } from "../../api/services/all.services";

export const GetAllAnimalTypesForm = () => {
  const [animalTypes, setAnimalTypes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetAll = async () => {
    try {
      const response = await AnimalTypesService.getAll();
      setAnimalTypes(response.data);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при получении типов животных: " + err.message);
      setAnimalTypes([]);
    }
  };

  return (
    <div className="p-4 border border-[#062d3e] rounded">
      <button
        onClick={handleGetAll}
        className="bg-[#ed5c01] hover:bg-[#d65400] text-white font-bold py-2 px-4 rounded"
      >
        Получить все типы животных
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <ul className="mt-4">
        {animalTypes.map((type, index) => (
          <li key={index}>
            <strong>ID:</strong> {type.ID}, <strong>TypeName:</strong>{" "}
            {type.TypeName}, <strong>Description:</strong> {type.Description}
          </li>
        ))}
      </ul>
    </div>
  );
};
