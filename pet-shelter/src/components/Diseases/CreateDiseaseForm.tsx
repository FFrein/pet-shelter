import { useState } from "react";
import { DiseasesService } from "../../api/services/all.services";

export const CreateDiseaseForm = () => {
  const [disease, setDisease] = useState({ name: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await DiseasesService.create(disease);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setDisease({ ...disease, name: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) =>
          setDisease({ ...disease, description: e.target.value })
        }
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
