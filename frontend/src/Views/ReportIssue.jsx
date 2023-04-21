import React, { useState, useEffect }  from "react";
import {
        Box,
        Typography,
        Button,
        TextField,
        ThemeProvider,
        createTheme,
        Container,
        CssBaseline,
      } from "@mui/material";

const ReportIssue = () => {

    const theme = createTheme();

    const [currUser, setCurrUser] = useState({})
    const [reportMessage, setReportMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Report Message: ${reportMessage}, User ID: ${currUser.user_id}`);
    }

    useEffect(() => {
        setCurrUser(JSON.parse(window.sessionStorage.getItem("user")))
    }, [])


    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="lg">
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
                Report an Issue
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>

                <TextField
                    id="outlined-multiline-static"
                    label="Describe the Issue"
                    variant="outlined"
                    type="text"
                    required
                    margin="normal"
                    multiline
                    fullWidth
                    rows={4}
                    value={reportMessage}
                    onChange={(event) => setReportMessage(event.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
            </form>
          </Container>
        </ThemeProvider>
      );

};

export default ReportIssue;