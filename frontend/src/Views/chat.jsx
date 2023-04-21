import { 
        Box,
        Container,
        Typography,
        Button,
} from "@mui/material";

export default function chat() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        >
        <Typography component="h1" variant="h5">
            Inbox
        </Typography>

        <Button fullWidth variant="contained" color="primary">Send Message</Button>

      </Box>
    </Container>
  );
}
