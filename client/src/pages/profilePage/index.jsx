import React, { useState, useEffect } from "react";
import { 
    Box, 
    Typography, 
    useTheme,
    Button,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import UserBackgroundImage from "components/UserBackgroundImage";
import MyPostWidget from "pages/widgets/MyPostWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import FriendsList from "./FriendsList";

const ProfilePage = () => {
    const [ user, setUser ] = useState(null);
    const { userId } = useParams();
    const userFromState = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const theme = useTheme();

    const getUser = async () => {
        const response = await fetch(
            `http://localhost:7001/api/v1/users/${userId}`, {
            method: "GET",
            headers: {  Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if(!user) return null;

    return(
        <Box m="1rem 0">
            {/* HEADER */}
            <Box
                backgroundColor={theme.palette.background.alt}
                width="100%"
                boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
            >
                <Box m="0 4rem">
                    <UserBackgroundImage 
                        sizeWidth="100%"
                        sizeHeight="25rem"
                        image={user.backgroundPicturePath ? user.backgroundPicturePath : "defaultBg.png"} 
                    />
                    <Box
                        marginTop="-20px"
                        paddingBottom="0.8rem"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="0.5rem"
                    >
                        <UserImage 
                            size="140px"
                            image={user.profilePicturePath ? user.profilePicturePath : "defaultAvatar.png"} 
                            padding="5px"
                        />
                        <Typography sx={{ fontSize: "34px" }}>
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {/* MAIN */}
            <Box 
                m="2rem 1.5rem"
                display="flex"
                justifyContent="space-between"
            >
                <Box>
                    {/* I want FriendsList only show up if it's our own profile */}
                    {userFromState._id === userId && <FriendsList userId={userId} />}
                </Box>
                <Box>
                    {/* I want MyPostsWidget only show up if it's our own profile */}
                    {userFromState._id === userId && <MyPostWidget />}
                    <PostsWidget userId={userId} isProfile={true} />
                </Box>

                <Box>

                </Box>
            </Box>
        </Box>
    );
}

export default ProfilePage;