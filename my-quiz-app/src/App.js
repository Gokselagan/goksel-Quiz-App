import { QuizApp } from './Quiz';
import { Container, Box, Typography } from "@mui/material";

export const App = () => {
  return (
    <Box sx={{
      bgcolor: "#cfe8fc",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      px: 3 
    }}>
      <Container maxWidth="sm">
        <Typography variant='h4' sx={{ textAlign: "center", color: "#4c975c" }}>Test Yourself</Typography>
        <QuizApp />
      </Container>
    </Box>
  );
}


