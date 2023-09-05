import { useEffect, useReducer } from "react";
import getUser from "@/lib/getUser.js";

const initial = {
  loading: false,
  error: false,
  user: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "PENDING":
      return { loading: true, error: false, user: null };
    case "SUCCESS":
      return { loading: false, error: false, user: payload };
    case "FAILED":
      return { loading: false, error: payload, user: null };
  }
};

const useUser = (id, token) => {
  const [state, dispatch] = useReducer(reducer, initial);
  const { loading, error, user } = state;

  useEffect(() => {
    (async () => {
      dispatch({ type: "PENDING" });
      try {
        const data = await getUser(id, token);
        dispatch({ type: "SUCCESS", payload: data });
      } catch (e) {
        dispatch({ type: "ERROR", payload: e });
      }
    })();
    return () => {};
  }, [id, token]);

  return { loading, error, user };
};

export default useUser;
