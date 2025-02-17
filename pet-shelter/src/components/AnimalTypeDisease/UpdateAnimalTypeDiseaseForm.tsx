import React, { useState } from "react";
import { AnimalTypeDiseasesService } from "../../api/services/all.services";

export const UpdateAnimalTypeDiseaseForm = () => {
  const [id, setId] = useState<number>();
  const [animalTypeId, setAnimalTypeId] = useState<number>();
  const [diseasesId, setDiseasesId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalTypeDiseasesService.update(id!, {
        animalTypeId: animalTypeId!,
        diseasesId: diseasesId!,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при обновлении записи:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Record ID"
        onChange={(e) => setId(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Animal Type ID"
        onChange={(e) => setAnimalTypeId(Number(e.target.value))}
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
