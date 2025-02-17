import React, { useContext, useState } from "react";
import { AnimalsService } from "../../api/services/all.services";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

export const UpdateAnimalForm = observer(() => {
  const { store } = useContext(Context);

  const [formData, setFormData] = useState({
    ID: 0,
    animalTypeId: 0,
    petShelterId: parseInt(store.user.id),
    name: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "ID" || name.endsWith("Id") ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.petShelterId) {
        const response = await AnimalsService.update(formData);
        console.log("Животное успешно обновлено:", response.data);
      }
    } catch (error) {
      console.error("Ошибка при обновлении животного:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="number"
        name="ID"
        placeholder="Animal ID"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="animalTypeId"
        placeholder="Animal Type ID"
        onChange={handleInputChange}
      />
      {/*
        <input
        type="number"
        name="petShelterId"
        placeholder="Pet Shelter ID"
        onChange={handleInputChange}
      />
      */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="bg-[#f7b600] hover:bg-[#d7b600] text-white font-bold py-2 px-4 rounded"
      >
        Update Animal
      </button>
    </form>
  );
});
