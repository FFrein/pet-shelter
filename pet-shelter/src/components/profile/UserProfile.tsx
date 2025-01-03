import { useCallback, useEffect, useState } from "react";
import { AdoptionRequestService } from "../../api/services/all.services";
import { AdoptionRequest } from "../../consts/models";

export const UserProfile: React.FC = () => {
  const [activeReq, setActiveReq] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await AdoptionRequestService.getAll("active");
      setActiveReq(data);
    } catch (error: any) {
      console.error(error);
      setError("Не удалось загрузить заявки. Попробуйте еще раз позже.");
    } finally {
      setLoading(false);
    }
  }, []);

  const getStatus = (isProcessed: number) => {
    return isProcessed === 0 ? "Ожидает обработки" : "Обработана";
  };

  useEffect(() => {
    handleGetAll();
  }, [handleGetAll]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Заявки</h1>
      {loading && (
        <div className="flex justify-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          {error}
        </div>
      )}

      {!loading && !error && activeReq.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Животное
                </th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Описание
                </th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Статус
                </th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Ответ
                </th>
              </tr>
            </thead>
            <tbody>
              {activeReq.map((req) => (
                <tr key={req.ID} className="border-t">
                  <td className="py-4 px-6 text-sm text-gray-700">{req.ID}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {req.Animal.Name} (ID: {req.AnimalId})
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {req.description}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {getStatus(req.isProcessed)}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {req.answer ? req.answer : "Нет ответа"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && activeReq.length === 0 && (
        <p className="text-gray-600">Нет доступных заявок.</p>
      )}
    </div>
  );
};
