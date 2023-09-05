import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setPost } from "@/states";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { serverUrl } from "@/const";
import { FlexBetween, Friend, WidgetWrapper } from "@/components";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import classes from "./classes.module.scss";

function PostCard({
  _id,
  firstName,
  lastName,
  location,
  description,
  likes,
  comments,
  userId,
  userPicturePath,
  picturePath,
}) {
  const [isOpenComments, setIsOpenComments] = useState(false);
  const dispatch = useDispatch();
  const {
    token,
    user: { _id: loggedUser },
  } = useSelector(selectAuth);
  const isLiked = Boolean(likes[loggedUser]);
  const likesCount = Object.keys(likes).length;
  const {
    palette: {
      neutral: { main },
      primary: { main: primary },
    },
  } = useTheme();

  const handleUpdatePostLikes = async () => {
    try {
      const res = await fetch(`${serverUrl}/posts/${_id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedUser }),
      });
      const updatedPost = await res.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <WidgetWrapper my="2rem">
      <Friend
        friendId={userId}
        firstName={firstName}
        lastName={lastName}
        userPicturePath={userPicturePath}
        subtitle={location}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          className={classes.postCardImage}
          src={`${serverUrl}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => handleUpdatePostLikes()}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsOpenComments(!isOpenComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isOpenComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}

export default memo(PostCard);
