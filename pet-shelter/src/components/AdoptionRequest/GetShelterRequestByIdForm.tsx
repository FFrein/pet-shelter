import { useCallback, useEffect, useState } from "react";
import { AdoptionRequestService } from "../../api/services/all.services";
import { AdoptionRequest } from "../../consts/models";
import { toast } from "react-toastify";

export const GetShelterRequestByIdForm: React.FC = () => {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AdoptionRequestService.getAll("active");
      setRequests(response.data);
      toast.success("Заявки успешно загружены!");
    } catch (error: any) {
      console.error("Ошибка при получении заявок", error);
      setError("Не удалось загрузить заявки. Попробуйте позже.");
      toast.error("Не удалось загрузить заявки.");
    } finally {
      setLoading(false);
    }
  }, []);

  const getStatus = (isProcessed: number) => {
    return isProcessed === 0 ? "Ожидает обработки" : "Обработана";
  };
  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Заявки на Усыновление</h2>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          {error}
        </div>
      )}

      {requests.length > 0 ? (
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
              {requests.map((req) => (
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
      ) : (
        !loading && <p className="text-gray-600">Нет доступных заявок.</p>
      )}
    </div>
  );
};
