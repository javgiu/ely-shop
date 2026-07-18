export default async function errorHandler(res, url) {
    res.writeHead(404, "text/html");
    res.end("<h1>404 Not Found</h1>");
    console.log("Couldn't access URL: ", url);
    return;
}
