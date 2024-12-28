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
  };
};
