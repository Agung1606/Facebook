import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
    Box,
    Divider,
    IconButton, 
    InputBase, 
    useMediaQuery, 
    useTheme,
    AppBar,
    Toolbar,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
} from '@mui/material';
import CustomTooltip from 'components/CustomTooltip';
import {
    Home,
    PeopleAlt,
    Subscriptions,
    Storefront,
    Groups,
    Search,
    Apps,
    Sms,
    Notifications,
    ArrowBack,
    Menu as MenuIcon,
    Add,
    Logout,
    LightModeOutlined,
    DarkModeOutlined,
} from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';

import { useSelector, useDispatch } from 'react-redux';
import { setMode, setLogout } from "state";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen,  }) => {
    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const [isSearch, setIsSearch] = useState(false);

    const user = useSelector((state) => state.user);
    const mode = useSelector((state) => state.mode);
    
    const mediumScreens = useMediaQuery("(min-width: 900px)");
    const largeScreens = useMediaQuery("(min-width: 1360px)");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])

    return(
        <AppBar
            sx={{
                position: "fixed",
                background: palette.background.alt,
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* LEFT SIDE */}
                {!isSearch ? (
                    <FlexBetween>
                        <img
                            width="100px"
                            height="65px"
                            src="../assets/facebookLogo.png"
                            alt="fblogo"
                        />
                        <CustomTooltip title="Search">
                            <IconButton 
                                onClick={() => setIsSearch(!isSearch)}
                            >
                                <Search sx={{ fontSize: "38px"}} />
                            </IconButton>
                        </CustomTooltip>
                        {mediumScreens ? (
                            undefined
                        ) : (
                            <CustomTooltip title="Other">
                                <IconButton
                                    onClick={() => {
                                        setIsSidebarOpen(!isSidebarOpen);
                                    }}
                                >
                                    <MenuIcon 
                                        sx={{ 
                                            fontSize: "38px",
                                        }} 
                                    />
                                </IconButton>
                            </CustomTooltip>
                        )}
                    </FlexBetween>
                ) : (
                    <FlexBetween gap="1rem">
                        <IconButton onClick={() => setIsSearch(!isSearch)}>
                            <ArrowBack sx={{ fontSize: "28px" }} />
                        </IconButton>
                        <InputBase 
                            placeholder='Cari di Facebook'
                            sx={{ 
                                fontFamily: "Rubik sans-serif",
                                fontSize: "18px",
                                fontWeight: "600",
                                borderRadius: "60px",
                                margin: "0.6rem 0",
                                padding: "0.35rem 1.2rem",
                                width: "15rem",
                                backgroundColor: palette.neutral.lighter 
                            }}
                        />
                    </FlexBetween>
                )}

                {/* MIDDLE SIDE */}
                {mediumScreens && 
                    (<FlexBetween gap={largeScreens ? "5rem" : "2rem"}>
                        <CustomTooltip title="Home">
                            <Box borderBottom={active === "home" ? "2.5px solid blue" : undefined} >
                                <IconButton
                                    onClick={() => {
                                        navigate("/home");
                                        setActive("home");
                                    }}
                                >
                                    <Home 
                                        sx={{ 
                                            fontSize: "38px",
                                            color: active === "home" ? "blue" : undefined,
                                        }} 
                                    />
                                </IconButton>
                            </Box>
                        </CustomTooltip>

                        <CustomTooltip title="Friend">
                            <Box borderBottom={active === "friend" ? "2.5px solid blue" : undefined}>
                                <IconButton
                                    onClick={() => {
                                        navigate("/friend");
                                        setActive("friend");
                                    }}
                                >
                                    <PeopleAlt 
                                        sx={{ 
                                            fontSize: "38px",
                                            color: active === "friend" ? "blue" : undefined,
                                        }} 
                                    />
                                </IconButton>
                            </Box>
                        </CustomTooltip>

                        <CustomTooltip title="Watch">
                            <Box borderBottom={active === "watch" ? "2.5px solid blue" : undefined}>
                                <IconButton
                                    onClick={() => {
                                        navigate("/watch");
                                        setActive("watch");
                                    }}
                                >
                                    <Subscriptions 
                                        sx={{ 
                                            fontSize: "38px",
                                            color: active === "watch" ? "blue" : undefined,
                                        }} 
                                    />                 
                                </IconButton>
                            </Box>
                        </CustomTooltip>

                        <CustomTooltip title="Marketplace">
                            <Box borderBottom={active === "marketplace" ? "2.5px solid blue" : undefined}>
                                <IconButton
                                    onClick={() => {
                                        navigate("/marketplace");
                                        setActive("marketplace");
                                    }}
                                >
                                    <Storefront 
                                        sx={{ 
                                            fontSize: "38px",
                                            color: active === "marketplace" ? "blue" : undefined,
                                        }} 
                                    />
                                </IconButton>
                            </Box>
                        </CustomTooltip>

                        {largeScreens ? 
                            (
                            <CustomTooltip title="Group">
                                <Box borderBottom={active === "group" ? "2.5px solid blue" : undefined}>
                                    <IconButton
                                        onClick={() => {
                                            navigate("/group");
                                            setActive("group");
                                        }}
                                    >
                                        <Groups 
                                            sx={{ 
                                                fontSize: "38px",
                                                color: active === "group" ? "blue" : undefined,
                                            }} 
                                        />
                                    </IconButton>
                                </Box>
                            </CustomTooltip>
                            ) : (
                            <CustomTooltip title="Other">
                                <IconButton
                                    onClick={() => {
                                        setIsSidebarOpen(!isSidebarOpen);
                                    }}
                                >
                                    <MenuIcon 
                                        sx={{ 
                                            fontSize: "38px",
                                        }} 
                                    />
                                </IconButton>
                            </CustomTooltip>
                        )}
                    </FlexBetween>
                )}

                {/* RIGHT SIDE */}
                <FlexBetween>   
                    {/* Apps */}
                    {largeScreens ? (
                        <CustomTooltip title="Menu">
                            <IconButton>
                                <Apps sx={{ fontSize: "40px" }} />
                            </IconButton>
                        </CustomTooltip>
                        ) : (
                        <CustomTooltip title="Create">
                            <IconButton>
                                <Add sx={{ fontSize: "40px" }} />
                            </IconButton>
                        </CustomTooltip>
                    )}

                    {/* Messenger */}
                    <CustomTooltip title="Messenger">
                        <IconButton>
                            <Sms sx={{ fontSize: "40px" }} />
                        </IconButton>
                    </CustomTooltip>

                    {/* Notifications */}
                    <CustomTooltip title="Notifications">
                        <IconButton>
                            <Notifications sx={{ fontSize: "40px" }} />
                        </IconButton>
                    </CustomTooltip>

                    {/* Account Settings */}
                    <CustomTooltip title="Account Settings">
                        <IconButton
                            onClick={handleClick}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <UserImage 
                                image={user.profilePicturePath ? user.profilePicturePath : "defaultAvatar.png"} 
                            />
                        </IconButton>
                    </CustomTooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: 'visible',
                              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                              mt: 1.5,
                              '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                              },
                            },
                          }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem 
                            onClick={() => {
                                navigate(`/profile/${user._id}`);
                                navigate(0);
                            }}
                        >
                            <Avatar /> Profile
                        </MenuItem>   
                        <Divider />
                        <MenuItem onClick={() => dispatch(setMode())}>
                            <ListItemIcon>
                                {mode === "dark" ? 
                                    (<LightModeOutlined fontSize="small" />) : 
                                    (<DarkModeOutlined fontSize="small" />)}
                            </ListItemIcon>
                            {mode === "dark" ? "Light" : "Dark"} Mode
                        </MenuItem>   
                        <MenuItem onClick={() => dispatch(setLogout())}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>   
                    </Menu>
                </FlexBetween>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;