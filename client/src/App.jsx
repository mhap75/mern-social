import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Layout, Login, Profile } from "./scenes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme.js";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { selectMode, selectUser } from "@/states/index.js";

function App() {
  const user = useSelector(selectUser);
  const mode = useSelector(selectMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuthenticated = Boolean(user);

  return (
    <main className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route
              index
              element={
                isAuthenticated ? <Navigate to="/home" replace /> : <Login />
              }
            />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/" replace />}
            />
            <Route
              path="/profile/:userId"
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/" replace />
              }
            />
          </Routes>
        </Layout>
      </ThemeProvider>
    </main>
  );
}

export default App;
