import { Friend, WidgetWrapper } from "@/components";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "@/states/index.js";
import useFriends from "@/hooks/useFriends.js";

function FriendsList({ userId }) {
  const token = useSelector(selectToken);
  const { friends, loading } = useFriends(userId, token);
  const {
    palette: {
      neutral: { dark },
    },
  } = useTheme();

  if (loading)
    return (
      <WidgetWrapper>
        <CircularProgress />
      </WidgetWrapper>
    );

  if (!friends) return null;

  return (
    <WidgetWrapper>
      <Typography
        color={dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map(({ occupation, firstName, lastName, picturePath, id }) => (
          <Friend
            key={id}
            friendId={id}
            friendName={firstName}
            lastName={lastName}
            subtitle={occupation}
            userPicturePath={picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}

export default FriendsList;
