import { useState } from "react";
import { DiseasesService } from "../../api/services/all.services";

export const DeleteDiseaseForm = () => {
  const [id, setId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await DiseasesService.delete(id!);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Disease ID"
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete Disease
      </button>
    </form>
  );
};
