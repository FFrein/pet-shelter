import { useState } from "react";
import { AnimalTypeDiseasesService } from "../../api/services/all.services";

export const GetAnimalTypeDiseaseByIdForm = () => {
  const [id, setId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalTypeDiseasesService.getById(id!);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Record ID"
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button type="submit">Get Record By ID</button>
    </form>
  );
};
