import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { logInSchema, TLoginSchema } from "../../constants/types";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredential) {
        console.log("User logged in to firebase:", userCredential);
        setError(null);
        navigate("/", { replace: true }); // Navigate to the main app
      }
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* EMAIL */}
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            label="Email"
            autoComplete="email"
          />
        )}
      />

      {/* PASSWORD */}
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <OutlinedInput
            {...field}
            type="password"
            error={!!fieldState?.error}
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />

      {error && <p className={styles.errorMessage}>{error}</p>}

      <Button
        disabled={!isValid}
        variant="contained"
        type="submit"
        size="large"
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
