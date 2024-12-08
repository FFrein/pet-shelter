export default interface IUserContext{
    name: string,
    email: string,
    address: string,
    phoneNumber:string,

    isBanned: string,

    jwt:object | null,
}