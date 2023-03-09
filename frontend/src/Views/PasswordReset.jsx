import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { getUserByEmail, updatePassword } from "../API/Api";
import { user } from "../Models/user";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function PasswordReset() {
  const navigate = useNavigate();
  const [testUser, setTestUser] = useState(null);
  const [passwordIsReset, setPasswordIsReset] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (testUser == null) {
      (async () => {
        const response = await getUserByEmail(data.get("email"));

        if (response) {
          setTestUser(
            new user(
              response.email,
              response.user_name,
              response.password,
              response.security_question,
              response.security_question_answer
            )
          );
        } else {
          alert("error invalid email");
        }
      })();
    } else {
      if (data.get("sq_answer") === testUser.security_question_answer) {
        (async () => {
          const response = await updatePassword(
            testUser.email,
            data.get("password")
          );

          if (response) {
            setPasswordIsReset(true);
            setTestUser(null);
            setTimeout(redirectToLogin, 3000);
          } else {
            alert("password failed to update");
          }
        })();
      } else {
        alert("wrong sq answer");
      }
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {passwordIsReset ? (
            <>
              <Typography component="h1" variant="h5">
                Successful: Redirecting To Login
              </Typography>
              <CircularProgress />
            </>
          ) : (
            <></>
          )}
          {passwordIsReset === false ? (
            <Typography component="h1" variant="h5">
              Password Reset
            </Typography>
          ) : (
            <></>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {testUser == null && passwordIsReset === false ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Please Enter Your Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            ) : (
              <></>
            )}
            {testUser ? (
              <>
                <Typography component="h2" variant="h5">
                  {testUser.security_question}
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="sq_answer"
                  label="Answer"
                  name="sq_answer"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </>
            ) : (
              <></>
            )}
            {passwordIsReset === false ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
