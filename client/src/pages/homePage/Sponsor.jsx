import { useTheme, Typography, Paper } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const Sponsor = () => {
    const theme = useTheme();
    return(
        <Paper
            elevation={1}
            sx={{
                marginLeft: "1.5rem",
                padding: '1.5rem 1.5rem 0.75rem 1.5rem',
                position: "fixed",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "10px",
            }}
        >
            <FlexBetween>
                <Typography variant="h4" color={theme.palette.neutral.dark} fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={theme.palette.neutral.medium}>Create Ad</Typography>
            </FlexBetween>
            <img 
                width="100%"
                height="auto"
                alt="advert"
                src="http://localhost:7001/assets/info4.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={theme.palette.neutral.main}>MikaCosmetics</Typography>
                <Typography>mikacosmetics.com</Typography>
            </FlexBetween>
            <Typography color={theme.palette.neutral.medium} m="0.5rem 0">
                Your pathway to stunnig and immaculate beauty and made sure your skin
                is exfoliating skin and shining like light.
            </Typography>
        </Paper>
    );
};

export default Sponsor;