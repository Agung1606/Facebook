import React from 'react';
import { 
    Box,
    Grid,
    Paper,
    Typography, 
    Button, 
    useMediaQuery 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from 'state';

const AddFriendWidget = ({ userId, firstName, lastName, profilePicturePath }) => {
    const mediumScreens = useMediaQuery("(min-width: 1000px)");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const isFriend = friends.find((friend) => friend._id === userId);

    const patchFriend = async () => {
        const response = await fetch(
            `http://localhost:7001/api/v1/users/${_id}/${userId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };
    
    return(
        <Grid item xs={mediumScreens ? 3 : 6}>
            <Paper elevation="1" sx={{ height: "600px" }}>
                <img 
                    width="100%"
                    height="80%"
                    alt="userImg"
                    src={`http://localhost:7001/assets/${profilePicturePath ? profilePicturePath : "defaultAvatar.png"}`}
                    style={{ objectFit: "cover", borderRadius: "10px 10px 0 0"}}
                />
                <Typography
                    sx={{
                        width: "fit-content",
                        m: "0.5rem 1.3rem" ,
                        fontSize: "22px",
                        "&:hover": {
                            cursor: "pointer",
                            color: "rgba(0, 0, 0, 0.4)"
                        }
                    }}
                    onClick={() => {
                        navigate(`/profile/${userId}`);
                        navigate(0);
                    }}
                >
                    {`${firstName} ${lastName}`}
                </Typography>
                <Box 
                    m="1.3rem 1rem"
                    textAlign="center"
                >
                    <Button
                        sx={{
                            width: "80%",
                            backgroundColor: isFriend ? "#FF0000" : "#1877F2",
                            color: "white",
                            borderRadius: "10px",
                            fontSize: "13px",
                            "&:hover": { backgroundColor: isFriend ? "#D10000" : "#1665cc" }
                        }}
                        onClick={() => patchFriend()}
                    >
                        {isFriend ? "Hapus Pertemanan" : "Tambah Teman"}
                    </Button>
                </Box>
            </Paper>
        </Grid>
    );

}

export default AddFriendWidget;