export interface IJwtPayload {
    id: number;
    username: string;
    email: string;
    name: string;
    firstName: string;
    secondName: string;
    iat?: Date;
}