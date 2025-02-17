import { useState } from "react";
import { AnimalTypesService } from "../../api/services/all.services";

export const CreateAnimalTypeForm = () => {
  const [type, setType] = useState({ TypeName: "", Description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalTypesService.create(type);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Type Name"
        onChange={(e) => setType({ ...type, TypeName: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setType({ ...type, Description: e.target.value })}
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
