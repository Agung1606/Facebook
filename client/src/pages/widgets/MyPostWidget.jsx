import React, { useState } from "react";
import { 
    Box, 
    Typography, 
    IconButton, 
    Divider, 
    useTheme,
    Paper,
    Modal,
} from "@mui/material";
import { LiveTv, Image } from "@mui/icons-material";
import { useSelector } from "react-redux";
import PostPicture from "components/PostPicture";
import UserImage from "components/UserImage";

const MyPostWidget = () => {

    const [ open, setOpen ] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const user = useSelector((state) => state.user);

    const { palette } = useTheme();
    const light = palette.neutral.light;
    const lighter = palette.neutral.lighter;

    return(
        <Paper
            elevation={1}
            sx={{
                width: "37rem",
                padding: "1rem",
                backgroundColor: palette.background.alt,
                borderRadius: "10px",
            }}
        >
            <Box 
                display="flex" 
                alignItems="center" 
                gap="1rem"
            >
                <UserImage image={user.profilePicturePath ? user.profilePicturePath : "defaultAvatar.png"} />
                <Box
                    sx={{
                        width: "90%",
                        fontFamily: "Rubik sans-serif",
                        backgroundColor: light,
                        padding: "0.8rem 1rem",
                        fontWeight: "600",
                        fontSize: "21px",
                        borderRadius: "60px",
                        "&:hover": { cursor: "pointer", backgroundColor: lighter },
                    }} 
                    onClick={handleOpen}
                >
                    <Typography 
                        variant="h4" 
                        component="p"
                        sx={{ color: "rgba(0, 0, 0, 0.5)" }}
                    >
                        {`Apa yang Anda pikirkan, ${user.firstName}?`}
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ margin: "0.8rem 0 1rem 0" }} />

            {/* POST PHOTO AND YOUR MIND */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <PostPicture handleClose={handleClose} />
            </Modal>

            <Box
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
                <Box
                    gridColumn="span 2"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        "&:hover": {
                            backgroundColor: `${lighter}`,
                            cursor: "pointer"
                        }
                    }}
                >
                    <IconButton>
                        <LiveTv sx={{ fontSize: "37px" }} />
                    </IconButton>
                    <Typography
                        sx={{
                            paddingTop: "4px",
                            fontSize: "18px"
                        }}
                        >
                        Video siaran langsung
                    </Typography>
                </Box>

                <Box
                    gridColumn="span 2"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        "&:hover": {
                            backgroundColor: `${lighter}`,
                            cursor: "pointer"
                        }
                    }}
                    onClick={handleOpen}
                >
                    <Image sx={{ fontSize: "37px" }} />
                    <Typography
                        sx={{
                            paddingTop: "4px",
                            fontSize: "18px"
                        }}
                    >
                        Foto/Video
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default MyPostWidget;

