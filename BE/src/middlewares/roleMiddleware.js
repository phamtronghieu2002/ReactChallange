import { ROLES } from "~/constants/roles";

export const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role === role) {
            next();
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
    }
}

