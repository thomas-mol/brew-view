import { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "../../utils/useDebounceEffect";
import { canvasPreview } from "./CanvasPreview";
import styles from "./CropInput.module.css";

interface Props {
  onCropComplete: (file: File) => void;
}

const CropInput = ({ onCropComplete }: Props) => {
  const [showCropper, setShowCropper] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState("");

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  useEffect(() => {
    if (
      !showCropper &&
      completedCrop &&
      imageRef.current &&
      previewCanvasRef.current
    ) {
      canvasPreview(imageRef.current, previewCanvasRef.current, completedCrop);
    }
  }, [showCropper, completedCrop]);

  function onSelectFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setCrop(undefined);
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        setImageSrc(fileReader.result?.toString() || "");
        setShowCropper(true);
      });
      fileReader.readAsDataURL(event.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  async function handleCropComplete(crop: PixelCrop) {
    if (imageRef.current && crop.width > 0 && crop.height > 0) {
      setCompletedCrop(crop);

      const croppedImage = await getCroppedImage(imageRef.current, crop);
      onCropComplete(croppedImage);

      if (previewCanvasRef.current) {
        canvasPreview(imageRef.current, previewCanvasRef.current, crop);
      }
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop &&
        completedCrop.width &&
        completedCrop.height &&
        imageRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imageRef.current,
          previewCanvasRef.current,
          completedCrop
        );
      }
    },
    100,
    [completedCrop]
  );

  return (
    <div className={styles.container}>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {imageSrc && (
        <div>
          <h3>Crop Image:</h3>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={handleCropComplete}
            aspect={1}
            minHeight={100}
            style={{
              maxHeight: "300px",
            }}
          >
            <img
              ref={imageRef}
              alt="Crop me"
              src={imageSrc}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          {!!completedCrop && (
            <canvas ref={previewCanvasRef} className={styles.previewCanvas} />
          )}
        </div>
      )}
    </div>
  );
};

export default CropInput;

// * Gets cropped image from a HTML canvas element

function getCroppedImage(
  image: HTMLImageElement,
  crop: PixelCrop,
  outputSize = 400
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = outputSize;
    canvas.height = outputSize;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Canvas context is not available"));
      return;
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      outputSize,
      outputSize
    );

    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      const file = new File([blob], "cropped-image.png", {
        type: "image/png",
      });
      resolve(file);
    }, "image/jpeg");
  });
}

// * Sets crop to center on image load

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
