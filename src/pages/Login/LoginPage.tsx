import { Box, Button, Card, Container } from "@mui/material";
import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Container className={styles.container}>
      <Card variant="outlined" className={styles.card}>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        {isSignUp ? <SignUpForm /> : <LoginForm />}
        <Box>
          <Button variant="text" onClick={() => setIsSignUp((prev) => !prev)}>
            {isSignUp ? "Already have an account? Login" : "Create an account"}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default LoginPage;
