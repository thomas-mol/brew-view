import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "../../config/firebase";
import * as Coffee from "../../constants/enums";
import { useAddReview } from "../../hooks/useReviews";
import Review from "../../interfaces/review";
import { marks } from "../../utils/objects/marks";
import CropInput from "../CropInput/CropInput";
import styles from "./ReviewForm.module.css";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters" }),
  roast: z.nativeEnum(Coffee.Roast),
  type: z.nativeEnum(Coffee.Type),
  location: z.string(),
  score: z.number().min(1).max(5),
  date: z.instanceof(dayjs as unknown as typeof Dayjs),
});

type ReviewFormData = z.infer<typeof schema>;

const ReviewForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ReviewFormData>({
    defaultValues: {
      title: "",
      roast: Coffee.Roast.MEDIUM,
      type: Coffee.Type.FLAT_WHITE,
      location: "",
      score: 1,
      date: dayjs(),
    },
    resolver: zodResolver(schema),
  });

  const [imageUpload, setImageUpload] = useState<File>();
  const [resetImageInput, setResetImageInput] = useState(false);

  const handleCropImage = (croppedFile: File) => {
    setImageUpload(croppedFile);
  };

  const { mutate } = useAddReview();

  const onSubmit = (data: ReviewFormData) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");

      const dataWithUserId = {
        ...data,
        uid: userId,
        date: Timestamp.fromDate(data.date.toDate()),
      } as Review;

      // To add: Image size and type validation
      if (imageUpload) {
        mutate({ image: imageUpload, toAdd: dataWithUserId });
      } else {
        console.log("No image provided.");
      }

      reset({
        title: "",
        roast: Coffee.Roast.MEDIUM,
        type: Coffee.Type.FLAT_WHITE,
        location: "",
        score: 1,
        date: dayjs(),
      });

      setImageUpload(undefined);
      setResetImageInput(true);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            label="Title"
            variant="outlined"
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            label="Location"
            variant="outlined"
          />
        )}
      />

      <Controller
        control={control}
        name="date"
        rules={{ required: "Date is required" }}
        render={({ field }) => {
          return (
            <MobileDatePicker
              label="Date"
              value={field.value}
              inputRef={field.ref}
              onChange={(date) => field.onChange(date ?? dayjs())}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="score"
        render={({ field }) => (
          <Slider
            {...field}
            step={0.1}
            min={1}
            max={5}
            marks={marks}
            valueLabelDisplay="auto"
            onChange={(_, value) => field.onChange(value)}
          />
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select {...field} labelId="type-label" label="type">
              {Object.values(Coffee.Type).map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="roast"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="roast-label">Roast</InputLabel>
            <Select {...field} labelId="roast-label" label="roast">
              {Object.values(Coffee.Roast).map((roast, index) => (
                <MenuItem key={index} value={roast}>
                  {roast}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <CropInput
        onCropComplete={handleCropImage}
        resetInput={resetImageInput}
      />

      <Button
        disabled={!isValid}
        variant="contained"
        type="submit"
        size="large"
      >
        Add Review
      </Button>
    </form>
  );
};

export default ReviewForm;
