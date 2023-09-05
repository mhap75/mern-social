import { useEffect, useReducer } from "react";
import getFriends from "@/lib/getFriends.js";
import { useSelector } from "react-redux";
import { selectAuth } from "@/states/index.js";

const initial = {
  loading: false,
  error: false,
  friends: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "PENDING":
      return { loading: true, error: false, friends: null };
    case "SUCCESS":
      return { loading: false, error: false, friends: payload };
    case "FAILED":
      return { loading: false, error: payload, friends: null };
  }
};

const useUser = (id) => {
  const {
    token,
    user: { friends: friendsCount },
  } = useSelector(selectAuth);
  const [state, dispatch] = useReducer(reducer, initial);
  const { loading, error, friends } = state;

  useEffect(() => {
    (async () => {
      dispatch({ type: "PENDING" });
      try {
        const data = await getFriends(id, token);
        dispatch({ type: "SUCCESS", payload: data });
      } catch (e) {
        dispatch({ type: "ERROR", payload: e });
      }
    })();
    return () => {};
  }, [id, token, friendsCount]);

  return { loading, error, friends };
};

export default useUser;
