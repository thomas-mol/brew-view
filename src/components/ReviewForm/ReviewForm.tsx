import * as Coffee from "../../constants/enums";
import { z } from "zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import APIClient from "../../services/apiClient";
import Swal from "sweetalert2";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../config/firebase";
import { useState } from "react";
import { v4 } from "uuid";
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
import { styled } from "@mui/material/styles";
import "./ReviewForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ReviewForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ReviewFormData>({
    defaultValues: {
      roast: Coffee.Roast.MEDIUM,
      type: Coffee.Type.FLAT_WHITE,
    },
    resolver: zodResolver(schema),
  });

  const [imageUpload, setImageUpload] = useState<File>();

  const marks = [
    {
      value: 1,
      label: "1⭐",
    },
    {
      value: 2,
      label: "2⭐",
    },
    {
      value: 3,
      label: "3⭐",
    },
    {
      value: 4,
      label: "4⭐",
    },
    {
      value: 5,
      label: "5⭐",
    },
  ];

  const api = new APIClient("reviews");

  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    try {
      const userId = auth.currentUser?.uid;

      const dataWithUserId = {
        ...data,
        uid: userId,
        date: data.date.toDate(),
      };

      if (imageUpload) {
        const imageRef = ref(storage, `images/${v4()}`);

        uploadBytes(imageRef, imageUpload)
          .then(() => {
            console.log("Image uploaded!" + imageRef);

            getDownloadURL(imageRef)
              .then((downloadURL) => {
                api.post({ photo_url: downloadURL, ...dataWithUserId });
              })
              .catch((error) => {
                console.error("Error getting download URL: ", error);
              });
          })
          .catch((error) => {
            console.error("Error uploading image: ", error);
          });
      } else {
        console.log("No image provided.");
        api.post(dataWithUserId);
      }

      Swal.fire({
        title: "Review Added",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <TextField
          {...register("title")}
          id="Title"
          label="Title"
          variant="outlined"
        />
      </div>
      {errors.title && <p>{errors.title.message}</p>}

      <div className="input-wrapper">
        <div className="input-container">
          <FormControl fullWidth>
            <InputLabel id="roast-label">Roast</InputLabel>
            <Select
              {...register("roast")}
              id="Roast"
              label="Roast"
              defaultValue={"Medium"}
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
              defaultValue={"Flat White"}
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
          startIcon={<FontAwesomeIcon icon={faImage} />}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            id="image"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(event) => {
              if (event.target.files) {
                setImageUpload(event.target.files[0]);
              }
            }}
          />
        </Button>
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
