import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Form } from "@/components";

const Login = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box as="section">
      <Box
        width={isNotMobile ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Mockchat! Chat with whom you love.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
