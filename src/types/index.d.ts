
export interface TokenData {
    userId: number;
    role: string;
    nickname: string;
    favSubgenre: string
};


declare global {
    // Express
    namespace Express {
        export interface Request {
            tokenData: TokenData;
        }
    }
}