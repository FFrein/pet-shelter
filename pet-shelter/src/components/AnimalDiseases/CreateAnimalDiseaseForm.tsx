import React, { useState } from "react";
import { AnimalDiseasesService } from "../../api/services/all.services";

export const CreateAnimalDiseaseForm = () => {
  const [animalId, setAnimalId] = useState<number>();
  const [diseasesId, setDiseasesId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalDiseasesService.create(
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
        placeholder="Animal ID"
        onChange={(e) => setAnimalId(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Diseases ID"
        onChange={(e) => setDiseasesId(Number(e.target.value))}
      />
      <button
        type="submit"
        className="bg-[#ed5c01] hover:bg-[#d65400] text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
    </form>
  );
};
