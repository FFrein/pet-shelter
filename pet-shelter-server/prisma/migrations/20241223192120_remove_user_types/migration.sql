/*
  Warnings:

  - You are about to drop the column `UserTypeId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `UserTypes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [Users_UserTypeId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Users] DROP COLUMN [UserTypeId];
ALTER TABLE [dbo].[Users] ADD [Role] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[UserTypes];

-- CreateTable
CREATE TABLE [dbo].[PetShelter] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(1000) NOT NULL,
    [Address] NVARCHAR(1000) NOT NULL,
    [Email] NVARCHAR(1000) NOT NULL,
    [Password] NVARCHAR(1000) NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    [isBanned] INT NOT NULL,
    CONSTRAINT [PetShelter_pkey] PRIMARY KEY CLUSTERED ([ID]),
    CONSTRAINT [PetShelter_Name_key] UNIQUE NONCLUSTERED ([Name]),
    CONSTRAINT [PetShelter_Address_key] UNIQUE NONCLUSTERED ([Address]),
    CONSTRAINT [PetShelter_Email_key] UNIQUE NONCLUSTERED ([Email])
);

-- CreateTable
CREATE TABLE [dbo].[AnimalType] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [TypeName] NVARCHAR(1000) NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [AnimalType_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Diseases] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(1000) NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Diseases_pkey] PRIMARY KEY CLUSTERED ([ID]),
    CONSTRAINT [Diseases_Name_key] UNIQUE NONCLUSTERED ([Name])
);

-- CreateTable
CREATE TABLE [dbo].[AnimalTypeDiseases] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [AnimalTypeId] INT NOT NULL,
    [DiseasesId] INT NOT NULL,
    CONSTRAINT [AnimalTypeDiseases_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Animal] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [PetShelterId] INT,
    [AnimalTypeId] INT NOT NULL,
    [Name] NVARCHAR(1000) NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Animal_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[AnimalDiseases] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [AnimalId] INT NOT NULL,
    [DiseasesId] INT NOT NULL,
    CONSTRAINT [AnimalDiseases_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[AdoptionRequest] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [AnimalId] INT NOT NULL,
    [UserId] INT NOT NULL,
    [isProcessed] INT NOT NULL,
    CONSTRAINT [AdoptionRequest_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[AnimalTypeDiseases] ADD CONSTRAINT [AnimalTypeDiseases_AnimalTypeId_fkey] FOREIGN KEY ([AnimalTypeId]) REFERENCES [dbo].[AnimalType]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AnimalTypeDiseases] ADD CONSTRAINT [AnimalTypeDiseases_DiseasesId_fkey] FOREIGN KEY ([DiseasesId]) REFERENCES [dbo].[Diseases]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Animal] ADD CONSTRAINT [Animal_PetShelterId_fkey] FOREIGN KEY ([PetShelterId]) REFERENCES [dbo].[PetShelter]([ID]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Animal] ADD CONSTRAINT [Animal_AnimalTypeId_fkey] FOREIGN KEY ([AnimalTypeId]) REFERENCES [dbo].[AnimalType]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AnimalDiseases] ADD CONSTRAINT [AnimalDiseases_AnimalId_fkey] FOREIGN KEY ([AnimalId]) REFERENCES [dbo].[Animal]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AnimalDiseases] ADD CONSTRAINT [AnimalDiseases_DiseasesId_fkey] FOREIGN KEY ([DiseasesId]) REFERENCES [dbo].[Diseases]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AdoptionRequest] ADD CONSTRAINT [AdoptionRequest_AnimalId_fkey] FOREIGN KEY ([AnimalId]) REFERENCES [dbo].[Animal]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AdoptionRequest] ADD CONSTRAINT [AdoptionRequest_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
