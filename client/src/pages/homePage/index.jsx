import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

import Menu from 'pages/homePage/Menu';
import Sponsor from 'pages/homePage/Sponsor';

import PostsWidget from 'pages/widgets/PostsWidget';
import MyPostWidget from 'pages/widgets/MyPostWidget';


const HomePage = () => {
    // const mediumScreensAtHome = useMediaQuery("(min-width: 1125px)");
    const largeScreens = useMediaQuery("(min-width: 1360px)");

    const id = useSelector((state) => state.user._id);
    
    return(
        <>
            <Helmet>
                <title>Facebook</title>
            </Helmet>
            <Box
                width="100%"
                m="5.5rem 0"
                display="flex"
                justifyContent={largeScreens ? "space-between" : "center"}
                gap="0.5rem"
            >
                
                {largeScreens && (
                    <Box flexBasis={largeScreens ? "26%" : undefined}>
                        <Menu />
                    </Box>
                )}

                <Box 
                    flexBasis={largeScreens ? "48%" : undefined}
                    display={largeScreens ? "flex" : undefined}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center" 
                >
                    <MyPostWidget />
                    <PostsWidget userId={id} />
                </Box>

                {largeScreens && (
                    <Box flexBasis={largeScreens ? "26%" : undefined}>
                        <Sponsor />
                    </Box>
                )}

            </Box>

        </>
    );
}

export default HomePage;