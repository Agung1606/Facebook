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
import { Close, Image } from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";

const PostPicture = ({ handleClose }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

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
                top: "30%",
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
                size="48px"
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

        </Box>
    )
}

export default PostPicture;

// <InputBase  
//     placeholder={`Apa yang Anda pikirkan, ${user.firstName}?`}
//     onChange={(event) => setPost(event.target.value)}
//     value={post}
//     sx={{
//         width: "90%",
//         fontFamily: "Rubik sans-serif",
//         backgroundColor: light,
//         padding: "0.3rem 1rem",
//         fontWeight: "600",
//         fontSize: "21px",
//         borderRadius: "60px"
//     }} 
// />


// {/* UPLOAD IMAGE */}
// {isImage && (
//     <>
//         <Box
//             border={`1px solid ${medium}`}
//             borderRadius="5px"
//             mt="1rem"
//             p="1rem"
//         >
//             <Dropzone
//                 acceptedFiles=".jpg,.jpeg,.png"
//                 multiple={false}
//                 onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
//             >
//                 {({getRootProps, getInputProps }) => (
//                     <FlexBetween>
//                         <Box
//                             {...getRootProps()}
//                             border={`2px dashed ${medium}`}
//                             p="1rem"
//                             width="100%"
//                             sx={{ "&:hover": {cursor: "pointer"} }}
//                         >
//                             <input {...getInputProps()} />
//                             {!image ? (
//                                 <p>Add Image Here</p>
//                             ) : (
//                                 <FlexBetween>
//                                     <Typography>{image.name}</Typography>
//                                     <EditOutlined />
//                                 </FlexBetween>
//                             )}
//                         </Box>
//                         {image && (
//                             <IconButton
//                                 onClick={() => setImage(null)}
//                                 sx={{ width: "15%" }}
//                             >
//                                 <DeleteOutlined />   
//                             </IconButton>
//                         )}
//                     </FlexBetween>
//                 )}
//             </Dropzone>
//         </Box>
//         <Box 
//             m="8px 0"
//             display="flex" 
//             justifyContent="center" 
//             alignItems="center"
//         >
//             <Button
//                 disabled={!post}
//                 onClick={() => {
//                     handlePost();
//                     setIsImage(false);
//                 }}
//                 sx={{
//                     fontSize: "20px",
//                     color: palette.background.alt,
//                     backgroundColor: medium,
//                 }}
//             >
//                 POST
//             </Button>
//         </Box>
//     </>
// )}