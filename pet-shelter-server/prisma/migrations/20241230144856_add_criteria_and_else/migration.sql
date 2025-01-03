/*
  Warnings:

  - Added the required column `Age` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Gender` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `City` to the `PetShelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Country` to the `PetShelter` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Animal] ADD [Age] INT NOT NULL,
[Gender] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[PetShelter] ADD [City] NVARCHAR(1000) NOT NULL,
[Country] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Criteria] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(1000) NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Criteria_pkey] PRIMARY KEY CLUSTERED ([ID]),
    CONSTRAINT [Criteria_Name_key] UNIQUE NONCLUSTERED ([Name])
);

-- CreateTable
CREATE TABLE [dbo].[AnimalCriteria] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [AnimalId] INT NOT NULL,
    [CriteriaId] INT NOT NULL,
    CONSTRAINT [AnimalCriteria_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[AnimalCriteria] ADD CONSTRAINT [AnimalCriteria_AnimalId_fkey] FOREIGN KEY ([AnimalId]) REFERENCES [dbo].[Animal]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AnimalCriteria] ADD CONSTRAINT [AnimalCriteria_CriteriaId_fkey] FOREIGN KEY ([CriteriaId]) REFERENCES [dbo].[Criteria]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
