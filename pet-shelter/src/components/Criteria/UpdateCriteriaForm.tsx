import { useState } from "react";
import { CriteriaService } from "../../api/services/criteria.service";

export const UpdateCriteriaForm = () => {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id !== null && name.trim() && description.trim()) {
      try {
        const response = await CriteriaService.update(id, {
          name,
          description,
        });
        console.log("Updated successfully:", response.data);
        alert("Criteria updated successfully!");
        setId(null);
        setName("");
        setDescription("");
      } catch (error) {
        console.error("Error updating criteria:", error);
        alert("Error updating criteria. Check the console for details.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 rounded shadow-md"
    >
      <label>
        <span className="block font-semibold mb-1">Criteria ID:</span>
        <input
          type="number"
          placeholder="Enter ID"
          value={id || ""}
          className="border p-2 rounded w-full"
          onChange={(e) => setId(Number(e.target.value))}
          required
        />
      </label>

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
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Criteria
      </button>
    </form>
  );
};
