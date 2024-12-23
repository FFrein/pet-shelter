-- 1. Создание базы данных
CREATE DATABASE PetShalter;
GO

-- 2. Переключение на созданную базу данных
USE PetShalter;
GO

CREATE TABLE UserTypes (
    ID INT IDENTITY(1,1) PRIMARY KEY,  -- Первичный ключ
    TypeName NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE Users (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    UserTypeId INT NOT NULL,
    UserName NVARCHAR(100) NOT NULL UNIQUE,
    Password NVARCHAR(100) NOT NULL ,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber NVARCHAR(100) UNIQUE,
    isBanned INT NOT NULL,
    FOREIGN KEY (UserTypeId) REFERENCES UserTypes(ID)
);
GO

CREATE TABLE PetShelter (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL UNIQUE,
    Address NVARCHAR(100) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Password NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NOT NULL,
    isBanned INT NOT NULL,
);
GO

CREATE TABLE AnimalType (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    TypeName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NOT NULL
);
GO

CREATE TABLE Diseases (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(500) NOT NULL
);
GO

CREATE TABLE AnimalTypeDiseases (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    AnimalTypeId INT NOT NULL,
    DiseasesId INT NOT NULL,
    FOREIGN KEY (AnimalTypeId) REFERENCES AnimalType(ID),
    FOREIGN KEY (DiseasesId) REFERENCES Diseases(ID)

);
GO

CREATE TABLE Animal (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    PetShelterId INT,
    AnimalTypeId INT NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NOT NULL,
    FOREIGN KEY (PetShelterId) REFERENCES PetShelter(ID) ON DELETE CASCADE,
    FOREIGN KEY (AnimalTypeId) REFERENCES AnimalType(ID)
);
GO

CREATE TABLE AnimalDiseases (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    AnimalId INT NOT NULL,
    DiseasesId INT NOT NULL,
    FOREIGN KEY (AnimalId) REFERENCES Animal(ID),
    FOREIGN KEY (DiseasesId) REFERENCES Diseases(ID)

);
GO

CREATE TABLE AdoptionRequest (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    AnimalId INT NOT NULL,
    UserId INT NOT NULL,
    isProcessed INT,
    FOREIGN KEY (AnimalId) REFERENCES Animal(ID),
    FOREIGN KEY (UserId) REFERENCES Users(ID)
);
GO

INSERT INTO UserTypes (TypeName, Description) VALUES ('Guest', 'Гость');
INSERT INTO UserTypes (TypeName, Description) VALUES ('User', 'Пользователь');
INSERT INTO UserTypes (TypeName, Description) VALUES ('Manager', 'Управляющий приютом');
INSERT INTO UserTypes (TypeName, Description) VALUES ('Admin', 'Администратор');
GO

INSERT INTO Users (UserTypeId, UserName, Password, Email, PhoneNumber, isBanned) VALUES (2, 'User1', 'User1', 'user1@mail.ru', '123123123', 0);
GO

select * from UserTypes;
select * from Users;