import { useState } from "react";
import { AnimalCriteriaService } from "../../api/services/criteria.service";

export const UpdateAnimalCriteriaForm = () => {
  const [id, setId] = useState<number>();
  const [animalId, setAnimalId] = useState<number>();
  const [diseasesId, setDiseasesId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalCriteriaService.update(
        id!,
        animalId!,
        diseasesId!
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="ID"
        onChange={(e) => setId(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Animal ID"
        onChange={(e) => setAnimalId(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Criteria ID"
        onChange={(e) => setDiseasesId(Number(e.target.value))}
      />
      <button type="submit">Update</button>
    </form>
  );
};
