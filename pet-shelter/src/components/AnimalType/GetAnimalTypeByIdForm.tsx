import React, { useState } from "react";
import { AnimalTypesService } from "../../api/services/all.services";

export const GetAnimalTypeByIdForm = () => {
  const [id, setId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalTypesService.getById(id!);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Type ID"
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button type="submit">Get Type By ID</button>
    </form>
  );
};
