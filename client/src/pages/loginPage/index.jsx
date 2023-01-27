import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Helmet } from 'react-helmet';
import Form from './Form';


const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1250px)");

    return(
        <>
            <Helmet>
                <title>Facebook-Masuk atau Daftar</title>
            </Helmet>
            <Box 
                background={theme.palette.background.alt} 
                height="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box 
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection={isNonMobileScreens ? "row" : "column"}
                    gap="1.5rem 0.5rem"
                >
                    <Box 
                        width={isNonMobileScreens ? "650px" : "450px"}
                        textAlign={isNonMobileScreens ? "left" : "center"}
                    > 
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2560px-Facebook_Logo_%282019%29.svg.png"
                            width="320px"
                            alt="facebookLogo"
                        />
                        <Typography
                            sx={{
                                fontSize: isNonMobileScreens ? "2rem" : "1.5rem",
                                fontFamily: "sans-serif",
                            }}
                        >
                            Facebook membantu Anda terhubung dan berbagi dengan orang-orang dalam kehidupan Anda.
                        </Typography>
                    </Box>
                    {/* FORM */}
                    <Box width="65vh">
                        <Form />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default LoginPage;