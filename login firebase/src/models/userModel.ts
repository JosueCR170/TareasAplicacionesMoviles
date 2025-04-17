export interface UserModel{
    uid: string;
    userName: string;
    email: string;
    password?: string;
    role?: "ADMIN" | "USER";
}