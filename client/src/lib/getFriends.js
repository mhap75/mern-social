import { serverUrl } from "@/const/index.js";

const getUser = async (userId, token) => {
    return await fetch(`${serverUrl}/users/${userId}/friends`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((res) => res.json())
        .catch((err) => err.message);
};

export default getUser;
