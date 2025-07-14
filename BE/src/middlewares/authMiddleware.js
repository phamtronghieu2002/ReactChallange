dotenv.config();
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import env from "~/config/env";
import { COLLECTIONS } from "~/constants/collections";
import { db } from "~/firebase";
export const veryfyUser = async (req, res, next) => {

  const accessToken = req.headers.authorization?.split(" ")[1];
  if (accessToken) {
    try {
      const decoded_token = jwt.verify(
        accessToken,
        env.JWT_ACCESS_TOKEN_SECRET
      );


      const snapShot = await db.collection(COLLECTIONS.employees).doc(decoded_token.user.employeeId).get();
      if (!snapShot.exists) {
        return res.status(401).json({ message: "Employee not found" });
      }

      const {password,...rest} = snapShot.data();
      
      req.user = {
        ...rest,
        accessToken
      };


      next();
    } catch (error) {
      console.log("error >>",error);
      
      return res.status(401).json({ message: "token invalid" });
    }
  } else {
    return res.status(401).json({ message: "token invalid" });
  }
};