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
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Coffee from "../../constants/enums";
import { reviewSchema, TReviewSchema } from "../../constants/types";
import { marks } from "../../utils/marks";
import CropInput from "../CropInput/CropInput";
import styles from "./ReviewForm.module.css";

interface Props {
  isEditing?: boolean;
  initialData?: TReviewSchema;
  initialImageUrl?: string;
  onSubmit: (data: TReviewSchema, image?: File) => void;
}

const ReviewForm = ({
  isEditing,
  initialData,
  initialImageUrl,
  onSubmit,
}: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<TReviewSchema>({
    defaultValues: {
      title: initialData?.title || "",
      roast: initialData?.roast || Coffee.Roast.MEDIUM,
      type: initialData?.type || Coffee.Type.FLAT_WHITE,
      location: initialData?.location || "",
      score: initialData?.score || 1,
      date: initialData?.date ? dayjs(initialData.date) : dayjs(),
    },
    resolver: zodResolver(reviewSchema),
  });

  const [imageUpload, setImageUpload] = useState<File>();
  const [resetImageInput, setResetImageInput] = useState(false);

  const handleCropImage = (croppedFile: File) => {
    setImageUpload(croppedFile);
  };

  const handleFormSubmit = (data: TReviewSchema) => {
    onSubmit(data, imageUpload);

    if (!isEditing) {
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
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
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

      {!isEditing ? (
        <CropInput
          onCropComplete={handleCropImage}
          resetInput={resetImageInput}
        />
      ) : (
        initialImageUrl && (
          <img
            src={initialImageUrl}
            alt="Current Review"
            className={styles.previewImage}
          />
        )
      )}

      <Button
        disabled={!isValid}
        variant="contained"
        type="submit"
        size="large"
      >
        {isEditing ? "Save Changes" : "Add Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
