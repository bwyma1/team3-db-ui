import { Box, Container } from "@mui/material";

export default function Homepage() {
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
        <iframe
          width={700}
          height={500}
          title="rick"
          id="rick"
          src="https://www.youtube.com/embed/V-_O7nl0Ii0"
        ></iframe>
      </Box>
    </Container>
  );
}
