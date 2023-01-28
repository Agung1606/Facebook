import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDeletePost, setPost } from "state";
import { 
    Box, 
    Typography, 
    IconButton, 
    Divider, 
    useTheme,
    Paper,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    ThumbUpAltOutlined,
    ChatBubbleOutlineOutlined,
    SendOutlined,
    PeopleOutlineOutlined,
    MoreHorizOutlined,
    EditOutlined, 
    DeleteOutlined,
    Send,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import dayjs from "dayjs";
import Comments from "components/postComponent/Comments";

const PostWidget = ({
    postId,
    postUserId,
    name,
    postDate,
    postPicturePath,
    userProfilePicturePath,
    description,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const loggedInUserId = user._id;
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length || 0;

    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const { palette } = useTheme();
    const primary = palette.primary.main;

    // fix this bug, you just can remove your own post not others
    const deletePost = async () => {
        const response = await fetch(
            `http://localhost:7001/api/v1/posts/${postId}/delete`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        const updatedPosts = await response.json();
        dispatch(setDeletePost({ post: updatedPosts }))
    };

    const patchLike = async () => {
        const response = await fetch(
            `http://localhost:7001/api/v1/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };
        
    const likeLogic = () => {
        if(likeCount === 1 && isLiked === true) {
            return `${user.firstName} ${user.lastName}`;
        } else if (likeCount > 1 && isLiked === true) {
            return `Anda dan ${likeCount - 1} orang lainnya`;
        } else {
            return likeCount;
        }
    }

    return(
        <Paper
            elevation={1}
            sx={{
                width: "37rem",
                margin: "1rem 0",
                backgroundColor: palette.background.alt,
                borderRadius: "10px",
            }}
        >
            {/* HEADER */}
            <FlexBetween p="0 1rem">
                <Box 
                    display="flex" 
                    alignItems="center" 
                    gap="0 0.7rem"
                >
                    <Box>
                        <UserImage size="58px" image={userProfilePicturePath ? userProfilePicturePath : "defaultAvatar.png"} />
                    </Box>
                    <Box marginTop="0.75rem">
                        <Typography 
                            sx={{ 
                                fontSize: "17px",
                                "&:hover": {
                                    color: "rgba(0, 0, 0, 0.4)",
                                    cursor: "pointer"
                                }
                            }}
                            onClick={() => {
                                navigate(`/profile/${postUserId}`);
                                navigate(0);
                            }}
                        >
                            {name}
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography>
                                {dayjs(postDate).format("DD/MM/YYYY")}
                            </Typography>
                            <IconButton>
                                <PeopleOutlineOutlined />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                {/* OTHERS */}
                <IconButton 
                    onClick={handleClick}
                    aria-controls={open ? "other-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <MoreHorizOutlined sx={{ fontSize: "30px" }} />
                </IconButton>
                <Menu 
                    anchorEl={anchorEl}
                    id="other-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                >
                    {postUserId === user._id && 
                    <>
                        <MenuItem
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0 2.5rem",
                            }}
                        >
                            <EditOutlined sx={{ fontSize: "25px" }} />
                            <Typography variant="h5">Edit</Typography>
                        </MenuItem>
                        <MenuItem
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0 2.5rem",
                            }}
                            onClick={deletePost}
                        >
                            <DeleteOutlined sx={{ fontSize: "25px" }} />
                            <Typography variant="h5">Hapus</Typography>
                        </MenuItem>
                    </>
                    }
                    <MenuItem
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0 2.5rem",
                        }}
                    >
                        <Send sx={{ fontSize: "25px" }} />
                        <Typography variant="h5">Share</Typography>
                    </MenuItem>
                </Menu>
            </FlexBetween>

            {/* DESCRIPTION AND IMAGE */}
            <Typography 
                sx={{ 
                    marginTop: "1rem", 
                    p: "0 1rem", 
                    fontSize: postPicturePath ? "16px" : "20px"
                }}
            >
                {description}
            </Typography>
            {postPicturePath && (
                <img 
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ marginTop: "0.75rem" }}
                    src={`http://localhost:7001/assets/${postPicturePath}`}
                />
            )}

            {/* LIKE COUNT */}
            {likeCount > 0 && (
                <Box
                    display="flex"
                    alignItems="center"
                    gap="0.7rem"
                    p="1rem 1.5rem"
                >
                    <ThumbUpAltOutlined sx={{ fontSize: "25px" }} />
                    <Typography 
                        sx={{ fontSize: "17px" }}
                    >
                        {likeLogic()}
                    </Typography>
                </Box>
            )}

            <Divider />
            
            {/* LIKE, COMMENT, AND SHARE */}
            <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                p="0 1rem"
                marginTop="0.5rem"
                marginBottom="0.3rem"
                gap="0 1.5rem"
            >
                <FlexBetween 
                    gap="0.6rem"
                    p="0.7rem"
                    borderRadius="0.75rem"
                    sx={{
                        "&:hover": {
                            backgroundColor: palette.neutral.lighter,
                            cursor: "pointer",
                        }
                    }}
                    onClick={patchLike}
                >
                        {isLiked ? (
                            <ThumbUpAltOutlined sx={{ fontSize: "32px", color: primary }} />
                        ) : (
                            <ThumbUpAltOutlined sx={{ fontSize: "32px" }} />
                        )}
                    <Typography sx={{ fontSize: "18px", padding: "auto 0" }}>Suka</Typography>
                </FlexBetween>

                <FlexBetween 
                    gap="0.6rem"
                    p="0.7rem"
                    borderRadius="0.75rem"
                    sx={{
                        "&:hover": {
                            backgroundColor: palette.neutral.lighter,
                            cursor: "pointer",
                        }
                    }}
                >
                    <ChatBubbleOutlineOutlined sx={{ fontSize: "32px" }} />
                    <Typography sx={{ fontSize: "18px", padding: "auto 0" }}>Komentari</Typography>
                </FlexBetween>

                <FlexBetween 
                    gap="0.6rem"
                    p="0.7rem"
                    borderRadius="0.75rem"
                    sx={{
                        "&:hover": {
                            backgroundColor: palette.neutral.lighter,
                            cursor: "pointer",
                        }
                    }}
                >
                    <SendOutlined sx={{ fontSize: "32px" }} />
                    <Typography sx={{ fontSize: "18px", padding: "auto 0" }}>Bagikan</Typography>
                </FlexBetween>
            </Box>

            {/* LINE */}
            <Box p="0 1rem">
            <Divider />
            </Box>

            {/* COMMENTS */}
            <Comments 
                comments={comments} 
                isComments={isComments} 
                setIsComments={setIsComments} 
            />
        </Paper>
    );
};

export default PostWidget;