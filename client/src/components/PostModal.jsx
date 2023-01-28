import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    IconButton, 
    Divider, 
    Typography, 
    useTheme,
    InputBase,
} from '@mui/material';
import { Close, Image, Person, AddPhotoAlternate, EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import FlexBetween from './FlexBetween';
import CustomTooltip from './CustomTooltip';

const PostModal = ({ handleClose }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");

    const { palette } = useTheme();

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", user._id);
        formData.append("description", post);
        if(image) {
            formData.append("picture", image);
            formData.append("postPicturePath", image.name);
        }

        const response = await fetch(
            `http://localhost:7001/api/v1/posts/newPost`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`},
            body: formData,
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        setImage(null);
        setPost("");
    };
    return (
        <Box 
            sx={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                backgroundColor: palette.background.alt,
                boxShadow: 24,
                borderRadius: "10px",
                p: 1,
            }}
        >

            <Box textAlign="center" marginY="1rem">
                <Typography 
                    variant="h3"
                    component="h1"
                    display="inline-block"
                >
                    Buat Postingan
                </Typography>
                <IconButton 
                    sx={{position: "absolute", right: "10px", top: "13px"}}
                    onClick={handleClose}
                >
                    <Close sx={{ fontSize: "30px" }} />
                </IconButton>
            </Box>
            
            <Divider />

            <Box 
                marginY="1.3rem" 
                marginX="1rem" 
                display="flex" 
                alignItems="center" 
                gap="0.8rem"
            >
            <UserImage 
                image={user.profilePicturePath ? user.profilePicturePath : "defaultAvatar.png"} 
                size="45px"
            />
            <Typography variant="h4" component="p">
                {`${user.firstName} ${user.lastName}`}
            </Typography>
            </Box>

            <Box marginY="1.5rem" marginX="1rem">
                <InputBase 
                    placeholder={`Apa yang Anda pikirkan, ${user.firstName}?`}
                    onChange={(event) => setPost(event.target.value)}
                    value={post}
                    sx={{
                        width: "90%",
                        fontWeight: "0.3rem 1rem",
                        fontSize: "23px",
                    }}
                />
            </Box>

            {/* ADD PICTURE OR VIDEO IN YOUR POST */}
            {isImage && (
                <>
                    <Box
                        border={`1px solid ${palette.neutral.medium}`}
                        borderRadius="5px"
                        marginTop="5rem"
                        marginX="1rem"
                        padding="0.5rem"
                        position="relative"
                    >
                        {!image && (
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    backgroundColor: palette.background.alt,
                                }}
                                onClick={() => setIsImage(!isImage)}
                            >
                                <Close sx={{ fontSize: "25px" }} />
                            </IconButton>
                        )}
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                        >
                            {({getRootProps, getInputProps }) => (
                                <FlexBetween>
                                    <Box
                                        {...getRootProps()}
                                        p="0.8rem"
                                        width="100%"
                                        textAlign="center"
                                        backgroundColor={palette.neutral.lighter}
                                        borderRadius="10px"
                                        sx={{ 
                                            "&:hover": {
                                                cursor: "pointer",
                                                backgroundColor: palette.neutral.light,
                                            } 
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        {!image ? (
                                            <Box>
                                                <AddPhotoAlternate sx={{ fontSize: "35px" }} />
                                                <Typography sx={{ fontSize: "22px" }}>
                                                    Add Image Here
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{image.name}</Typography>
                                                <EditOutlined />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                    {image && (
                                        <IconButton
                                            onClick={() => setImage(null)}
                                            sx={{ width: "15%" }}
                                        >
                                            <DeleteOutlined />   
                                        </IconButton>
                                    )}
                                </FlexBetween>
                            )}
                        </Dropzone>
                    </Box>
                </>
            )}
            

            <Box 
                marginX="1rem"
                marginTop={isImage ? "0.5rem" : "5rem"}
                border="1px solid rgba(0, 0, 0, 0.5)"
                borderRadius="10px"
                p="0.5rem"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography 
                    fontWeight="600" 
                    component="p"
                    sx={{ fontSize: "18px", color: palette.neutral.main }}
                >
                    Tambahkan ke Postingan Anda
                </Typography>
                <FlexBetween>
                    <CustomTooltip title="Foto/Video">
                        <IconButton onClick={() => setIsImage(!isImage)}>
                            <Image fontSize="large" />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip title="Tandai orang">
                        <IconButton>
                            <Person fontSize="large" />
                        </IconButton>
                    </CustomTooltip>
                </FlexBetween>
            </Box>
            
            <Box
                marginX="1rem"
                marginTop="1.5rem"
            >
                <Button
                    disabled={!post}
                    onClick={() => {
                        handlePost();
                        handleClose();
                        setIsImage(false);
                    }}
                    sx={{
                        width: "100%",
                        fontSize: "16px",
                        borderRadius: "10px",
                        color: "white",
                        backgroundColor: "#1877F2",
                        "&:hover": { backgroundColor: "#1665cc" }
                    }}
                >
                    Kirim
                </Button>
            </Box>

        </Box>
    )
}

export default PostModal;