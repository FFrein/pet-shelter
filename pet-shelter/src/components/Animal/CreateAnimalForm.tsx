import { useContext, useState } from "react";
import { AnimalsService } from "../../api/services/all.services";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

export const CreateAnimalForm = observer(() => {
  const { store } = useContext(Context);

  const [animal, setAnimal] = useState({
    animalTypeId: 0,
    petShelterId: parseInt(store.user.id),
    name: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (animal.petShelterId) {
        const response = await AnimalsService.create(animal);
        console.log(response.data);
      } else {
        console.log("Pet SHelter Id Error");
      }
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
          setAnimal({ ...animal, animalTypeId: Number(e.target.value) })
        }
      />
      {/*
            <input
        type="number"
        placeholder="Pet Shelter ID"
        onChange={(e) =>
          setAnimal({ ...animal, petShelterId: Number(e.target.value) })
        }
      />
      */}
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setAnimal({ ...animal, description: e.target.value })}
      />
      <button
        type="submit"
        className="bg-[#ed5c01] hover:bg-[#d65400] text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
    </form>
  );
});
