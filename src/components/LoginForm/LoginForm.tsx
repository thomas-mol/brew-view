import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
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
import { useAlert } from "../AlertContext";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

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
      if (userCredential.user) {
        console.log("User logged in to firebase:", userCredential.user);
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      showAlert(
        `Error logging in: ${error.message}`,
        { vertical: "top", horizontal: "center" },
        "error"
      );
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
        render={({ field }) => (
          <FormControl>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              {...field}
              id="password-login"
              type={showPassword ? "text" : "password"}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
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
          </FormControl>
        )}
      />

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
