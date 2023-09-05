import { useParams } from "react-router-dom";
import { Box, LinearProgress, useMediaQuery } from "@mui/material";
import { selectToken } from "@/states/index.js";
import { useSelector } from "react-redux";
import useUser from "@/hooks/useUser.js";
import { FriendsList, Share, User } from "@/scenes";
import Posts from "@/scenes/widgets/Posts/index.jsx";

const Profile = () => {
  const { userId } = useParams();
  const token = useSelector(selectToken);
  const { user, loading } = useUser(userId, token);
  const isNotMobile = useMediaQuery("(min-width:1000px)");

  if (loading)
    return (
      <section>
        <LinearProgress sx={{ margin: "1rem" }} />
      </section>
    );

  if (!user) return null;

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNotMobile ? "flex" : "block"}
      gap="2rem"
      justifyContent="center"
    >
      <Box flexBasis={isNotMobile ? "26%" : undefined}>
        <User userId={user._id} picturePath={user.picturePath} />
        <Box m="2rem 0" />
        {!!user.friends.length && <FriendsList userId={user._id} />}
      </Box>
      <Box
        flexBasis={isNotMobile ? "42%" : undefined}
        mt={isNotMobile ? undefined : "2rem"}
      >
        <Share picturePath={user.picturePath} />
        <Box m="2rem 0" />
        <Posts userId={user._id} isProfile />
      </Box>
    </Box>
  );
};

export default Profile;
