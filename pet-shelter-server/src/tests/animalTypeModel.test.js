import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DiseaseModel } from "../models/disease.model.js";
import { prisma } from "../database/db.js";

// Мокаем prisma
vi.mock("../database/db.js", () => ({
  prisma: {
    diseases: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("DiseaseModel", () => {
  // Сброс моков перед каждым тестом
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("Должен создавать новое заболевание", async () => {
      const mockDisease = { name: "Flu", description: "Infectious disease" };
      const mockResponse = {
        ID: 1,
        Name: "Flu",
        Description: "Infectious disease",
      };

      prisma.diseases.create.mockResolvedValue(mockResponse);

      const result = await DiseaseModel.create(mockDisease);

      expect(prisma.diseases.create).toHaveBeenCalledWith({
        data: {
          Name: mockDisease.name,
          Description: mockDisease.description,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAll", () => {
    it("Должен возвращать список всех заболеваний", async () => {
      const mockDiseases = [
        { ID: 1, Name: "Flu", Description: "Infectious disease" },
        { ID: 2, Name: "Cold", Description: "Viral infection" },
      ];

      prisma.diseases.findMany.mockResolvedValue(mockDiseases);

      const result = await DiseaseModel.getAll();

      expect(prisma.diseases.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockDiseases);
    });
  });

  describe("getById", () => {
    it("Должен возвращать заболевание по ID", async () => {
      const mockDisease = {
        ID: 1,
        Name: "Flu",
        Description: "Infectious disease",
      };

      prisma.diseases.findUnique.mockResolvedValue(mockDisease);

      const result = await DiseaseModel.getById(1);

      expect(prisma.diseases.findUnique).toHaveBeenCalledWith({
        where: { ID: 1 },
      });
      expect(result).toEqual(mockDisease);
    });

    it("Должен возвращать null, если заболевание не найдено", async () => {
      prisma.diseases.findUnique.mockResolvedValue(null);

      const result = await DiseaseModel.getById(999);

      expect(prisma.diseases.findUnique).toHaveBeenCalledWith({
        where: { ID: 999 },
      });
      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("Должен обновлять существующее заболевание", async () => {
      const mockDiseaseUpdate = {
        name: "Updated Flu",
        description: "Updated description",
      };
      const mockUpdatedDisease = {
        ID: 1,
        Name: "Updated Flu",
        Description: "Updated description",
      };

      prisma.diseases.update.mockResolvedValue(mockUpdatedDisease);

      const result = await DiseaseModel.update(1, mockDiseaseUpdate);

      expect(prisma.diseases.update).toHaveBeenCalledWith({
        where: { ID: 1 },
        data: mockDiseaseUpdate,
      });
      expect(result).toEqual(mockUpdatedDisease);
    });

    it("Должен возвращать ошибку, если ID не найден", async () => {
      prisma.diseases.update.mockRejectedValue(new Error("Record not found"));

      await expect(
        DiseaseModel.update(999, { name: "Unknown", description: "Unknown" })
      ).rejects.toThrow("Record not found");

      expect(prisma.diseases.update).toHaveBeenCalledWith({
        where: { ID: 999 },
        data: { name: "Unknown", description: "Unknown" },
      });
    });
  });

  describe("delete", () => {
    it("Должен удалять заболевание по ID", async () => {
      const mockDeletedDisease = {
        ID: 1,
        Name: "Flu",
        Description: "Infectious disease",
      };

      prisma.diseases.delete.mockResolvedValue(mockDeletedDisease);

      const result = await DiseaseModel.delete(1);

      expect(prisma.diseases.delete).toHaveBeenCalledWith({ where: { ID: 1 } });
      expect(result).toEqual(mockDeletedDisease);
    });

    it("Должен возвращать ошибку, если ID для удаления не найден", async () => {
      prisma.diseases.delete.mockRejectedValue(new Error("Record not found"));

      await expect(DiseaseModel.delete(999)).rejects.toThrow(
        "Record not found"
      );

      expect(prisma.diseases.delete).toHaveBeenCalledWith({
        where: { ID: 999 },
      });
    });
  });
});
