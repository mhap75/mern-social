import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FlexBetween } from "@/components";
import { logo } from "@/assets/index.js";
import classes from "./classes.module.scss";
import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Menu,
  Message,
  Notifications,
  Search,
} from "@mui/icons-material";
import { selectUser, setLogout, setMode } from "@/states/index.js";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");

  const {
    palette: {
      neutral: { dark, light },
      background,
      primary,
      mode,
    },
  } = useTheme();
  const neutralLight = light;
  const defaultBg = background.default;
  // const primaryLight = primary.light;
  const alt = background.alt;

  const fullName = user ? `${user?.firstName} ${user?.lastName}` : "User";

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <div onClick={() => navigate("/home")} className={classes.logoWrapper}>
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
          >
            Mockchat
          </Typography>
          <img className={classes.logo} src={logo} alt="home" />
        </div>
        {isNotMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding=".1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {user && (
        <>
          {/* DESKTOP NAV */}
          {isNotMobileScreen ? (
            <FlexBetween gap="2rem">
              <IconButton onClick={() => dispatch(setMode())}>
                {mode === "dark" ? (
                  <DarkMode className={classes.navbar_icon} />
                ) : (
                  <LightMode
                    className={classes.navbar_icon}
                    sx={{ color: dark }}
                  />
                )}
              </IconButton>
              <Message className={classes.navbar_icon} />
              <Notifications className={classes.navbar_icon} />
              <Help className={classes.navbar_icon} />

              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: ".25rem",
                    p: ".25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: ".25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Logout
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          ) : (
            <IconButton
              sx={{ zIndex: 20 }}
              onClick={() => setIsMenuOpen((s) => !s)}
            >
              {isMenuOpen ? (
                <Close className={classes.navbar_icon} />
              ) : (
                <Menu className={classes.navbar_icon} />
              )}
            </IconButton>
          )}

          {/* MOBILE NAV */}
          {!isNotMobileScreen && isMenuOpen && (
            <Box
              position="fixed"
              right="0"
              bottom="0"
              height="100%"
              zIndex="10"
              maxWidth="500px"
              minWidth="300px"
              backgroundColor={defaultBg}
              paddingTop="5rem"
            >
              <FlexBetween
                flexDirection="column"
                justifyContent="center"
                gap="3rem"
              >
                <IconButton onClick={() => dispatch(setMode())}>
                  {mode === "dark" ? (
                    <DarkMode className={classes.navbar_icon} />
                  ) : (
                    <LightMode
                      className={classes.navbar_icon}
                      sx={{ color: dark }}
                    />
                  )}
                </IconButton>
                <Message className={classes.navbar_icon} />
                <Notifications className={classes.navbar_icon} />
                <Help className={classes.navbar_icon} />
                <FormControl variant="standard" value={fullName}>
                  <Select
                    value={fullName}
                    sx={{
                      backgroundColor: neutralLight,
                      width: "150px",
                      borderRadius: ".25rem",
                      p: ".25rem 1rem",
                      "& .MuiSvgIcon-root": {
                        pr: ".25rem",
                        width: "3rem",
                      },
                      "& .MuiSelect-select:focus": {
                        backgroundColor: neutralLight,
                      },
                    }}
                    input={<InputBase />}
                  >
                    <MenuItem value={fullName}>
                      <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>
                      Logout
                    </MenuItem>
                  </Select>
                </FormControl>
              </FlexBetween>
            </Box>
          )}
        </>
      )}
    </FlexBetween>
  );
}

export default Navbar;
