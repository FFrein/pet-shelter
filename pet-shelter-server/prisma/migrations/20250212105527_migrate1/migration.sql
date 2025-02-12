/*
  Warnings:

  - A unique constraint covering the columns `[TypeName]` on the table `AnimalType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ImageUrl` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Animal] ADD [ImageUrl] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[AnimalType] ADD CONSTRAINT [AnimalType_TypeName_key] UNIQUE NONCLUSTERED ([TypeName]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
