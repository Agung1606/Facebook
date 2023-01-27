import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import Layout from "pages/layout";
import LoginPage from "pages/loginPage";
import HomePage from "pages/homePage";
import ListAddFriends from "pages/friends";
import ProfilePage from "pages/profilePage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.token);

  return (
    <div className="app">
      <BrowserRouter>
          <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <Navigate to="/home" /> : <LoginPage /> } />
            <Route element={isAuth ? <Layout /> : <Navigate to="/" />} >
              <Route 
                path="/home" 
                element={<HomePage />} 
              />
              <Route 
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" /> }
              />
              <Route 
                path="/friend"
                element={isAuth ? <ListAddFriends /> : <Navigate to="/" /> }
              />
            </Route>
          </Routes>
          </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;