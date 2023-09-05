import { serverUrl } from "@/const/index.js";

const getUser = async (id, token) => {
  return await fetch(`${serverUrl}/users/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .catch((err) => err.message);
};

export default getUser;
