import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "../../config/firebase";
import { useAddUser } from "../../hooks/useUsers";
import User from "../../interfaces/user";
import { useState } from "react";
import styles from "./SignUpForm.module.css";

const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z
    .string()
    .min(8, { message: "Your password must be at least 8 characters long" })
    .max(20, {
      message: "Your password can not contain more than 20 characters.",
    }),
});

type SignUpFormData = z.infer<typeof schema>;

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useAddUser();

  // ! Implement error handling
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignUpFormData) => {
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
            required
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
            required
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
          <TextField
            {...field}
            required
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            label="Password"
            disabled={isLoading}
          />
        )}
      />

      {error && <p>{error}</p>}

      <Button
        disabled={!isValid || isLoading}
        variant="outlined"
        type="submit"
        size="large"
      >
        {isLoading ? "Creating account" : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
