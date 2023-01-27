import React, { useState } from 'react'
import { 
  Box,
  useMediaQuery,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import SidebarMenu from 'pages/navbar/SidebarMenu';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mediumScreens = useMediaQuery("(min-width: 900px)");

  return (
    <Box width="100%" height="100%">
      <SidebarMenu 
        drawerWidth={mediumScreens ? "500px" : "100%"}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box>
        <Navbar 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout