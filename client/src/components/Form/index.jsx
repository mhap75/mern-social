import * as Yup from "yup";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { FlexBetween } from "@/components/index.js";
import { EditOutlined } from "@mui/icons-material";
import { login, register } from "@/lib/formActions.js";
import { setLogin } from "@/states/index.js";

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, "Your first name cannot be more than 30 characters")
    .required("First name is necessary"),
  lastName: Yup.string()
    .max(30, "Your last name cannot be more than 30 characters")
    .required("Last name is necessary"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is necessary"),
  password: Yup.string()
    .min(10, "Password must be at least 10 characters")
    .required("Password is necessary"),
  location: Yup.string()
    .min(4, "Location must be at least 4 characters")
    .required("Location is necessary"),
  occupation: Yup.string()
    .min(5, "occupation must be at least 5 characters")
    .required("Occupation is necessary"),
  picture: Yup.string().required("Picture is necessary"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is necessary"),
  password: Yup.string()
    .min(10, "Password must be at least 10 characters")
    .required("Password is necessary"),
});

const initialRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialLogin = {
  email: "",
  password: "",
};

const inputs = [
  { label: "First Name", name: "firstName", span: 2 },
  { label: "Last Name", name: "lastName", span: 2 },
  { label: "Occupation", name: "occupation", span: 4 },
  { label: "Location", name: "location", span: 4 },
  { label: "Email", name: "email", span: 4 },
  { label: "Password", name: "password", span: 4 },
];

function Form() {
  const [formType, setFormType] = useState("register");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = formType === "login";
  const isRegister = formType === "register";

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      try {
        const res = await login(values, onSubmitProps);
        dispatch(
          setLogin({
            user: res.user,
            token: res.token,
          }),
        );
        navigate("/home", { replace: true });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await register(values, onSubmitProps);
        setFormType("login");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialLogin : initialRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNotMobile ? undefined : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                {inputs.slice(0, 4).map(({ label, name, span }) => (
                  <TextField
                    key={label}
                    label={label}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[name]}
                    name={name}
                    error={Boolean(touched[name]) && Boolean(errors[name])}
                    helperText={touched[name] && errors[name]}
                    sx={{ gridColumn: `span ${span}` }}
                  />
                ))}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    accept={{
                      "image/*": [".png", ".jpeg", ".jpg"],
                    }}
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        borderRadius="5px"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add a picture</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            {inputs.slice(4).map(({ label, name, span }) => (
              <TextField
                key={label}
                label={label}
                type={name === "password" ? "password" : "text"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values[name]}
                name={name}
                error={Boolean(touched[name]) && Boolean(errors[name])}
                helperText={touched[name] && errors[name]}
                sx={{ gridColumn: `span ${span}` }}
              />
            ))}
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                textTransform: "uppercase",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {formType}
            </Button>
            <Typography
              onClick={() => {
                setFormType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  opacity: 0.5,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default Form;
