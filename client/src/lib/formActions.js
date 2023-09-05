import {serverUrl} from "@/const/index.js";

export const login = async (values, {resetForm}) => {
    return await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values),
    })
        .then((res) => {
            resetForm();
            return res.json();
        })
        .catch((err) => {
            return err.json();
        });
};


