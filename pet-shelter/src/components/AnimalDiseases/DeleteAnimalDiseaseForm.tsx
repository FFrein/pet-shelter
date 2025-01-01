import React, { useState } from "react";
import { AnimalDiseasesService } from "../../api/services/all.services";

export const DeleteAnimalDiseaseForm = () => {
  const [id, setId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalDiseasesService.delete(id!);
      console.log("Deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting animal disease:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Animal Disease ID"
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </form>
  );
};
