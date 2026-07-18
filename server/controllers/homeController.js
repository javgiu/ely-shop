export default function baseController(res) {
    console.log("Base controller Running");
    res.writeHead(302, { Location: "/index.html" });
    res.end();
}
