import { Box } from "@mui/material";
import classes from "./classes.module.scss";
import { serverUrl } from "@/const/index.js";

function UserImage({ img, size = "60px" }) {
  return (
    <Box width={size} height={size}>
      <img
        src={`${serverUrl}/assets/${img}`}
        alt="user"
        width={size}
        height={size}
        className={classes.userImage}
      />
    </Box>
  );
}

export default UserImage;
