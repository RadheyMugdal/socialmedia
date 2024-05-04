
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = async (token: string): Promise<JwtPayload> => {

    const decoded = await jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded);
    
    return decoded as JwtPayload;
  
};
