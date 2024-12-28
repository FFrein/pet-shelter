import { useState } from "react";
import { AnimalTypeDiseasesService } from "../../api/services/all.services";

export const DeleteAnimalTypeDiseaseForm = () => {
  const [id, setId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalTypeDiseasesService.delete(id!);
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
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete Record
      </button>
    </form>
  );
};
