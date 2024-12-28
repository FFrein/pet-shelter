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
