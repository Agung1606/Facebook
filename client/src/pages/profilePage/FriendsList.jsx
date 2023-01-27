import React, { useEffect } from 'react';
import {
    Box, 
    Typography, 
    useTheme 
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';
import Friend from 'components/Friend';

const FriendsList = ({ userId }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const theme = useTheme();

    const getFriends = async () => {
        const response = await fetch(
            `http://localhost:7001/api/v1/users/${userId}/friends`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box
            width="33rem"
            p="0.5rem 1rem"
            mb="1rem"
            backgroundColor={theme.palette.background.alt}
            borderRadius="10px"
            boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
        >
            <Typography
                color={theme.palette.neutral.dark}
                variant="h3"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friend 
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        profilePicturePath={friend.profilePicturePath}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default FriendsList;