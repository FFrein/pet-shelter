import { useState } from "react";
import { AnimalsService } from "../../api/services/all.services";

export const GetAllAnimalsForm = () => {
  const [animals, setAnimals] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetAll = async () => {
    try {
      const response = await AnimalsService.getAll();
      setAnimals(response.data);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при получении данных о животных: " + err.message);
      setAnimals([]);
    }
  };

  return (
    <div className="p-4 border border-[#062d3e] rounded">
      <button
        onClick={handleGetAll}
        className="bg-[#ed5c01] hover:bg-[#d65400] text-white font-bold py-2 px-4 rounded"
      >
        Получить всех животных
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <ul className="mt-4 space-y-2">
        {animals.map((animal, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            <strong>ID:</strong> {animal.ID}, <strong>Имя:</strong>{" "}
            {animal.Name},<strong>Описание:</strong> {animal.Description},
            <strong>Тип:</strong> {animal.AnimalType?.TypeName},
            <strong>Приют:</strong> {animal.PetShelter?.Name},
            <strong>Адрес:</strong> {animal.PetShelter?.Address}
          </li>
        ))}
      </ul>
    </div>
  );
};
