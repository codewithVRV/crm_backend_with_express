export default interface JwtDecodeUser {
    id: string;
    email: string;
    role: string[];
    iat: number;
    exp: number;
}