BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserTypes] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [TypeName] NVARCHAR(1000) NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserTypes_pkey] PRIMARY KEY CLUSTERED ([ID]),
    CONSTRAINT [UserTypes_TypeName_key] UNIQUE NONCLUSTERED ([TypeName])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [UserTypeId] INT NOT NULL,
    [UserName] NVARCHAR(1000) NOT NULL,
    [Password] NVARCHAR(1000) NOT NULL,
    [Email] NVARCHAR(1000) NOT NULL,
    [PhoneNumber] NVARCHAR(1000),
    [isBanned] INT NOT NULL,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([ID]),
    CONSTRAINT [Users_UserName_key] UNIQUE NONCLUSTERED ([UserName]),
    CONSTRAINT [Users_Email_key] UNIQUE NONCLUSTERED ([Email]),
    CONSTRAINT [Users_PhoneNumber_key] UNIQUE NONCLUSTERED ([PhoneNumber])
);

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_UserTypeId_fkey] FOREIGN KEY ([UserTypeId]) REFERENCES [dbo].[UserTypes]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
