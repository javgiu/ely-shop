import { getUserByName } from "../db.js";

export async function getUserByUsername(req, res) {
    try {
        const webResponse = new Response(req);
        const userCredentials = await webResponse.json();
        const name = userCredentials.username;

        const user = await getUserByName(name);
        if (user) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    username: user.name,
                    isAdmin: user.isAdmin,
                }),
            );
        } else {
            res.writeHead(401, {
                "Content-Type": "application/json",
            });
            res.end(
                JSON.stringify({
                    error: "Invalid username or password",
                }),
            );
        }
    } catch (error) {
        console.log("Error processing req in userController", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end();
    }
}
