import React from 'react';
import { 
    IconButton,
    Typography, 
    useTheme 
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

const Friend = ({ friendId, name, profilePicturePath }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    return (
        <FlexBetween>
            <FlexBetween 
                gap="1rem"
                onClick={() => {
                    navigate(`/profile/${friendId}`);
                    navigate(0);
                }}
            >
                <UserImage image={profilePicturePath ? profilePicturePath : "defaultAvatar.png"} size="50px" />
                <Typography
                    color={theme.palette.neutral.main}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                        "&:hover" : {
                            color: theme.palette.primary.light,
                            cursor: "pointer",
                        }
                    }}
                >
                    {name}
                </Typography>
            </FlexBetween>
            <IconButton >
                <Person sx={{ fontSize: "24px" }} />
            </IconButton>
        </FlexBetween>
    );
};

export default Friend;
