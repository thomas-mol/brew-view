import * as Coffee from "../../constants/enums";
import { z } from "zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../config/firebase";
import { useState } from "react";
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
import "./ReviewForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import VisuallyHiddenInput from "../../utils/components/VisuallyHiddenInput";
import { useAddReview } from "../../hooks/useReviews";
import Review from "../../interfaces/review";
import { marks } from "../../utils/objects/marks";

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
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ReviewFormData>({
    defaultValues: {
      roast: Coffee.Roast.MEDIUM,
      type: Coffee.Type.FLAT_WHITE,
    },
    resolver: zodResolver(schema),
  });

  const [imageUpload, setImageUpload] = useState<File>();

  const { mutate } = useAddReview();

  const onSubmit = (data: FieldValues) => {
    try {
      const userId = auth.currentUser?.uid || "";

      const dataWithUserId = {
        ...data,
        uid: userId,
        date: data.date.toDate(),
      } as Review;

      // To add: Image size and type validation
      if (imageUpload) {
        mutate({ image: imageUpload, toAdd: dataWithUserId });
      } else {
        console.log("No image provided.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <Controller
          control={control}
          name="title"
          render={({ fieldState }) => (
            <TextField
              {...register("title")}
              id="Title"
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              label="Title"
              variant="outlined"
            />
          )}
        />
      </div>

      <div className="input-wrapper">
        <div className="input-container">
          <FormControl fullWidth>
            <InputLabel id="roast-label">Roast</InputLabel>
            <Select
              {...register("roast")}
              id="Roast"
              label="Roast"
              defaultValue={Coffee.Roast.MEDIUM}
            >
              {Object.values(Coffee.Roast).map((roast, index) => (
                <MenuItem key={index} value={roast}>
                  {roast}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="input-container">
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              {...register("type")}
              id="Type"
              label="Type"
              defaultValue={Coffee.Type.FLAT_WHITE}
            >
              {Object.values(Coffee.Type).map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="input-container">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          endIcon={
            <FontAwesomeIcon icon={imageUpload ? faCheckCircle : faImage} />
          }
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            id="image"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(event) => {
              if (event.target.files) {
                setImageUpload(event.target.files[0]);
                console.log(event.target.files);
              }
            }}
          />
        </Button>
        {imageUpload && (
          <p>
            {imageUpload.name}{" "}
            <Button
              onClick={() => {
                setImageUpload(undefined);
              }}
            >
              x
            </Button>
          </p>
        )}
      </div>

      <div className="input-container">
        <Controller
          control={control}
          name="date"
          rules={{ required: "Date is required" }}
          defaultValue={dayjs()}
          render={({ field }) => {
            return (
              <MobileDatePicker
                label="Date"
                value={field.value}
                inputRef={field.ref}
                onChange={(date) => field.onChange(date)}
              />
            );
          }}
        />
      </div>

      <div className="input-container">
        <TextField
          {...register("location")}
          id="Location"
          label="Location"
          variant="outlined"
        />
      </div>

      <div className="input-container slider">
        <label htmlFor="score">Score</label>
        <Slider
          {...register("score", { valueAsNumber: true })}
          id="score"
          step={0.1}
          min={1}
          max={5}
          marks={marks}
          valueLabelDisplay="auto"
        />
      </div>

      <div className="input-container">
        <Button
          disabled={!isValid}
          variant="outlined"
          type="submit"
          size="large"
        >
          Add Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
