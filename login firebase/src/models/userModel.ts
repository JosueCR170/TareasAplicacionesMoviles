export interface UserModel{
    user_id: string;
    userName: string;
    email: string;
    password?: string;
    rol?: "ADMIN" | "USER";
}