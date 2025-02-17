export default interface IUserContext {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: string;
  id: string;

  isBanned: string;

  jwt: object | null;
}

export interface Disease {
  ID: number;
  Name: string;
  Description: string;
}

export interface AnimalType {
  ID: number;
  TypeName: string;
  Description: string;
}

export interface PetShelter {
  ID: number;
  name: string;
  country: string;
  city: string;
  address: string;
}

export interface Animal {
  ID: number;
  Name: string;
  Description: string;
  Age: number;
  Gender: string;
  AnimalType?: AnimalType;
  PetShelter?: PetShelter;
  Diseases?: { Diseases: Disease }[];
  ImageUrl?: string;
}

export interface AdoptionRequest {
  ID: number;
  AnimalId: number;
  UserId: number;
  isProcessed: number;
  description: string;
  answer: string | null;
  Animal: Animal;
}
