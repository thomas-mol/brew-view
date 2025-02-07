import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

type LoginFormData = z.infer<typeof schema>;

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredential.user.emailVerified) {
        console.log("User logged in to firebase.");
        setError(null);
        navigate("/", { replace: true }); // Navigate to the main app
      } else {
        alert("Please verify your email address first!");
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
          <TextField
            {...field}
            type="password"
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            label="Password"
          />
        )}
      />

      {error && <p>{error}</p>}

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
