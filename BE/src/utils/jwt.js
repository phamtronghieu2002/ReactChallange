import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import env from '~/config/env';
dotenv.config();

export const create_access_token = (payload,expiresIn) => {

  return jwt.sign(payload, env.JWT_ACCESS_TOKEN_SECRET, { expiresIn });
}

