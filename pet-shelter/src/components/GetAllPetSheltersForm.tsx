import { useState } from "react";
import { PetShelterService } from "../api/services/all.services";

export const GetAllPetSheltersForm = () => {
  const [petShelters, setPetShelters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetAll = async () => {
    try {
      const response = await PetShelterService.getAll();
      setPetShelters(response.data);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при получении приютов: " + err.message);
      setPetShelters([]);
    }
  };

  return (
    <div className="p-4 border border-[#062d3e] rounded">
      <button
        onClick={handleGetAll}
        className="bg-[#ed5c01] hover:bg-[#d65400] text-white font-bold py-2 px-4 rounded"
      >
        Получить все приюты
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <ul className="mt-4 space-y-2">
        {petShelters.map((shelter, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            <strong>ID:</strong> {shelter.ID}, <strong>Name:</strong>{" "}
            {shelter.Name}, <strong>Address:</strong> {shelter.Address},{" "}
            <strong>Email:</strong> {shelter.Email}
          </li>
        ))}
      </ul>
    </div>
  );
};
