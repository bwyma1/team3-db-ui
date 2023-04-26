import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { addUser } from "../API/Api";
import { user } from "../Models/user";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [sq, setSq] = useState(0);
  const [sqText, setSqText] = useState("");
  const sqChange = (event) => setSq(event.target.value);

  useEffect(() => {
    if (sq === 1) {
      setSqText("What is your mothers maiden name?");
    } else if (sq === 2) {
      setSqText("What is the name of your first pet");
    } else if (sq === 3) {
      setSqText("What is the name of the city you were born in?");
    }
  }, [sq]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const createdUser = await addUser(
      new user(
        data.get("email"),
        data.get("uname"),
        data.get("password"),
        sqText,
        data.get("sq_answer"),
        data.get("user_id")
      )
    );
  
    console.log("Created user:", createdUser);
  
    if (createdUser) {
      context.setCurrUser(
        new user(
          createdUser.email,
          createdUser.user_name,
          createdUser.password,
          createdUser.security_question,
          createdUser.security_question_answer,
          createdUser.user_id
        )
      );
      navigate("/");
    } else {
      console.error("Error: User not created.");
    }
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
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 0 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="uname"
              label="User Name"
              name="uname"
              autoComplete="uname"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <InputLabel id="security-question">Security Question</InputLabel>
            <Select
              labelId="security-question"
              id="sq"
              fullWidth
              value={sq}
              label="Security Question"
              onChange={sqChange}
            >
              <MenuItem value={1}>What is your mothers maiden name?</MenuItem>
              <MenuItem value={2}>What is the name of your first pet?</MenuItem>
              <MenuItem value={3}>
                What is the name of the city you were born in?
              </MenuItem>
            </Select>
            {sq === 0 ? (
              <></>
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="sq_answer"
                label="Security Question Answer"
                name="sq_answer"
                autoFocus
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
