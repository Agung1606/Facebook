import React from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    useTheme, 
} from '@mui/material';

const FormLoginCard = 
({
    values, 
    errors, 
    touched, 
    handleBlur, 
    handleChange, 
    handleSubmit, 
    handleFormType
}) => {
    const theme = useTheme();

    return(
        <Box 
            backgroundColor={theme.palette.background.alt} 
            borderRadius="10px"
            boxShadow="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            p="1.5rem"
        >
            <form onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap="12px"
                >
                    {/* EMAIL */}
                    <TextField
                        placeholder="Email"
                        type="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{
                            width: "100%",
                        }}
                    />
                    <TextField 
                        placeholder="Password"
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        sx={{
                            width: "100%",
                        }}
                    />
                    {/* LOGIN BUTTON */}
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                backgroundColor: "#1877F2",
                                color: "white",
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                letterSpacing: "3px",
                                textTransform: "capitalize",
                                "&:hover": {
                                    backgroundColor: "#1665cc"
                                }
                            }}
                        >
                            Masuk
                        </Button>
                    <Typography
                        sx={{
                            color: "#1877F2",
                            fontSize: "1rem",
                            textTransform: "capitalize",
                            margin: "8px 0 0 0",
                            "&:hover": {
                                cursor: "pointer",
                                textDecoration: "underline"
                            }
                        }}
                    >
                    Lupa Kata Sandi?
                </Typography>
                {/* LINE */}
                <div style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                    margin: "15px 0",
                    width: "95%"
                }} />
                </Box>
            </form>
            {/* CREATE NEW ACCOUNT BUTTON */}
            <Box width="100%" textAlign="center" marginTop="20px">
                <Button
                    onClick={handleFormType}
                    sx={{
                        fontSize: "1.6rem",
                        padding: "10px",
                        textTransform: "capitalize",
                        color: "white",
                        backgroundColor: "#5db84b",
                        "&:hover": {
                            backgroundColor: "#5a9b4d"
                        }
                    }}       
                >
                    Buat Akun Baru
                </Button>
            </Box>
        </Box>
    )
};


export default FormLoginCard;