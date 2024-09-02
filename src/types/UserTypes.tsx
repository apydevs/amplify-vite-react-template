// Define a type for the main API response structure
export interface UserType {
    userId:string;
    username: string;
    token: string | null;
}


export interface UserTypeQL {
    email:string | null,
    name: string | null,
    token: string | null,
    account: string | null,
}


export interface UserLoginTypeQL {
    email:string | null;
    password: string | null;
    deviceName : string | null;
}