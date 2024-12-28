import { AxiosResponse } from "axios";
import $api from "../http/http";

export class AnimalDiseasesService {
  static async create(
    animalId: number,
    diseasesId: number
  ): Promise<AxiosResponse<any>> {
    return $api.post<any>("animal-diseases", { animalId, diseasesId });
  }

  static async getAll(): Promise<AxiosResponse<any>> {
    return $api.get<any>("animal-diseases");
  }

  static async getById(id: number): Promise<AxiosResponse<any>> {
    return $api.get<any>(`animal-diseases/${id}`);
  }

  static async update(
    id: number,
    animalId: number,
    diseasesId: number
  ): Promise<AxiosResponse<any>> {
    return $api.put<any>(`animal-diseases/${id}`, { animalId, diseasesId });
  }

  static async delete(id: number): Promise<AxiosResponse<any>> {
    return $api.delete<any>(`animal-diseases/${id}`);
  }
}

export class AnimalsService {
  static async getAll() {
    return $api.get("/animals");
  }
  static async create(animal: {
    animalTypeId: number;
    petShelterId: number;
    name: string;
    description: string;
  }) {
    return $api.post("/animals", animal);
  }
  static async update(animal: {
    ID: number;
    animalTypeId: number;
    petShelterId: number;
    name: string;
    description: string;
  }) {
    return $api.put("/animals", animal);
  }
  static async delete(id: number) {
    return $api.delete(`/animals/${id}`);
  }
}

export class AnimalTypesService {
  static async create(type: { TypeName: string; Description: string }) {
    return $api.post("/animal-type", type);
  }
  static async update(
    id: number,
    type: { TypeName: string; Description: string }
  ) {
    return $api.put(`/animal-type/${id}`, type);
  }
  static async delete(id: number) {
    return $api.delete(`/animal-type/${id}`);
  }
  static async getById(id: number) {
    return $api.get(`/animal-type/${id}`);
  }
  static async getAll() {
    return $api.get("/animal-type");
  }
}

export class AnimalTypeDiseasesService {
  static async create(link: { animalTypeId: number; diseasesId: number }) {
    return $api.post("/animal-type-diseases", link);
  }
  static async getAll() {
    return $api.get("/animal-type-diseases");
  }
  static async getById(id: number) {
    return $api.get(`/animal-type-diseases/${id}`);
  }
  static async update(
    id: number,
    link: { animalTypeId: number; diseasesId: number }
  ) {
    return $api.put(`/animal-type-diseases/${id}`, link);
  }
  static async delete(id: number) {
    return $api.delete(`/animal-type-diseases/${id}`);
  }
}

export class DiseasesService {
  static async create(disease: { name: string; description: string }) {
    return $api.post("/diseases", disease);
  }
  static async getAll() {
    return $api.get("/diseases");
  }
  static async getById(id: number) {
    return $api.get(`/diseases/${id}`);
  }
  static async update(
    id: number,
    disease: { name: string; description: string }
  ) {
    return $api.put(`/diseases/${id}`, disease);
  }
  static async delete(id: number) {
    return $api.delete(`/diseases/${id}`);
  }
}

export class PetShelterService {
  static async getAll() {
    return $api.get("/petshelters");
  }
}

export class AdoptionRequestService {
  static async create(request: {
    animalId: number;
    userId: number;
    description: string;
  }) {
    return $api.post("/adoption-requests", request);
  }

  static async getAll() {
    return $api.get("/adoption-requests");
  }

  static async getById(id: number) {
    return $api.get(`/adoption-requests/${id}`);
  }

  static async update(
    id: number,
    request: {
      animalId: number;
      userId: number;
      isProcessed: number;
      description: string;
      answer?: string;
    }
  ) {
    return $api.put(`/adoption-requests/${id}`, request);
  }

  static async delete(id: number) {
    return $api.delete(`/adoption-requests/${id}`);
  }
}
