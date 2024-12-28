import React, { useState } from "react";
import { AnimalsService } from "../../api/services/all.services";

export const DeleteAnimalForm = () => {
  const [id, setId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalsService.delete(id!);
      console.log("Животное успешно удалено:", response.data);
    } catch (error) {
      console.error("Ошибка при удалении животного:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Animal ID"
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete Animal
      </button>
    </form>
  );
};
