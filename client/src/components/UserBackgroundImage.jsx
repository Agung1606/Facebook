import React from 'react';
import { Box } from "@mui/material";

const UserBackgroundImage = ({image, sizeWidth, sizeHeight}) => {
  return (
    <Box width={sizeWidth} height={sizeHeight}>
        <img 
            style={{ objectFit: "cover", borderRadius: "20px" }}
            width="100%"
            height="100%"
            alt='bgImage'
            src={`http://localhost:7001/assets/${image}`}
        />
    </Box>
  )
}

export default UserBackgroundImage;