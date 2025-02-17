import React, { useState } from "react";
import { CriteriaService } from "../../api/services/criteria.service";

export const CreateCriteriaForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      try {
        const response = await CriteriaService.create({ name, description });
        console.log("Criteria created successfully:", response.data);
        alert("Criteria created successfully!");
        setName("");
        setDescription("");
      } catch (error) {
        console.error("Error creating criteria:", error);
        alert("Error creating criteria. Check the console for details.");
      }
    } else {
      alert("Please provide both Name and Description.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 rounded shadow-md"
    >
      <label>
        <span className="block font-semibold mb-1">Criteria Name:</span>
        <input
          type="text"
          placeholder="Enter Criteria Name"
          value={name}
          className="border p-2 rounded w-full"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        <span className="block font-semibold mb-1">Description:</span>
        <textarea
          placeholder="Enter Criteria Description"
          value={description}
          className="border p-2 rounded w-full"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Создать
      </button>
    </form>
  );
};
