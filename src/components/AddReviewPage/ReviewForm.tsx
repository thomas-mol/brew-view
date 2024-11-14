import "./ReviewForm.css";
import * as Coffee from "../../constants/enums";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import APIClient from "../../services/apiClient";
import Swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../config/firebase";
import { useState } from "react";
import { v4 } from "uuid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters" }),
  roast: z.nativeEnum(Coffee.Roast),
  type: z.nativeEnum(Coffee.Type),
  location: z.string(),
  score: z.number().min(1).max(5),
  date: z.date(),
});

type ReviewFormData = z.infer<typeof schema>;

const ReviewForm = () => {
  const {
    register,
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

  const onSubmit = (data: FieldValues) => {
    try {
      const userId = auth.currentUser?.uid;

      const dataWithUserId = {
        ...data,
        userId: userId,
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <div className="input-container">
        <TextField
          {...register("title")}
          id="title"
          label="Title"
          variant="outlined"
        />
      </div>
      {errors.title && <p>{errors.title.message}</p>}

      {/* Roast */}
      <div className="input-container">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Roast</InputLabel>
          <Select
            {...register("roast")}
            id="roast"
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

      {/* Type */}
      <div className="input-container">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            {...register("type")}
            id="type"
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

      {/* Location */}
      <div className="input-container">
        <TextField
          {...register("location")}
          id="location"
          label="Location"
          variant="outlined"
        />
      </div>

      {/* Score */}
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

      {/* Date */}
      <div className="input-container">
        <label htmlFor="date">Date</label>
        <input
          {...register("date", { valueAsDate: true })}
          id="date"
          type="date"
        />
      </div>

      {/* Image */}
      <div className="input-container">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          accept="image/png, image/jpg, image/jpeg"
          onChange={(event) => {
            if (event.target.files) {
              setImageUpload(event.target.files[0]);
            }
          }}
        />
      </div>

      <button disabled={!isValid} type="submit">
        Add Review
      </button>
    </form>
  );
};

export default ReviewForm;
