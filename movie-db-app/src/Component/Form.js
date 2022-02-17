import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Images } from "../Helper";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../Helper/Storage";
import { login } from "../ToolKit/Slice/authSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Form(props) {
  let history = useHistory();
  const dispatch = useDispatch();

  //redux state
  const auth = useSelector((state) => state?.authSlice);

  //state
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      setMessage("");
      handleLogin(values.email, values.password);
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Email address is required"),
      password: Yup.string().trim().required("The password is required"),
    }),
  });

  //function
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (email, password) => {
    if (props.isSignUp) {
      let user = {
        email,
        password,
        isLogin: true,
        token:
          "asdasjhcsdabscasbsabcaskbcskabakcbsfdsvsd445df54ds4554d5dsdsvdsv",
      };
      dispatch(login(user));
      history.replace("/home");
    }
    if (props.isLogin) {
      if (auth && auth.email === email) {
        let user = {
          email,
          password,
          isLogin: true,
          token:
            "asdasjhcsdabscasbsabdsfadsfaseskbcskabakcbsfdsvsd445df54ds4554d5dsdsvdsv",
        };
        dispatch(login(user));
        history?.replace("/home");
      } else {
        alert("please signup first");
        history.push("/signup");
      }
    }
  };

  const handleChange = (event) => {
    setMessage("");
    formik.handleChange(event);
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ my: 4 }}
      >
        <Link href="/">
          <img src={Images.Svg.AppLogoTheme} height={160} alt="App_Logo" />
        </Link>
      </Typography>
      <Box sx={{ boxShadow: 3, p: 6, borderRadius: 2 }}>
        <Box justifyContent="center" alignItems="center">
          <Typography variant="h5" component="div" align="center" gutterBottom>
            {props.isSignUp ? "Sign Up" : "Sign In"} to Demo App
          </Typography>
          {props.isSignUp ? null : (
            <Typography
              variant="body1"
              component="div"
              align="center"
              gutterBottom
            >
              <Box sx={{ color: "text.disabled" }} component="span">
                New Here?
              </Box>
              &nbsp;
              <Link href="/signup">Create an account</Link>
            </Typography>
          )}
        </Box>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ my: 2 }}>
          <Box>
            <FormControl fullWidth variant="filled" margin="normal">
              <InputLabel htmlFor="email">Email</InputLabel>
              <FilledInput
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
            <Box sx={{ color: "error.main" }}>
              {formik.errors.email ? <div>{formik.errors.email} </div> : null}
            </Box>
          </Box>
          <Box>
            <FormControl variant="filled" fullWidth margin="normal">
              <InputLabel htmlFor="password">Password</InputLabel>
              <FilledInput
                id="password"
                type={values.showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                fullWidth
                value={formik.values.password}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Box sx={{ color: "error.main" }}>
                {formik.errors.password ? (
                  <div>{formik.errors.password} </div>
                ) : null}
              </Box>
            </FormControl>
          </Box>
          <Box sx={{ color: "error.main", mt: 2 }} hidden={false}>
            {message}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
              variant="contained"
            >
              Continue
            </Button>
          </Box>
          {/*<Box sx={{ mt: 3}}>*/}
          {/*    <Typography variant="body1" component="div" align="center" gutterBottom sx={{fontWeight: "bold"}}>*/}
          {/*        <Box sx={{ color: 'text.disabled' }} component="span">*/}
          {/*            OR*/}
          {/*        </Box>&nbsp;*/}
          {/*    </Typography>*/}
          {/*</Box>*/}
          {/*<Box sx={{mt: 3}}>*/}
          {/*    <Button type="button"*/}
          {/*            fullWidth*/}
          {/*            size="large"*/}
          {/*            variant="outlined">*/}
          {/*        Continue with Google*/}
          {/*    </Button>*/}
          {/*</Box>*/}
        </Box>
      </Box>
    </Container>
  );
}
