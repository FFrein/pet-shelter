import React, { useState } from "react";
import { CriteriaService } from "../../api/services/criteria.service";

export const DeleteCriteriaForm = () => {
  const [id, setId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id !== null) {
      try {
        await CriteriaService.delete(id);
        console.log(`Deleted criteria with ID: ${id}`);
        alert("Criteria deleted successfully!");
        setId(null);
      } catch (error) {
        console.error("Error deleting criteria:", error);
        alert("Error deleting criteria. Check the console for details.");
      }
    } else {
      alert("Please enter a valid Criteria ID.");
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
          placeholder="Enter Criteria ID"
          value={id || ""}
          className="border p-2 rounded w-full"
          onChange={(e) => setId(Number(e.target.value))}
          required
        />
      </label>

      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete Criteria
      </button>
    </form>
  );
};
