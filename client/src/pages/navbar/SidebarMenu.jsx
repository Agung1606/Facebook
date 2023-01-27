import {
    Box,
    Typography,
    Drawer,
    useTheme,
    IconButton,
} from "@mui/material";
import { 
    ArrowBackIos,
    People,
    Groups,
    Storefront,
    LiveTv,
    History,
    Bookmark,
    Flag,
    Event,
    Sms,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";


const SidebarMenu = ({ 
    drawerWidth, 
    isSidebarOpen, 
    setIsSidebarOpen,
}) => {
    // const navigate = useNavigate();
    const { palette } = useTheme();

    const user = useSelector((state) => state.user);

    return(
        <Box component="nav">
            <Drawer
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant="temporary"
                anchor="left"
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        backgroundColor: palette.background.alt,
                        boxSizing: "border-box",
                        width: drawerWidth,
                    }
                }}
            >
                <Box width="100%">
                    <FlexBetween m="1.3rem 1rem 0 1rem">
                        <Typography 
                            variant="h1"
                            sx={{
                                fontWeight: "bold",
                                color: "#1778F2",
                            }}
                        >
                            Facebook
                        </Typography>
                        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <ArrowBackIos sx={{ fontSize: "35px" }} />
                        </IconButton>
                    </FlexBetween>
                    <Box
                        marginTop="2rem"
                        marginLeft="1.2rem"
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

                    {/* MESSENGER */}
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
                        <Sms sx={{ fontSize: "40px" }} />
                        <Typography sx={{ fontSize: "19px" }}>
                            Messenger
                        </Typography>
                    </Box>

                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default SidebarMenu;
