/*
  Warnings:

  - A unique constraint covering the columns `[AnimalId,CriteriaId]` on the table `AnimalCriteria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[AnimalId,DiseasesId]` on the table `AnimalDiseases` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[AnimalTypeId,DiseasesId]` on the table `AnimalTypeDiseases` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[AnimalCriteria] ADD CONSTRAINT [AnimalCriteria_AnimalId_CriteriaId_key] UNIQUE NONCLUSTERED ([AnimalId], [CriteriaId]);

-- CreateIndex
ALTER TABLE [dbo].[AnimalDiseases] ADD CONSTRAINT [AnimalDiseases_AnimalId_DiseasesId_key] UNIQUE NONCLUSTERED ([AnimalId], [DiseasesId]);

-- CreateIndex
ALTER TABLE [dbo].[AnimalTypeDiseases] ADD CONSTRAINT [AnimalTypeDiseases_AnimalTypeId_DiseasesId_key] UNIQUE NONCLUSTERED ([AnimalTypeId], [DiseasesId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
