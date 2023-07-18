import axios from "axios";

export const logout = async (router: any, loginPage: string) => {
    try {
        console.log('helllo')
        const data = await axios.post("/api/auth/logout");
        router.push(loginPage);
    } catch (err) {
        console.log("err", err);
        router.push(loginPage);
    }
};
