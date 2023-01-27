import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses} from '@mui/material/Tooltip';

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )) (() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      maxWidth: 250,
      fontSize: 18,
      border: '1px solid #dadde9',
    },
  }));

export default CustomTooltip;