import { useState } from "react";
import { AnimalDiseasesService } from "../../api/services/all.services";

export const UpdateAnimalDiseaseForm = () => {
  const [id, setId] = useState<number>();
  const [animalId, setAnimalId] = useState<number>();
  const [diseasesId, setDiseasesId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalDiseasesService.update(
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
        placeholder="Diseases ID"
        onChange={(e) => setDiseasesId(Number(e.target.value))}
      />
      <button type="submit">Update</button>
    </form>
  );
};