import { useSelector } from "react-redux";
import { Box, Divider, useMediaQuery } from "@mui/material";
import { FriendsList, PostsWidget, Share, Sponsor, User } from "@/scenes";
import { selectUser } from "@/states";

const Home = () => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath, friends } = useSelector(selectUser);

  return (
    <Box
      as="section"
      width="100%"
      padding="2rem 6%"
      display={isNotMobile ? "flex" : "block"}
      gap=".5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isNotMobile ? "26%" : undefined}>
        <User userId={_id} picturePath={picturePath} />
      </Box>

      <Box
        mt={isNotMobile ? undefined : "2rem"}
        flexBasis={isNotMobile ? "42%" : undefined}
      >
        <Share picturePath={picturePath} />
        <Divider sx={{ marginBlock: "1.25rem" }} />
        <PostsWidget userId={_id} />
      </Box>
      {isNotMobile && (
        <Box flexBasis="26%">
          <Sponsor />
          {!!friends.length && <FriendsList userId={_id} />}
        </Box>
      )}
    </Box>
  );
};

export default Home;
