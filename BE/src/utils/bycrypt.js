
import bcrypt from "bcrypt";
const saltRounds = 10;




export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}