import { requestUserCredentials } from "../utils/fetchAPI.js";

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const userCredentials = Object.fromEntries(formData);

    try {
        const user = await requestUserCredentials(userCredentials);
        if (user) {
            if (user.isAdmin) {
                alert("Render admin page please");
            } else {
                alert("Render client page");
            }
        } else {
            alert("Not valid credentials");
        }
    } catch (error) {
        console.log("Error in event listener of login form", error);
    }
});
