import { useState } from "react";
import { DiseasesService } from "../../api/services/all.services";

export const GetDiseaseByIdForm = () => {
  const [id, setId] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await DiseasesService.getById(id!);
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
      <button type="submit">Get Disease By ID</button>
    </form>
  );
};
