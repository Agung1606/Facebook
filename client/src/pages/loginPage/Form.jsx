import { useState } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";
import * as yup from 'yup';
import FormLoginCard from "pages/loginPage/FormLoginCard";
import FormRegisterCard from "pages/loginPage/FormRegisterCard";

// Yup validation schema for regsiter
const registerSchema = yup.object().shape({
    firstName: yup.string().required("What is your first name?"),
    lastName: yup.string().required("what is your last name?"),
    email: yup.string().email("invalid email").required("what is your email?"),
    password: yup.string().required("required password"),
});

// Yup validation for login
const loginSchema = yup.object().shape({
    email: yup.string().required("email required"),
    password: yup.string().required("password required")
});

const initialValueRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    birthday: "",
}

const initialValueLogin = {
    email: "",
    password: "",
}

const Form = () => {
    const [formType, setFormType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = formType === "login";
    const isRegister = formType === "register";

    const handleRegisterSubmit = async (values, onSubmitProps) => {
        const savedUserResponse = await fetch(
            "http://localhost:7001/api/v1/auth/register",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if(savedUser) {
            setFormType("login");
        }
    };

    const handleLoginSubmit = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:7001/api/v1/auth/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();

        if(loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.respondedUser,
                    token: loggedIn.token
                })
            );
            navigate('/home');
        }
    };

    // parameter values are come from Formik
    const handleFormSubmit = async (values, onSubmitProps) => {
        if(isLogin) {
            await handleLoginSubmit(values, onSubmitProps);
        };
        if(isRegister) {
            await handleRegisterSubmit(values, onSubmitProps);
        };
    };

    const handleFormType = () => {
        setFormType( formType === "login" ? "register" : "login");
    };

    const [loading, setLoading] = useState(false);

    return(
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValueLogin : initialValueRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
            }) => (
                <>
                    {isLogin && 
                        <FormLoginCard
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            handleFormType={handleFormType}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    }

                    {isRegister && 
                        <FormRegisterCard 
                            values={values}
                            errors={errors}
                            touched={touched}
                            resetForm={resetForm}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            handleFormType={handleFormType}
                        />
                    }
                </>
            )}
        </Formik>
    );
}

export default Form;