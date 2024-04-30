
export interface TokenData {
    userId: number;
    roleName: string;
    firstName: string;
};


declare global {
    // Express
    namespace Express {
        export interface Request {
            tokenData: TokenData;
        }
    }
}