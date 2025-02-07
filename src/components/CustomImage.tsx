import { useState } from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  src?: string;
}

const CustomImage = ({ src }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <img
        style={{ display: imageLoaded ? "block" : "none" }}
        src={src}
        alt="https://placehold.co/400x400?text=No\nImage"
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && <Skeleton height={200} width={200} />}
    </>
  );
};

export default CustomImage;
