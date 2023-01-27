import React from 'react'
import { 
    Box, 
    Typography, 
    useTheme 
} from '@mui/material';
import { 
  People,
  Groups,
  Storefront,
  LiveTv,
  History,
  Bookmark,
  Flag,
  Event,
} from "@mui/icons-material";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserImage from 'components/UserImage';


const Menu = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const { palette } = useTheme();

    return(
        <Box 
            marginLeft="1.5rem"
            position="fixed"
        > 
            {/* USER */}
            <Box 
                width="100%"
                display="flex" 
                alignItems="center" 
                gap="0 1rem"
                p="0.8rem 1rem"
                borderRadius="10px"
                sx={{
                    "&:hover": {
                        backgroundColor: palette.neutral.light,
                        cursor: "pointer",
                    }
                }}
                onClick={() => {
                    navigate(`/profile/${user._id}`);
                    navigate(0);
                }}
            >
                <UserImage size="40px" image={user.profilePicturePath ? user.profilePicturePath : "defaultAvatar.png" } />
                <Typography sx={{ fontSize: "19px" }}>
                    {`${user.firstName} ${user.lastName}`}
                </Typography>
            </Box>

            {/* FRIEND */}
            <Box 
                width="100%"
                display="flex" 
                alignItems="center" 
                gap="0 1rem"
                p="0.8rem 1rem"
                borderRadius="10px"
                sx={{
                    "&:hover": {
                        backgroundColor: palette.neutral.light,
                        cursor: "pointer",
                    }
                }}
            >
                <People sx={{ fontSize: "40px" }} />
                <Typography sx={{ fontSize: "19px" }}>
                    Cari Teman
                </Typography>
            </Box>

            {/* GROUP */}
            <Box 
                width="100%"
                display="flex" 
                alignItems="center" 
                gap="0 1rem"
                p="0.8rem 1rem"
                borderRadius="10px"
                sx={{
                    "&:hover": {
                        backgroundColor: palette.neutral.light,
                        cursor: "pointer",
                    }
                }}
            >
                <Groups sx={{ fontSize: "40px" }} />
                <Typography sx={{ fontSize: "19px" }}>
                    Grup
                </Typography>
            </Box>

            {/* MARKET PLACE */}
            <Box 
                width="100%"
                display="flex" 
                alignItems="center" 
                gap="0 1rem"
                p="0.8rem 1rem"
                borderRadius="10px"
                sx={{
                    "&:hover": {
                        backgroundColor: palette.neutral.light,
                        cursor: "pointer",
                    }
                }}
            >
                <Storefront sx={{ fontSize: "40px" }} />
                <Typography sx={{ fontSize: "19px" }}>
                    Marketplace
                </Typography>
            </Box>

            {/* WATCH */}
            <Box 
                width="100%"
                display="flex" 
                alignItems="center" 
                gap="0 1rem"
                p="0.8rem 1rem"
                borderRadius="10px"
                sx={{
                    "&:hover": {
                        backgroundColor: palette.neutral.light,
                        cursor: "pointer",
                    }
                }}
            >
                <LiveTv sx={{ fontSize: "40px" }} />
                <Typography sx={{ fontSize: "19px" }}>
                    Watch
                </Typography>
            </Box>
            
            {/* MEMORY */}
            <Box 
                width="100%"
                display="flex" 
                alignItems="center" 
                gap="0 1rem"
                p="0.8rem 1rem"
                borderRadius="10px"
                sx={{
                    "&:hover": {
                        backgroundColor: palette.neutral.light,
                        cursor: "pointer",
                    }
                }}
            >
                <History sx={{ fontSize: "40px" }} />
                <Typography sx={{ fontSize: "19px" }}>
                    Kenangan
                </Typography>
            </Box>

            {/* SAVE */}
            <Box 
                width="100%"
                display="flex" 
                alignItems="center" 
                gap="0 1rem"
                p="0.8rem 1rem"
                borderRadius="10px"
                sx={{
                    "&:hover": {
                        backgroundColor: palette.neutral.light,
                        cursor: "pointer",
                    }
                }}
            >
                <Bookmark sx={{ fontSize: "40px" }} />
                <Typography sx={{ fontSize: "19px" }}>
                    Tersimpan
                </Typography>
            </Box>

            {/* PAGE */}
            <Box 
                width="100%"
                display="flex" 
                alignItems="center" 
                gap="0 1rem"
                p="0.8rem 1rem"
                borderRadius="10px"
                sx={{
                    "&:hover": {
                        backgroundColor: palette.neutral.light,
                        cursor: "pointer",
                    }
                }}
            >
                <Flag sx={{ fontSize: "40px" }} />
                <Typography sx={{ fontSize: "19px" }}>
                    Halaman
                </Typography>
            </Box>

            {/* EVENT */}
            <Box 
                width="100%"
                display="flex" 
                alignItems="center" 
                gap="0 1rem"
                p="0.8rem 1rem"
                borderRadius="10px"
                sx={{
                    "&:hover": {
                        backgroundColor: palette.neutral.light,
                        cursor: "pointer",
                    }
                }}
            >
                <Event sx={{ fontSize: "40px" }} />
                <Typography sx={{ fontSize: "19px" }}>
                    Acara
                </Typography>
            </Box>

        </Box>
    );
};

export default Menu;