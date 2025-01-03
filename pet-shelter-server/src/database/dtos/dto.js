export const UserDto = (user) => {
  return {
    id: user.ID,
    username: user.UserName,
    email: user.Email,
    phonenumber: user.PhoneNumber,
    isBanned: user.isBanned,
    role: user.Role,
  };
};

export const PetShelterDto = (user) => {
  return {
    id: user.ID,
    name: user.Name,
    email: user.Email,
    address: user.Address,
    isBanned: user.isBanned,
    role: "shelterManager",
    city: user.City,
    country: user.Country,
  };
};

export const AnimalByIdDto = (animal) => {
  return {
    id: animal.ID,
    Name: animal.Name,
    Description: animal.Description,
    PetShelter: PetShelterDto(animal.PetShelter),
    AnimalType: animal.AnimalType,
    Diseases: animal.Diseases,
    Age: animal.Age,
    Gender: animal.Gender,
  };
};
