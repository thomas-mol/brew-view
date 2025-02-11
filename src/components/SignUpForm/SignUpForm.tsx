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
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../../config/firebase";
import { useAddUser } from "../../hooks/useUsers";
import User from "../../interfaces/user";
import styles from "./SignUpForm.module.css";
import { signUpSchema, TSignUpSchema } from "../../constants/types";

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isLoading } = useAddUser();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      //* Email verification //
      await sendEmailVerification(user);
      console.log("Verification email sent!");

      // * Update profile information //
      await updateProfile(user, {
        displayName: data.name,
      });
      console.log("Display name set to:", data.name);

      const userToAdd: User = {
        id: user.uid,
        name: data.name,
        email: data.email,
        favorites: [],
      };
      mutate({ toAdd: userToAdd, id: user.uid });
      reset({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please choose another.");
      }
      if (error.code === "auth/invalid-email") {
        setError("Invalid email.");
      }

      console.error(error);
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
            disabled={isLoading}
          />
        )}
      />

      {/* NAME */}
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            label="Name"
            autoComplete="name"
            disabled={isLoading}
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
            type={showPassword ? "text" : "password"}
            error={!!fieldState?.error}
            label="Password"
            disabled={isLoading}
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

      {/* CONFIRM PASSWORD */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="password"
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            label="Confirm Password"
            disabled={isLoading}
          />
        )}
      />

      {error && <p className={styles.errorMessage}>{error}</p>}

      <Button
        disabled={isLoading || isSubmitting}
        variant="contained"
        type="submit"
        size="large"
      >
        {isLoading ? "Creating account" : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
