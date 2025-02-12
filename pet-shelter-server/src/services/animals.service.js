import AnimalModel from "../models/animal.model.js";
import { AnimalByIdDto } from "../database/dtos/dto.js";
export default class AnimalService {
  static async getAll(query) {
    try {
      const filters = {};
      let pagination = {};

      if (parseInt(query?.petShelterId)) {
        filters.PetShelterId = parseInt(query?.petShelterId);
      }

      // Фильтр по country
      if (query?.country) {
        filters.PetShelter = { Country: query.country };
      }

      // Фильтр по city
      if (query?.city) {
        filters.PetShelter = {
          ...filters.PetShelter,
          City: query.city,
        };
      }

      // Фильтр по type
      if (query?.animalType) {
        filters.AnimalType = { TypeName: query.animalType };
      }

      // Фильтр по критериям
      if (query?.criterias) {
        const criteriaIds = Array.isArray(query.criterias)
          ? query.criterias.map((id) => parseInt(id)).filter((id) => !isNaN(id))
          : query.criterias
              .split(",")
              .map((id) => parseInt(id))
              .filter((id) => !isNaN(id));

        if (criteriaIds.length > 0) {
          filters.AND = [
            {
              Criteria: {
                some: {
                  CriteriaId: { in: criteriaIds },
                },
              },
            },
            {
              Criteria: {
                every: {
                  CriteriaId: { in: criteriaIds },
                },
              },
            },
          ];
        }
      }

      filters.PetShelter = {
        ...filters.PetShelter,
        isBanned: 0,
      };

      filters.Archived = 0;

      // Пагинация
      const page = parseInt(query.page) || 1; // Номер страницы, по умолчанию 1
      const pageSize = parseInt(query.pageSize) || 10; // Размер страницы, по умолчанию 10
      const skip = (page - 1) * pageSize; // Сколько записей пропустить

      pagination = {
        skip,
        take: pageSize,
      };

      return await AnimalModel.getAll(filters, pagination);
    } catch (e) {
      throw new Error("Ошибка при получении животных: " + e.message);
    }
  }

  static async getById(id) {
    try {
      return AnimalByIdDto(await AnimalModel.getById(id));
    } catch (e) {
      throw new Error("Ошибка при получении животных: " + e.message);
    }
  }

  static async create(animalData) {
    try {
      return await AnimalModel.create(animalData);
    } catch (e) {
      throw new Error("Ошибка при создании животного: " + e.message);
    }
  }

  static async update(id, animalData) {
    try {
      return await AnimalModel.update(id, animalData);
    } catch (e) {
      throw new Error("Ошибка при обновлении животного: " + e.message);
    }
  }

  // Удалить животное
  static async delete(ID) {
    try {
      return await AnimalModel.delete(ID);
    } catch (e) {
      throw new Error("Ошибка при удалении животного: " + e.message);
    }
  }
}
