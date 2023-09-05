import { useDispatch, useSelector } from "react-redux";
import { selectPosts, selectToken, setPosts } from "@/states/index.js";
import { useEffect } from "react";
import { serverUrl } from "@/const/index.js";
import { PostCard } from "@/components/index.js";

function PostsWidget({ userId, isProfile = false }) {
  const posts = useSelector(selectPosts);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const url = isProfile
          ? `${serverUrl}/posts/${userId}/posts`
          : `${serverUrl}/posts`;
        const res = await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        dispatch(setPosts({ posts: data }));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [userId, token, isProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
        <PostCard {...post} key={post._id} />
      ))}
    </>
  );
}

export default PostsWidget;
