import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,Typography
} from "@mui/material"
import { TextFieldWrapper } from "./Login";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { useFormik } from "formik";


import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useAuth from "hooks/useAuth";

const Register: FC = () => {
  
  const navigate = useNavigate();
  const {register}=useAuth()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    terms: true,
    submit: null,
  };
  // form field value validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });



  
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values: any) => {
        setLoading(true);
        try {
          await register(values.email, values.password, values.name);
          setLoading(false);
          toast.success("You registered successfully");
          navigate("/");
        } catch (error: any) {
          setError(error?.message);
          setLoading(false);
        }
      },
    });

  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: { sm: "100%" },
        mt:'10vh'
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={5}
        >
          <Box width={38} mb={1}>
            <img src="pop.jpg" width="100%" alt="Logo" />
          </Box>
          <Typography variant='h1' fontSize={24} fontWeight={700}>
            Start Personalized Shopping with Our E-Commerce
          </Typography>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          {/*<SocialIconButton
            // onClick={loginWithGoogle}
            startIcon={<GoogleIcon sx={{ mr: "0.5rem" }} />}
          >
            Sign up with Google
          </SocialIconButton>
          <SocialIconButton
            // onClick={loginWithFacebook}
            startIcon={<FacebookIcon sx={{ mr: "0.5rem" }} />}
          >
            Sign up with Facebook
          </SocialIconButton>

          <Divider sx={{ my: 3, width: "100%", alignItems: "flex-start" }}>
            <H3 color="text.disabled" px={1}>
              Or
            </H3>
          </Divider>*/}

          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <LightTextField
                  fullWidth
                  name="name"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name || ""}
                  error={Boolean(touched.name && errors.name)}
                //   helperText={touched.name && errors.name}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                //   helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>
            </FlexBox>

            <TextFieldWrapper sx={{ mt: 2, width: "100%" }}>
              <LightTextField
                fullWidth
                name="password"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password || ""}
                error={Boolean(touched.password && errors.password)}
                // helperText={touched.password && errors.password}
              />
            </TextFieldWrapper>

            <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  checked={values.terms}
                  onChange={handleChange}
                  name="terms"
                />
              }
              label="I agree to terms & conditions"
              sx={{
                marginTop: "0.5rem",
                "& .MuiTypography-root": { fontWeight: 600 },
              }}
            />

            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {error}
              </FormHelperText>
            )}

            <Box sx={{ mt: 4 }}>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained">
                  Sign Up
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Sign Up
                </Button>
              )}
            </Box>
          </form>

          <Typography margin="auto" mt={3} color="text.disabled">
            Do you already have an account?{" "}
            <Link style={{textDecoration:'none'}} to="/login">
              <Typography sx={{ml:'6vw'}}color="primary.main">Log in</Typography>
            </Link>
          </Typography>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Register;
