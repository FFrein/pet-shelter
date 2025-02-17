import { useState } from "react";
import { AnimalTypeDiseasesService } from "../../api/services/all.services";

export const CreateAnimalTypeDiseaseForm = () => {
  const [link, setLink] = useState({ animalTypeId: 0, diseasesId: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalTypeDiseasesService.create(link);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Animal Type ID"
        onChange={(e) =>
          setLink({ ...link, animalTypeId: Number(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Diseases ID"
        onChange={(e) =>
          setLink({ ...link, diseasesId: Number(e.target.value) })
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
