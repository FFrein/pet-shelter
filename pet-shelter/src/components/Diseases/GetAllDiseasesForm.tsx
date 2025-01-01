import { useState } from "react";
import { DiseasesService } from "../../api/services/all.services";
import { Link } from "react-router-dom";

export const GetAllDiseasesForm = () => {
  const [diseases, setDiseases] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetAll = async () => {
    try {
      const response = await DiseasesService.getAll();
      setDiseases(response.data);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при получении типов животных: " + err.message);
      setDiseases([]);
    }
  };

  return (
    <div>
      <button onClick={handleGetAll}>Get All Diseases</button>

      <ul className="mt-4">
        {diseases.map((type, index) => (
          <Link to={`/animalType/${type.ID}`}>
            <li key={index}>
              <strong>ID:</strong> {type.ID}, <strong>Name:</strong> {type.Name}
              , <strong>Description:</strong> {type.Description}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
