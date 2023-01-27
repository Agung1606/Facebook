import UserImage from "components/UserImage";
import FlexBetween from "../FlexBetween";
import { Box, InputBase, IconButton, useTheme } from "@mui/material";
import {
    CameraAltOutlined,
    EmojiEmotionsOutlined,
    GifBoxOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const Comments = ({ comments, isComments, setIsComments }) => {
    const user = useSelector((state) => state.user);
    
    const { palette } = useTheme();

    return(
        <Box
            display="flex"
            alignItems="center"
            gap="0 0.8rem"
            p="0.5rem 1rem"
            marginTop="0.8rem"
        >
            <UserImage size="40px" image={user.picturePath ? user.picturePath : "defaultAvatar.png"} />
            <FlexBetween
                backgroundColor={palette.neutral.light}
                borderRadius="60px"
                gap="1rem"
                padding="0.1rem 1.5rem"
                width="90%"
                height="3rem"
            >
                <InputBase 
                    placeholder="Tulis Komentar..." 
                    sx={{ fontSize: "22px" }}
                />

                <FlexBetween>
                    <IconButton>
                        <CameraAltOutlined sx={{ fontSize: "26px" }} />
                    </IconButton>
                    <IconButton>
                        <EmojiEmotionsOutlined sx={{ fontSize: "26px" }} />
                    </IconButton>
                    <IconButton>
                        <GifBoxOutlined sx={{ fontSize: "26px" }} />
                    </IconButton>
                </FlexBetween>

            </FlexBetween>
        </Box>
    );
};

export default Comments;