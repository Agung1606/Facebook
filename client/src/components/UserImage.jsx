import { Box, useTheme } from "@mui/material";

const UserImage = ({image, size="53px", padding="0"}) => {
    const theme = useTheme();

    return(
        <Box 
            width={size} 
            height={size} 
            backgroundColor={theme.palette.background.default}
            borderRadius="50%"
        > 
            <img
                style={{ objectFit: 'cover', borderRadius: '50%', cursor: 'pointer', padding: padding }}
                width={size}
                height={size}
                alt='user'
                src={`http://localhost:7001/assets/${image}`}
            />
        </Box>
    );
};

export default UserImage;