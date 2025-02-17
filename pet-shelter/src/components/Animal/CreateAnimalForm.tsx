import { useContext, useState } from "react";
import { AnimalsService } from "../../api/services/all.services";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";

export const CreateAnimalForm = observer(() => {
  const { store } = useContext(Context);

  const [animal, setAnimal] = useState<{
    animalTypeId?: number;
    petShelterId?: number;
    name?: string;
    description?: string;
    age?: number;
    gender?: string;
    image?: File | null;
  }>({
    animalTypeId: 0,
    petShelterId: parseInt(store.user.id),
    name: "",
    description: "",
    age: 0,
    gender: "",
    image: null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) setAnimal({ ...animal, image: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!animal.gender || !["м", "ж"].includes(animal.gender)) {
        toast.error("Пожалуйста, выберите корректный гендер (м или ж)");
        return;
      }

      const formData = new FormData();
      formData.append("animalTypeId", String(animal.animalTypeId));
      formData.append("petShelterId", String(animal.petShelterId));
      if (animal.name) formData.append("name", animal.name);
      if (animal.description)
        formData.append("description", animal.description);
      formData.append("age", String(animal.age));
      formData.append("gender", animal.gender);
      if (animal.image) {
        formData.append("image", animal.image);
      }

      const response = await AnimalsService.create(formData);
      toast.success("Животное успешно создано!");
      console.log(response.data);

      // Сброс формы после успешного создания
      setAnimal({
        animalTypeId: 0,
        petShelterId: parseInt(store.user.id),
        name: "",
        description: "",
        age: 0,
        gender: "",
        image: null,
      });
    } catch (error: any) {
      toast.error(`Ошибка при создании животного: ${error.message || error}`);
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
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Name"
        value={animal.name}
        onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        placeholder="Age"
        value={animal.age || ""}
        onChange={(e) =>
          setAnimal({ ...animal, age: parseInt(e.target.value) })
        }
        className="p-2 border border-gray-300 rounded-md"
      />
      <select
        value={animal.gender}
        onChange={(e) => setAnimal({ ...animal, gender: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Выберите гендер</option>
        <option value="м">М</option>
        <option value="ж">Ж</option>
      </select>
      <textarea
        placeholder="Description"
        value={animal.description}
        onChange={(e) => setAnimal({ ...animal, description: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="p-2 border border-gray-300 rounded-md"
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
