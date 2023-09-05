import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FlexBetween, UserImage, WidgetWrapper } from "@/components";
import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlined,
} from "@mui/icons-material";
import { linkedIn, twitter } from "@/assets/index.js";
import {selectAuth, selectToken} from "@/states/index.js";
import useUser from "@/hooks/useUser.js";

function UserWidget({ userId, picturePath }) {
  const {
    palette: {
      neutral: { dark, medium, main },
    },
  } = useTheme();
 const token = useSelector(selectToken);
  const { user } = useUser(userId, token);
  const navigate = useNavigate();

  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  }

  if (!user) return null;

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap=".5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween
          gap="1rem"
          sx={{
            "&:hover": {
              opacity: 0.8,
              cursor: "pointer",
            },
          }}
        >
          <UserImage img={picturePath} />
          <Box>
            <Typography variant="h4" color={dark} fontWeight="500">
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb=".5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb=".5rem">
          <Typography color={medium}>Profile views</Typography>
          <Typography color={main} fontWeight="500">
            {formatNumber(viewedProfile)}
          </Typography>
        </FlexBetween>
        <FlexBetween mb=".5rem">
          <Typography color={medium}>Post impressions</Typography>
          <Typography color={main} fontWeight="500">
            {formatNumber(impressions)}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FORTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" fontWeight="500" mb="1rem" color={main}>
          Social profiles
        </Typography>
        <FlexBetween gap="1rem" mb=".5rem">
          <FlexBetween gap="1rem">
            <img src={twitter} alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined color={main} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb=".5rem">
          <FlexBetween gap="1rem">
            <img src={linkedIn} alt="linkedIn" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined color={main} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}

export default UserWidget;
