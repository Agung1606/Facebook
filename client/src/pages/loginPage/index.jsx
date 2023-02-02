import { Box, Typography, useMediaQuery, Container } from '@mui/material';
import { Helmet } from 'react-helmet';
import Form from './Form';


const LoginPage = () => {
    const xs = useMediaQuery("(min-width: 480px)");
    // const sm = useMediaQuery("(min-width: 768px)");
    const md = useMediaQuery("(min-width: 1060px)");
    
    return(
        <>
            <Helmet>
                <title>Facebook-Masuk atau Daftar</title>
            </Helmet>
            <Container 
                maxWidth={md ? undefined : "sm"}
                sx={{ 
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <Box 
                    display={md ? "flex" : undefined}
                    justifyContent="space-between"
                    alignItems="center"
                    gap="1.5rem"
                    py="1rem"
                >
                    <Box 
                        flexBasis="58%"
                        textAlign={md ? "left" : "center"}
                    > 
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2560px-Facebook_Logo_%282019%29.svg.png"
                            width={xs ? "320px" : "180px"}
                            alt="facebookLogo"
                        />
                        <Typography
                            sx={{
                                fontSize: xs ? "2rem" : "1rem",
                                fontFamily: "sans-serif",
                            }}
                        >
                            Facebook membantu Anda terhubung dan berbagi dengan orang-orang dalam kehidupan Anda.
                        </Typography>
                    </Box>
                    {/* FORM */}
                    <Box flexBasis="42%" width="100%" mt={xs ? undefined : "1rem"}>
                        <Form />
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default LoginPage;