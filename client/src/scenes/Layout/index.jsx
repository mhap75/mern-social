import { Navbar } from "@/components";
import { Box } from "@mui/material";

function Layout({ children }) {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
}

export default Layout;
