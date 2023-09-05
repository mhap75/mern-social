import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth, setFriends } from "@/states/index.js";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { serverUrl } from "@/const/index.js";
import { FlexBetween, UserImage } from "@/components/index.js";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { memo } from "react";

function Friend({ friendId, firstName, lastName, subtitle, userPicturePath }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    token,
    user: { _id, friends },
  } = useSelector(selectAuth);
  const {
    palette: {
      primary: { light, dark },
      neutral: { main, medium },
    },
  } = useTheme();
  const isFriend = friends.find((friend) => friend.id === friendId);

  const handleUpdateFriend = async () => {
    try {
      const res = await fetch(`${serverUrl}/users/${_id}/${friendId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(setFriends({ friends: data }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage img={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                opacity: 0.5,
                cursor: "pointer",
              },
            }}
          >
            {firstName} {lastName}
          </Typography>
          <Typography color={medium} fontSize=".75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {friendId !== _id && (
        <IconButton
          sx={{ backgroundColor: light, p: ".6rem" }}
          onClick={() => handleUpdateFriend()}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: dark }} />
          ) : (
            <PersonAddOutlined sx={{ color: dark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
}

export default memo(Friend);
