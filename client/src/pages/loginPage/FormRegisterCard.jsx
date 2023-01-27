import React from 'react';
import { 
    Box, 
    Button, 
    IconButton,
    TextField, 
    Typography, 
    useTheme, 
    RadioGroup, 
    Radio, 
    FormControlLabel,
} from '@mui/material';
import { Close } from "@mui/icons-material";
import FlexBetween from '../../components/FlexBetween';


const FormRegisterCard = 
({
    values, 
    errors, 
    touched, 
    handleBlur, 
    handleChange, 
    handleSubmit, 
    resetForm, 
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
            <FlexBetween marginBottom="20px">
                <Box>
                    <Typography
                        fontWeight="500"
                        fontSize="35px"
                    >
                        Daftar
                    </Typography>
                    <Typography
                        fontWeight="300"
                        fontSize="15px"
                    >
                        Ini cepat dan mudah.
                    </Typography>
                </Box>
                <Box>
                    <IconButton onClick={() => {handleFormType(); resetForm();}}>
                        <Close sx={{ fontSize: "30px" }} />
                    </IconButton>
                </Box>
            </FlexBetween>

            {/* LINE */}
            <div style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                margin: "15px 0",
                width: "100%"
            }} />
            
            <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="12px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                    {/* FIRST NAME */}
                    <TextField 
                        placeholder="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        type="text"
                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        sx={{gridColumn: "span 2"}}
                    />
                    {/* LAST NAME */}
                    <TextField 
                        placeholder="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        type="text"
                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        sx={{gridColumn: "span 2"}}
                    />
                    {/* EMAIL */}
                    <TextField 
                        placeholder="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        type="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{gridColumn: "span 4"}}
                    />
                    {/* PASSWORD */}
                    <TextField 
                        placeholder="Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        type="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        sx={{gridColumn: "span 4"}}
                    />
                    {/* BIRTHDAY */}
                    <Box gridColumn="span 3">
                        <Typography
                            sx={{ fontSize: "15px", color: "gray"}}
                        >
                            Tanggal Lahir?
                        </Typography>
                        <TextField
                            placeholder="Tanggal Lahir?"
                            onChange={handleChange}
                            value={values.birthday}
                            defaultValue={Date.now}
                            name="birthday"
                            type="date"
                            sx={{ width: "100%" }}
                        />
                    </Box>
                    {/* GENDER */}
                    <Box gridColumn="span 4">
                        <Typography
                            sx={{ fontSize: "15px", color: "gray"}}
                        >
                            Jenis Kelamin?
                        </Typography>
                        <RadioGroup
                            row
                            name="gender"
                            onChange={handleChange}
                            value={values.gender}
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <FormControlLabel value="Laki Laki" control={<Radio />} label="Laki Laki" />
                            <FormControlLabel value="Perempuan" control={<Radio />} label="Perempuan" />
                        </RadioGroup>
                    </Box>
                    {/* BUTTON */}
                    <Box gridColumn="span 4" textAlign="center" marginTop="1.5rem">
                        <Button
                            type="submit"
                            sx={{
                                height: "3rem",
                                width: "12rem",
                                fontSize: "1.4rem",
                                padding: "10px",
                                textTransform: "capitalize",
                                color: "white",
                                backgroundColor: "#5db84b",
                                "&:hover": {
                                    backgroundColor: "#5a9b4d"
                                }
                            }} 
                        >
                            Daftar
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default FormRegisterCard;