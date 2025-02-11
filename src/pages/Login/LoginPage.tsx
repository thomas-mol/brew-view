import { Box, Button, Card } from "@mui/material";
import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={styles.container}>
      <Card variant="outlined" className={styles.card}>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        {isSignUp ? <SignUpForm /> : <LoginForm />}
        <Box>
          <Button variant="text" onClick={() => setIsSignUp((prev) => !prev)}>
            {isSignUp ? "Already have an account? Login" : "Create an account"}
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default LoginPage;
