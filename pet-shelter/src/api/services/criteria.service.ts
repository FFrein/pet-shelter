import { AxiosResponse } from "axios";
import $api from "../http/http";

export class CriteriaService {
  static async create(criteria: {
    name: string;
    description: string;
  }): Promise<AxiosResponse<any>> {
    return $api.post<any>("/criteria", criteria);
  }

  static async getAll(): Promise<AxiosResponse<any>> {
    return $api.get<any>("/criteria");
  }

  static async getById(id: number): Promise<AxiosResponse<any>> {
    return $api.get<any>(`/criteria/${id}`);
  }

  static async update(
    id: number,
    criteria: { name: string; description: string }
  ): Promise<AxiosResponse<any>> {
    return $api.put<any>(`/criteria/${id}`, criteria);
  }

  static async delete(id: number): Promise<AxiosResponse<any>> {
    return $api.delete<any>(`/criteria/${id}`);
  }
}

export class AnimalCriteriaService {
  static async create(
    animalId: number,
    criteriaId: number
  ): Promise<AxiosResponse<any>> {
    return $api.post<any>("/animal-criteria", { animalId, criteriaId });
  }

  static async getAll(): Promise<AxiosResponse<any>> {
    return $api.get<any>("/animal-criteria");
  }

  static async getById(id: number): Promise<AxiosResponse<any>> {
    return $api.get<any>(`/animal-criteria/${id}`);
  }

  static async getByAnimalId(id: number): Promise<AxiosResponse<any>> {
    return $api.get<any>(`/animal-criteria/animal/${id}`);
  }

  static async update(
    id: number,
    animalId: number,
    criteriaId: number
  ): Promise<AxiosResponse<any>> {
    return $api.put<any>(`/animal-criteria/${id}`, { animalId, criteriaId });
  }

  static async delete(id: number): Promise<AxiosResponse<any>> {
    return $api.delete<any>(`/animal-criteria/${id}`);
  }
}
