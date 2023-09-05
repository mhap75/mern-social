import {serverUrl} from "@/const/index.js";

export const login = async (values, { resetForm }) => {
  return await fetch(`${serverUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

export const register = async (values, { resetForm }) => {
  const formData = new FormData();
  for (const value in values) {
    formData.append(value, values[value]);
  }
  formData.append("picturePath", values.picture.name);

  return await fetch(`${serverUrl}/auth/register`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      resetForm();
      return res.json();
    })
    .catch((err) => {
      return err.json();
    });
};
