import { getUserByUsername } from "../controllers/usersController.js";

export function usersRouter(req, res, { url, cleanPaths }) {
    if (req.method === "POST") {
        getUserByUsername(req, res);
    }
}
