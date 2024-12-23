import PetShelterModel from "../models/petShelter.model.js";

export default class PetShelterService {
  // Получить все приюты
  static async getAll() {
    return await PetShelterModel.getAll();
  }

  // Создать новый приют
  static async create(petShelter) {
    return await PetShelterModel.create(petShelter);
  }

  // Обновить информацию о приюте
  static async update(id, data) {
    return await PetShelterModel.update(id, data);
  }
}
